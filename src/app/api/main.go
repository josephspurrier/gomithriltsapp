package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"app/api/component"
	"app/api/iface"
	"app/api/internal/bind"
	"app/api/internal/response"
	"app/api/middleware"
	"app/api/model"
	"app/api/pkg/database"
	"app/api/pkg/logger"
	"app/api/pkg/passhash"
	"app/api/pkg/query"
	"app/api/pkg/router"

	"github.com/jmoiron/sqlx"
	"github.com/josephspurrier/rove"
	"github.com/josephspurrier/rove/pkg/adapter/mysql"
)

func init() {
	// Verbose logging with file name and line number.
	log.SetFlags(log.Lshortfile)
}

func main() {
	port := "8081"

	// Create the logger.
	//l := logger.New(log.New(os.Stderr, "", log.LstdFlags))
	l := logger.New(log.New(os.Stderr, "", log.Lshortfile))

	db, err := LoadMigrations(l)
	if err != nil {
		l.Fatalf(err.Error())
	}

	r := router.New()
	db2 := database.New(db)
	q := query.New(db2)
	p := passhash.New()
	resp := response.New()
	b := bind.New()

	LoadRoutes(l, r, db, q, b, resp, p)

	l.Printf("Server started.")
	err = http.ListenAndServe(":"+port, middleware.Log(middleware.CORS(r)))
	if err != nil {
		l.Printf(err.Error())
	}
}

// LoadRoutes will load the endpoints.
func LoadRoutes(l logger.ILog, r *router.Mux, db *sqlx.DB, q iface.IQuery, b iface.IBind, resp iface.IResponse, p iface.IPassword) {
	core := component.NewCore(l, r, db, q, b, resp, p)

	component.SetupStatic(core)
	component.SetupLogin(core)
	component.SetupRegister(core)

	// Set up the 404 page.
	r.Instance().NotFound = router.Handler(
		func(w http.ResponseWriter, r *http.Request) (int, error) {
			return http.StatusNotFound, nil
		})

	// Set the handling of all responses.
	router.ServeHTTP = func(w http.ResponseWriter, r *http.Request, status int, err error) {
		// Handle only errors.
		if status >= 400 {
			resp := new(model.GenericResponse)
			resp.Body.Status = http.StatusText(status)
			if err != nil {
				resp.Body.Message = err.Error()
			}

			// Write the content.
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(status)
			err := json.NewEncoder(w).Encode(resp.Body)
			if err != nil {
				w.Write([]byte(`{"status":"Internal Server Error","message":"problem encoding JSON"}`))
				return
			}
		}

		// Display server errors.
		if status >= 500 {
			if err != nil {
				core.Log.Printf("%v", err)
			}
		}
	}
}

// LoadMigrations will run the database migrations.
func LoadMigrations(l logger.ILog) (*sqlx.DB, error) {
	// Set the database connection information.
	con := &mysql.Connection{
		Hostname:  "127.0.0.1",
		Username:  "root",
		Password:  "password",
		Name:      "main",
		Port:      3306,
		Parameter: "collation=utf8mb4_unicode_ci&parseTime=true&multiStatements=true",
	}

	// Connect to the database.
	db, err := mysql.New(con)
	if err != nil {
		// Attempt to connect without the database name.
		d, err := con.Connect(false)
		if err != nil {
			return nil, err
		}

		// Create the database.
		_, err = d.Query(fmt.Sprintf(`CREATE DATABASE IF NOT EXISTS %v DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;`, con.Name))
		if err != nil {
			return nil, err
		}
		l.Printf("Database created.")

		// Attempt to reconnect with the database name.
		db, err = mysql.New(con)
		if err != nil {
			return nil, err
		}
	}

	// Perform all migrations against the database.
	r := rove.NewChangesetMigration(db, changesets)
	r.Verbose = true
	return db.DB, r.Migrate(0)
}

var changesets = `
--changeset josephspurrier:1
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
CREATE TABLE user_status (
    id TINYINT(1) UNSIGNED NOT NULL AUTO_INCREMENT,
    
    status VARCHAR(25) NOT NULL,
    
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    
    PRIMARY KEY (id)
);
--rollback DROP TABLE user_status;

--changeset josephspurrier:2
INSERT INTO user_status (id, status, created_at, updated_at, deleted) VALUES
(1, 'active',   CURRENT_TIMESTAMP,  CURRENT_TIMESTAMP,  0),
(2, 'inactive', CURRENT_TIMESTAMP,  CURRENT_TIMESTAMP,  0);
--rollback TRUNCATE TABLE user_status;

--changeset josephspurrier:3
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';
CREATE TABLE user (
    id VARCHAR(36) NOT NULL,
    
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password CHAR(60) NOT NULL,
    
    status_id TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT 0,
    
    UNIQUE KEY (email),
    CONSTRAINT f_user_status FOREIGN KEY (status_id) REFERENCES user_status (id) ON DELETE CASCADE ON UPDATE CASCADE,
    
    PRIMARY KEY (id)
);
--rollback DROP TABLE user;
`

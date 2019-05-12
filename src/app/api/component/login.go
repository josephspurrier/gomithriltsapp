package component

import (
	"errors"
	"log"
	"net/http"
	"time"

	"app/api/model"
	"app/api/store"
)

// LoginEndpoint .
type LoginEndpoint struct {
	Core
}

// SetupLogin .
func SetupLogin(core Core) {
	p := new(LoginEndpoint)
	p.Core = core

	p.Router.Post("/v1/login", p.Login)
}

// Login .
// swagger:route POST /v1/login user UserLogin
//
// Authenticate a user.
//
// Responses:
//   201: LoginResponse
//   400: BadRequestResponse
//   401: UnauthorizedResponse
//   500: InternalServerErrorResponse
func (p *LoginEndpoint) Login(w http.ResponseWriter, r *http.Request) (int, error) {
	// swagger:parameters UserLogin
	type request struct {
		// in: body
		Body struct {
			// Required: true
			Email string `json:"email" validate:"required,email"`
			// Required: true
			Password string `json:"password" validate:"required"`
		}
	}

	// Request validation.
	req := new(request).Body
	if err := p.Bind.Unmarshal(&req, r); err != nil {
		return http.StatusBadRequest, err
	} else if err = p.Bind.Validate(&req); err != nil {
		return http.StatusBadRequest, err
	}

	// Determine if the user exists.
	user := store.NewUser(p.DB, p.Q)
	found, ID, err := user.ExistsByField(user, "email", req.Email)
	if err != nil {
		return http.StatusInternalServerError, err
	} else if !found {
		return http.StatusBadRequest, errors.New("user not found (1)")
	}

	// Populate the user.
	user.FindOneByID(user, ID)

	// Ensure the user's password matches.
	if !p.Password.MatchString(user.Password, req.Password) {
		return http.StatusBadRequest, errors.New("user not found (2)")
	}

	// Create the response.
	m := new(model.LoginResponse)
	m.Body.Token = ""
	m.Body.Status = http.StatusText(http.StatusOK)

	// Generate the access tokens.
	at, err := p.Token.Generate(ID, 8*time.Hour)
	if err != nil {
		return http.StatusInternalServerError, err
	}

	m.Body.Token = at
	log.Println(at)

	return p.Response.JSON(w, m.Body)
}
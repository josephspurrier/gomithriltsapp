# gomithriltsapp

[![Go Report Card](https://goreportcard.com/badge/github.com/josephspurrier/gomithriltsapp)](https://goreportcard.com/report/github.com/josephspurrier/gomithriltsapp)
[![Build Status](https://travis-ci.org/josephspurrier/gomithriltsapp.svg)](https://travis-ci.org/josephspurrier/gomithriltsapp)
[![Coverage Status](https://coveralls.io/repos/github/josephspurrier/gomithriltsapp/badge.svg?branch=master&timestamp=20200313-01)](https://coveralls.io/github/josephspurrier/gomithriltsapp?branch=master)

[![Swagger Validator](https://online.swagger.io/validator?url=https://raw.githubusercontent.com/josephspurrier/gomithriltsapp/master/src/app/ui/static/swagger.json)](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/josephspurrier/gomithriltsapp/master/src/app/ui/static/swagger.json)

This is a sample notepad application that uses Mithril with TypeScript (and HyperScript) on the front-end (UI) and Go on the back-end (API). It does also support JSX (.tsx file extension) if you want to use it. This project is designed to show good development and CI/CD practices as well as integrations between modern development tools.

This project uses a [Makefile](Makefile) to centralize frequently used commands. The code coverage badge above is only for the back-end API - not the front-end.

![Demo gif](https://user-images.githubusercontent.com/2394539/76177148-ac753e00-6189-11ea-963b-bff38b29e8ed.gif)

## Quick Start with Docker Compose

To test the application locally, you can run these commands. You don't need any of the the dev tools (Go/npm) installed, you only need Docker (and Docker Compose). The Go application serves both the UI and the API depending on the request URL.

```bash
# Clone the repo.
git clone git@github.com:josephspurrier/gomithriltsapp.git

# CD to the project directory.
cd gomithriltsapp

# Build the docker containers.
make docker-build

# Run the docker containers: DB and app.
docker-compose up -d

# Open your browser to the UI: http://localhost
# Open your browser to the API: http://localhost/api
# Open your MySQL tool to the DB: localhost:3306 (root:password)

# Stop and remove the docker containers.
docker-compose down
```

# Environment Prep

Once you have cloned the repo, you will need the following tools for local development.

## Go

You should use Go 1.11 or newer. We recommend [gvm](https://github.com/moovweb/gvm) for installing and managing your versions of Go.

All of the commands below assume you have your `GOPATH` set to the root of the project directory. This is by design because we found (after many projects) it is much easier for you to clone the repo and make changes without having to rewrite imports if they are all contained within the project.

## Node and npm

You should install [NodeJS and npm](https://nodejs.org/).

These are the current versions on the front-end components:

- Mithril [v2.0.4](https://github.com/MithrilJS/mithril.js/releases/tag/v2.0.4) - [docs](https://mithril.js.org/)
- Bulma [v0.8.2](https://www.npmjs.com/package/bulma/v/0.8.2) - [docs](https://bulma.io/documentation/)

## Visual Studio Code (VSCode) Setup

You can use any IDE, but here is what you need for VSCode. It was quite a challenge getting ESLint to work properly when the .eslintrc.js file is not in the root of the project - the trick was the "eslint.workingDirectories" setting. All the settings are included in the .vscode/settings.json file. I use VSCode open only to the root of the project with no other projects. I recommend the following VSCode extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Go](https://marketplace.visualstudio.com/items?itemName=ms-vscode.Go)

## Environment Variables

You can also use [direnv](https://direnv.net/) which sets your environment variables based on your current directory. For instance, you can install direnv, create a file in the root of this project called `.envrc`, and paste in the following:

```bash
# Set $GOPATH for Go.
export GOPATH=`pwd`
# Add the local Go bin directory and the npm bin directory to $PATH.
export PATH=$PATH:`pwd`/bin:`pwd`/src/app/ui/node_modules/.bin
```

Save the file and type `direnv allow`. That will automatically set environment variables when you `CD` into the project root and child folders.

## Makefile Commands

### Start Services

You can run these commands from different terminals to start the services.

```bash
# Create and run the database container.
make db-init

# Start the UI in local dev mode after installing dependencies.
make ui-dep
make ui-dev

# Start the API in local dev mode after installing the dependencies.
make api-dep
make api-dev

# Start the documentation service in local dev mode after install the dependencies.
make doc-dep
make doc-dev
```

### Database Control

These are other database commands you can use:

```bash
# Start the DB container.
make db-start

# Stop the DB container.
make db-stop

# Drop the database, create a new database, and apply new migrations.
make db-reset

# Delete the DB container.
make db-rm
```

### UI and API Tests

Run tests for UI:

```bash
# Run the UI tests.
make ui-test
```

Run tests for the API:

```bash
# Create and run the database container.
make db-init

# Run the API tests.
make api-test
```

# Additional Documentation

This is one repository of a few that demonstrate with different front-end frameworks how to build a notepad application with authentication. A few of the other repositories are:

- [Vue and Go](https://github.com/josephspurrier/govueapp)
- [Mithril and Go](https://github.com/josephspurrier/gomithrilapp)
- [Mithril (TypeScript) and Go](https://github.com/josephspurrier/gomithriltsapp)
- [React (TypeScript) and Go](https://github.com/josephspurrier/goreactapp)

You can reference some off the documention here, though it's specific to the non-TypeScript Mithril repository:
https://josephspurrier.github.io/gomithrilapp/
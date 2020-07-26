# gomithriltsapp

[![Go Report Card](https://goreportcard.com/badge/github.com/josephspurrier/gomithriltsapp)](https://goreportcard.com/report/github.com/josephspurrier/gomithriltsapp)
[![Build Status](https://travis-ci.org/josephspurrier/gomithriltsapp.svg)](https://travis-ci.org/josephspurrier/gomithriltsapp)
[![Coverage Status](https://coveralls.io/repos/github/josephspurrier/gomithriltsapp/badge.svg?branch=master&timestamp=20200313-01)](https://coveralls.io/github/josephspurrier/gomithriltsapp?branch=master)

[![Swagger Validator](https://online.swagger.io/validator?url=https://raw.githubusercontent.com/josephspurrier/gomithriltsapp/master/src/app/ui/static/swagger.json)](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/josephspurrier/gomithriltsapp/master/src/app/ui/static/swagger.json)

This is a sample notepad application that uses Mithril with TypeScript (and HyperScript) on the front-end (UI) and Go on the back-end (API). It does also support JSX (.tsx file extension) if you want to use it. This project is designed to show good development and CI/CD practices as well as integrations between modern development tools.

This project uses a [Makefile](Makefile) to centralize frequently used commands. The code coverage badge above is only for the back-end API - not the front-end.

![Demo gif](https://user-images.githubusercontent.com/2394539/76177148-ac753e00-6189-11ea-963b-bff38b29e8ed.gif)

## Quick Start with Docker Compose

To test the application locally, you can follow these [instructions](https://josephspurrier.github.io/gomithrilapp/docs/tutorial/run-locally). You don't need any of the the dev tools (Go/npm) installed, you only need Docker (and Docker Compose). The Go application serves both the UI and the API depending on the request URL.

## Additional Documentation

This is one repository of a few that demonstrate with different front-end frameworks how to build a notepad application with authentication. A few of the other repositories are:

- [Vue and Go](https://github.com/josephspurrier/govueapp)
- [Mithril and Go](https://github.com/josephspurrier/gomithrilapp)
- [Mithril (TypeScript) and Go](https://github.com/josephspurrier/gomithriltsapp)
- [React (TypeScript) and Go](https://github.com/josephspurrier/goreactapp)

You can reference some off the documention here, though it's specific to Mithril:
https://josephspurrier.github.io/gomithrilapp/
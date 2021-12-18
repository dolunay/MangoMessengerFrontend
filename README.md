# Mango Messenger Angular Frontend

![Build](https://img.shields.io/badge/Build-succeeded-brightgreen)
![License](https://img.shields.io/badge/License-MIT-%23bfc400)
[![NPM](https://img.shields.io/badge/npm-14.17.3-%23009127)](https://nodejs.org/en/download/)
[![Angular](https://img.shields.io/badge/Angular%20CLI-11.2.7-%23d61111)](https://angular.io/guide/setup-local)
[![Contributors](https://img.shields.io/badge/Contributors-2-red)](https://github.com/kolosovpetro/MangoAPI/graphs/contributors)
[![Trello board](https://img.shields.io/badge/Task%20Board-Trello-blue)](https://trello.com/b/Z7IlfrRb/mango-messenger-trello)

## Run locally

- Clone this repository https://github.com/razumovskii/mango-angular-frontend.git
- Install LTS Node Package Manager https://nodejs.org/en/download/
- Check if NPM is installed correctly `npm -v`
- Install Angular CLI 11.2.7  `npm install -g @angular/cli@11.2.7`
- Check id Angular CLI is installed corectly `ng version`
- Go to the project folder
- Install Node modules `npm install`
- Run project `ng serve`

## Docker run

- Build container `docker build -t 1337322420/mango-angular-frontend:0.0.1 .`
- Run `docker run -d -p 9080:80 --name mango_frontend 1337322420/mango-angular-frontend:0.0.1`
- Or via container registry

## Docker run experimental container

- Build container `docker build -f Dockerfile.exp -t 1337322420/mango-angular-frontend:0.0.1exp .`
- Run `docker run -d -e NODE_ENV=staging NG_APP_API_URL="https://example.com" -e PORT=80 -p 9080:80 --name mango_frontend_exp 1337322420/mango-angular-frontend:0.0.1exp`
- Or via container registry (if exists)

## Desktop version run

- `ng build --base-href ./ && electron .`
- Electron guide: https://buddy.works/tutorials/building-a-desktop-app-with-electron-and-angular

## Envirnoments

- Azure #1: https://front.mangomessenger.company (domain valid till 28-Oct-2022)
- Azure #2: https://front.mangomesenger.company (domain valid till 28-Oct-2022)
- Heroku: https://messenger-mango.herokuapp.com

## Git flow

- Each task is assigned a number (MANGO-ID)
- Tasks are at Trello board https://trello.com/b/F4N6Afg7/api-docs
- There are two main branches: master, develop
- Develop will be merged with master when diploma will be ready
- In order to contribute:
  - Clone this repo locally, or pull last changes fropm develop
  - Create new branch, based on develop, name it as task ID, e.g MANGO-ID
  - Solve the task
  - Create pull request to develop

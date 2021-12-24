# Mango Messenger Angular Frontend

## Run locally

- Install NVM: https://github.com/coreybutler/nvm-windows
- Install Node JS 14.17.3: `nvm install 14.17.3`
- Check Node JS installed properly: `node -v`
- Clone current repo locally: `git clone https://github.com/MangoInstantMessenger/MangoMessengerFrontend.git`
- Go to the project folder
- Restore packages: `npm ci`
- Install Angular CLI globally: `npm install -g @angular/cli@11.2.7`
- Check that Angular CLI installed properly: `ng version`
- Run project: `ng serve`

## Docker run

- Build image: `docker build -t 1337322420/mango-angular-frontend:0.0.1 .`
- Run container: `docker run -d -p 9080:80 --name mango_frontend 1337322420/mango-angular-frontend:0.0.1`

## Docker run experimental container

- Build container `docker build -f Dockerfile.exp -t 1337322420/mango-angular-frontend:0.0.1exp .`
- Run `docker run -d -e NODE_ENV=staging -e NG_APP_API_URL="https://example.com" -e PORT=80 -p 9080:80 --name mango_frontend_exp 1337322420/mango-angular-frontend:0.0.1exp`
- Or via container registry (if exists)

## Desktop version run

- `ng build --base-href ./ && electron .`
- Electron guide: https://buddy.works/tutorials/building-a-desktop-app-with-electron-and-angular

## Environments

- Azure Dev: https://front.mangomessenger.company (domain valid till 28-Oct-2022)
- Azure QA: https://front.mangomesenger.company (domain valid till 28-Oct-2022)
- Heroku: https://messenger-mango.herokuapp.com
- GitHub Pages: https://razumovskii.github.io

## Workflows

- Azure Dev. Branch: `azure-dev` based on `develop`, workflow started after merge with actual `develop`. Consumes backend: https://back.mangomessenger.company
- Azure QA. Branch: `azure-qa` based on `develop`, workflow started after merge with actual `develop`. Consumes backend: https://back.mangomesenger.company
- Heroku. Branch: `master` workflow started after actual `develop` merged to `master`. Consumes backend: https://mango-messenger-app.herokuapp.com
- Git pages. Branch: `github-pages` based on `develop`, workflow started after merge with actual `develop`. Consumes backend: https://back.mangomessenger.company

As image below shows

![Environments](Environments.jpg?raw=true)

## Git flow

- Each task is assigned a number (MANGO-UI-ID)
- Tasks are at Trello board https://trello.com/b/F4N6Afg7/api-docs
- There are two main branches: master, develop
- Develop will be merged with master when diploma will be ready
- In order to contribute:
  - Clone this repo locally, or pull last changes from develop
  - Create new branch, based on develop, name it as task ID, e.g MANGO-UI-ID
  - Solve the task
  - Create pull request to develop
  - Congrats, you are contributor!

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

- Build container `docker build -t 1337322420/mango-angular-frontend:0.0.1 .`
- Run `docker run -d -p 9080:80 --name mango_frontend 1337322420/mango-angular-frontend:0.0.1`
- Or via container registry

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

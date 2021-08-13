# Mango Messenger Angular Frontend

![Build](https://img.shields.io/badge/Build-succeeded-brightgreen)
![License](https://img.shields.io/badge/License-MIT-%23bfc400)
[![NPM](https://img.shields.io/badge/npm-14.17.3-%23009127)](https://nodejs.org/en/download/)
[![Angular](https://img.shields.io/badge/Angular%20CLI-11.2.7-%23d61111)](https://angular.io/guide/setup-local)
[![Contributors](https://img.shields.io/badge/Contributors-2-red)](https://github.com/kolosovpetro/MangoAPI/graphs/contributors)
[![Trello board](https://img.shields.io/badge/Task%20Board-Trello-blue)](https://trello.com/b/Z7IlfrRb/mango-messenger-trello)

## Aplication Start
- Clone this repository https://github.com/razumovskii/mango-angular-frontend.git
- Install LTS Node Package Manager https://nodejs.org/en/download/
- Check if NPM is installed correctly `npm -v`
- Install Angular CLI 11.2.7  `npm install -g @angular/cli@11.2.7`
- Check id Angular CLI is installed corectly `ng version`
- Go to the project folder
- Install Node modules `npm install`
- Run project `ng serve`

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

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

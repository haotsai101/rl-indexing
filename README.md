# AngularTemplate

This project can be used as a starter template for angular 8+ projects.
The project comes preconfigured with angular material and  the FamilySearch authentication workflow configured.

## Angular Material

Documentation for angular material can be found at: [https://material.angular.io](https://material.angular.io).
The library is used primarily for add material design styling to buttons, forms, layouts, etc. Individual components are imported into the material module located under the `/material` directory.

## FamilySearch Authentication

The app makes use of fs-sdk-lite, FamilySearch's javascript client library. A wrapper is added on top of this, with types and a few utility methods, called FamilySearchX. Another wrapper is applied on top of this, called FhtlX. This adds methods for using our auth service to authenticate.

The app already has a workflow configured to redirect users that aren't logged in to the home page (or a token expired page upon being logged out). Upon logging in, the FamilySearch token is stored as a cookie for 1 hour. Logging out will invalidate said token and delete the cookie.

## Using the Template

To make use of this template, simply clone the repository. Then, <b>make sure to switch the remote origin to your new project before making any changes or pushing any code!</b> As an example, if a new app was being developed called "new-app", I would create an empty repo for it on bitbucket, and then run something along the lines of: `git remote set-url origin <new-app url>`

Once you have switched the remote origin, you can verify that it is correct by running `git remote show origin`, which will indicate the remote url and status for the repository. Once this is configured correctly, simply start making changes and commits as with any other project.

Make sure to remove any references to "Angular Template" or "angular-template", and replace it with the new app name. This optionally includes build instructions such as the inner folder in the dist folder (check `angular.json`) and the npm package information (check `package.json`). A quick search should suffice for finding other options.

Finally, make sure to update `favicon.ico` and `app-logo.png` with new images.

## PWA

The template is configured as a PWA (progressive web app) by default. Options for this can be configured in `src/app/manifest.webmanifest`. Typically, the only options that will be changed are the name, short name, theme color, and background color. The default icons should be replaced with the app logo in all the given sizes (use the pwa-image-creator repo or some other project to generate the needed files, and just replace the images rather than changing the names in the config webmanifest file).

Once served over https, assuming all other PWA requirements are still met, the app can be downloaded to an end user's phone just like any other app.

## Social Media

There are several meta tags in index.html that are needed for social media sharing. These should be updated with the appropriate information. Additional tags could also be added as needed for individual pages (e.g. the image, description, and title could be customized for each page)

## Google Analytics

To enable google analytics, go to [http://www.google.com/analytics/](http://www.google.com/analytics/) and create a tracking id for the new website. Then replace it in `index.html` where it says `<YOUR_TRACKING_ID>`. Uncomment this code snippet and the code snippet in `app.component.ts`. The console will show various analytics for page visits.

## Updating Angular

Currently, angular releases a new major version every 6 months. It is a good practice to keep up to date with these updates. Usually, upgrading will be a fairly straightforward process where you can simply run a few commands and have dependencies be updated automatically. In most cases there will be few to no breaking changes, and you can simply run `ng update @angular/cli @angular/core @angular/material` to get everything updated properly. More instructions can be found at: [https://update.angular.io/](https://update.angular.io/).

Keep in mind that upgrading between multiple major versions (e.g. 6-8) is not reccomended and is more likely to fail.

## Angular Documentation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# EPITECH PROJECT - AREA

>PROJECT EPITECH TEK3 - AREA 2021

## PROJECT INFORMATION

- **Team size : 5**
> Ghoslain Duvigneau
> Vincent Son
> Corentin Colsenet
> Iskandre Muchery
> Gabriel Riboldi

- **Lib & framework :**
- React Native used for the mobile client;
- React for the web client;
- NodeJS & Express for the server.

- **Compilation : with Docker**
- docker-compose build
- docker-compose up

## USAGE

- **Requirements :**
- Docker

- **Build**
- ``docker-compose up --build`` (building can take up to 5 minutes depending on your configuration)

- **Usage**
- Web Client : http://localhost:8081/ in your browser
- Mobile Client : http://localhost:8081/client.apk, download the APK and install it on your device or your prefered Android Emulator
- List of AREAs : http://localhost:8080/about.json

## API ENDPOINTS

  Returns the list of AREAs:
   > GET: /about.json

  Register the user on the application:
   > POST: /register?username=XXXX&password=XXXX

  Login user:
   > POST: /login?username=XXXX&password=XXXX

  Logout previously logged-in user:
   > GET: /logout

  Add an Area to current user:
   > POST: /area?username=XXXX&string=XXXX    

  Delete an Area from current user:
   > DELETE: /area?username=XXXX&string=XXXX


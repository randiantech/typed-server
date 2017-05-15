# Evertok Core Api

API used for Evertok App

## System Requirements
* NodeJS 7.1.0 or greated
* Tested under Mac OSX 10.11.1 (El Capitan) and Fedora 23

## Installing NodeJS

### Windows and Mac users
* Go to https://nodejs.org/en/download then download and install appropriate version (both in Windows and Mac is a one file installer).

### Linux Users
* Download sources from https://nodejs.org/en/download and run following command to install it:
```sh
$ ./configure && make && make install
```

### Test NodeJS was correctly installed

* Test that NodeJS was correctly installed in your system executing following
  command (it must print v<NODE_VERSION>):
```sh
$ node -v
```  

## Installing Api


* On application root path, run following command to download application dependencies
```sh
$ npm install
```

## Build application

* On application root path, run following command to create bundled file
```sh
$ npm run build
```

## Start application

* On application root path, run following command to start application
```sh
$ npm run start
```

## Build application on reload mode

* On application root path, run following command to start application on watch / reload mode
```sh
$ npm run build:reload
```
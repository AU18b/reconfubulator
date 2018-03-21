### Cloud Foundry Sample App using Nodejs and Mongo DB

[![Greenkeeper badge](https://badges.greenkeeper.io/AU18b/reconfubulator.svg)](https://greenkeeper.io/)
The app provides a REST API that uses a Mongo DB backing service.

The application exposes a RESTful API that can be used to list, store and delete bookmarks in a database.

### How to run it locally
Install a Mongo DB locally and start it up. Clone this application and use the CLI of your choice to execute

    npm start

Now you can access the application in your browser at [http://localhost:3000](localhost:3000).


### How to run it on HCP Cloud Foundry
1. Create a mongo DB service instance in your account with alias `dump`
  ````
  # cf login
  # cf marketplace
  # cf create-service SERVICE PLAN SERVICE_INSTANCE
  ````
2. Clone this project.

* From the project source directory log into Cloud Foundry and execute 
  
  ````
  cf push`
  ````

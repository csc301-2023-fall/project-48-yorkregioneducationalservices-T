# YRES Scheduler: Backend API

Short intro paragraph about the purpose of the backend API, what is its purpose in the overall software, linking to frontend etc.

## Table of Contents
1. [Getting Started](#getting-started)
    - [Setup Instructions](#setup)
    - [Configuration](#configuration)
    - [Running Tests](#running-tests)
2. [Architecture and Design](#architecture-and-design)
    - [Architecture](#architecture)
    - [Package Structure](#package-structure)
    - [Testing](#testing)
    - [Error Handling](#error-handling)
    - [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
    - [Account Service](#account-service)
    - [Activity Service](#activity-service)
    - [Block Service](#block-service)
    - [Camp Service](#camp-service)
    - [Campus Service](#campus-service)
    - [Counselor Service](#counselor-service)
    - [Group Service](#group-service)
    - [Room Service](#room-service)
    - [Schedule Service](#schedule-service)
    - [Student Service](#schedule-service)
4. [Coding Practices](#coding-practices)
5. [Documentation and Resources](#documentation-and-resources)

## Getting started
### Setup
1.	Ensure the latest version of Node.JS with NPM is installed. Site can be found [here](https://nodejs.org/en)
2.	Clone the project repository with the following URL: (https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T.git)
3.	Navigate to the directory following directory in the project and install the dependencies using the command `npm install`: (./deliverables/yres_scheduler/yres_scheduler_backend)
4.	Finally, the start the backend API, use the command `node server.js` while in the same directory as above.

### Configuration
We store a config file (./deliverables/yres_scheduler/yres_scheduler_backend/config), which contains particular information for running the application.
In the config JSON file(s), we store information about the server (the port number it is hosted on), the database (including host address. If running the server locally, change “HOST” to “localhost”), authentication information, and additional constants (such as the singular campus id, and the number of students/counselors in a group).


### Running Tests
We have a series of automated tests for entity creation stored in the project, which can be run while in the same directory as defined in the above setup section (./deliverables/yres_scheduler/yres_scheduler_backend), using the command `npm test`. 
Additionally, we have setup a public testing workspace using Postman to test the various services our backend API should support. The workspace can be found [here](https://www.postman.com/csc301-group-48/workspace/scheduler-api), where a window such as the one show below should be seen:
 
To be able to run the tests, you must be in the “CSC301-group-48” Postman team (accessible in the top right), and have the environment set to “Local” (in the above screenshot, this is changed where it says “No Environment”).
On the left sidebar, there are several tabs. 
-	The Collections tab contains tests for each service we have defined (these are folders of individual tests that perform one specific function).
-	The Environments tab contains specific environment variables which we have defined to be used in our tests. 
-	The Flos tab contains several flowcharts corresponding to each of the services used by the application on a regular basis, which run the tests defined in the Collections tab in the desired order to replicate the correct behavior of the application.
To run the tests, the user must be logged in with a Postman account, and they should have the backend API running [locally] as described in the Setup section (i.e. using the command `node server.js`).
NOTE: Tests cannot be ran on the browser version of Postman without the Postman Desktop Agent Installed.
The services are meant to be tested using the flows. An image is provided below with an example of how the flow test:  

## Architecture and Design
Written for someone who may be contributing to backend API.

### Architecture
Describe big picture architecture.

### Directory Structure
Tree of hyperlinks for software module files.

-> api
	-> controllers:
		-> accountController
		-> activityController etc.

### Testing
Types of tests. How to run them etc.

### Error Handling
Briefly how error handling works, interpreting error responses etc.

### Authentication
How to use the API authentication.

## API Endpoints

Table with api endpoints:
Written for someone who wants to use the API (e.g. frontend dev), not someone who will be contributing to backend API.

### Account Service
Brief description of what the service is.

Table: Request Name | Route | Ex Req Body | Ex Response

### Activity Service
Brief description of what the service is.

Table: Request Name | Route | Ex Req Body | Ex Response

### Block Service
Brief description of what the service is.

Table: Request Name | Route | Ex Req Body | Ex Response

### Camp Service
Brief description of what the service is.

Table: Request Name | Route | Ex Req Body | Ex Response

### Campus Service
Brief description of what the service is.

Table: Request Name | Route | Ex Req Body | Ex Response

### Counselor Service
Brief description of what the service is.

Table: Request Name | Route | Ex Req Body | Ex Response

### Group Service
Brief description of what the service is.

Table: Request Name | Route | Ex Req Body | Ex Response

### Room Service
Brief description of what the service is.

Table: Request Name | Route | Ex Req Body | Ex Response

### Schedule Service
Brief description of what the service is.

Table: Request Name | Route | Ex Req Body | Ex Response

### Student Service
Brief description of what the service is.

Table: Request Name | Route | Ex Req Body | Ex Response

## Coding Practices
The team followed JSDoc practices for documenting the code, which can be read about [here](https://jsdoc.app/).

The team’s approach to designing the backend API employed a variation of clean architecture design (explained more in detail in the Architecture and Design section of this document), where each service begins its use case with receiving a request at its corresponding router file, sending the data down to the controller, which calls a function defined in the service file containing use case logic and may additionally calls a database plugin to access/modify stored data. A response from the plugin is then passed all the way back up along the chain and sent back to the front end of the project to be shown to the user.

Every type of request being handled follows the same architectural format with an entry in the router, controller, service and possibly database plugin files corresponding to the entities involved with the request. If a new type of request is to be supported, it would come with a new, parallel entry in the existing files for the entity being accessed, or with in new files following the same design if the request does not fit in any of the existing paths.
Additionally, any changes made to the back end of the project are checked for refactoring with the front end. A document detailing the front end of the project can be found here: ___


## Documentation & Resources
Listed are several links relevant to the back end of the project, including the links included above in this document:
-	[Project repository page](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T.git)
-	[York Region Educational Services Home Page](https://yorkeducation.org/)
-	[Node.JS Official Website](https://nodejs.org/en)
-	[JSDoc Documentation](https://jsdoc.app/)
-	[PostgreSQL Official Website](https://www.postgresql.org/)
-	[Project Postman testing workspace](https://www.postman.com/csc301-group-48/workspace/scheduler-api)
-   [Project Database README](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/blob/main/deliverables/yres_scheduler/yres_scheduler_database/database.md)


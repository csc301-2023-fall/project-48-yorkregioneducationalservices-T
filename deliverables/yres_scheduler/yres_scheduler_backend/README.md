# YRES Scheduler: Backend API

Short intro paragraph about the purpose of the backend API, what is its purpose in the overall software, linking to frontend etc.

## Table of Contents
1. [Getting Started](#getting-started)
    - [Setup Instructions](#setup-instructions)
    - [Using Postman](#using-postman)
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
Setup instructions (same as overall readme but more detail maybe) with images/gifs. Also explaining config (setting port, auth secret etc.).

### Using Postman
How to use and access postman collection.

### Running Tests
How to run tests.

## Architecture and Design

### Architecture
The design of the YRES Scheduler Backend API aims to follow a hybrid [CLEAN](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and [service-oriented](https://aws.amazon.com/what-is/service-oriented-architecture/#:~:text=you%20implement%20microservices%3F-,What%20is%20service%2Doriented%20architecture%3F,other%20across%20platforms%20and%20languages.) architecture, whereby guidelines are borrowed from both approaches. Use cases are placed into relevant groupings called _services_, typically corresponding to operations relating to an entity (e.g. the student service manages most operations directly related to the student entity). The platform is also divided into hierarchical layers of abstraction, each with specific responsibilities.

![Backend API Higher-level Design Diagram](./assets/backend_api_1.jpg "Backend API Higher-level Design Diagram")
*Backend API Higher-level Design Diagram*

The innermost layer, _Enterprise Business Rules_, defines attributes and  behaviour for all entities that are relevant to the scheduler application (e.g. activity, student etc). [Entities](./api/entities/) are data structures that provide a common language for data to be manipulated across services and use cases. The _Application Business Rules_ layer is where use case logic is implemented for corresponding API requests. [Service modules](./api/services/) export a functions for each API endpoint in their corresponding service. These modules throw informative service-specific errors and may call corresponding DB gateway plugins. Each service also has a corresponding [DB gateway plugin](./api/db/), which implements operations related to querying and manipulating persistant storage.

The _Interface Adapters_ layer is where the unpacking of raw inputs (i.e. request body and query parameters) and preparation of response objects is handled. [Controllers](./api/controllers/), which also act as presenters, call the corresponding service module function. [Routers](./api/routes/) specify the routes, request contracts, and any custom middleware for each API endpoint and are responsible for calling the corresponding controller. [Middleware](./api/middleware/), such as the [Error Handler](./api/middleware/errorHandler.js) and [Authentication Handler](./api/middleware/authHandler.js) are inserted like intermediate layers between the routers and controllers.

### Package Structure
<details open>
<summary>API</summary>

- **[api](./api)**


    <details open>
    <summary>Controllers</summary>

    - **[controllers](./api/controllers)**
        - **[accountController](./api/controllers/accountController.js)**
        - **[activityController](./api/controllers/activityController.js)**
        - **[blockController](./api/controllers/blockController.js)**
        - **[campController](./api/controllers/campController.js)**
        - **[campusController](./api/controllers/campusController.js)**
        - **[counselorController](./api/controllers/counselorController.js)**
        - **[groupController](./api/controllers/groupController.js)**
        - **[roomController](./api/controllers/roomController.js)**
        - **[scheduleController](./api/controllers/scheduleController.js)**
        - **[studentController](./api/controllers/studentController.js)**

    </details>

    <details>
    <summary>DB Gateway Plugins</summary>

    - **[db](./api/db)**
        - **[accountDbPlugin](./api/db/accountDbPlugin.js)**
        - **[activityDbPlugin](./api/db/activityDbPlugin.js)**
        - **[blockDbPlugin](./api/db/blockDbPlugin.js)**
        - **[campDbPlugin](./api/db/campDbPlugin.js)**
        - **[campusDbPlugin](./api/db/campusDbPlugin.js)**
        - **[counselorDbPlugin](./api/db/counselorDbPlugin.js)**
        - **[groupDbPlugin](./api/db/groupDbPlugin.js)**
        - **[roomDbPlugin](./api/db/roomDbPlugin.js)**
        - **[scheduleDbPlugin](./api/db/scheduleDbPlugin.js)**
        - **[studentDbPlugin](./api/db/studentDbPlugin.js)**
    </details>
    
    <details >
    <summary>Entities</summary>

    - **[entities](./api/entities)**
        - **[Activity](./api/entities/Activity.js)**
        - **[AdminUser](./api/entities/AdminUser.js)**
        - **[Block](./api/entities/Block.js)**
        - **[Camp](./api/entities/Camp.js)**
        - **[Campus](./api/entities/Campus.js)**
        - **[Counselor](./api/entities/Counselor.js)**
        - **[Group](./api/entities/Group.js)**
        - **[Room](./api/entities/Room.js)**
        - **[Schedule](./api/entities/Schedule.js)**
        - **[ServiceErrors](./api/entities/ServiceErrors.js)**
        - **[Student](./api/entities/ServiceErrors.js)**
    </details>

    <details>
    <summary>Middleware</summary>

    - **[middleware](./api/middleware)**
        - **[authHandler](./api/middleware/authHandler.js)**
        - **[errorHandler](./api/middleware/errorHandler.js)**
    </details>

    <details>
    <summary>Routers:</summary>

    - **[routes](./api/routes)**
        - **[accountRoutes](./api/routes/accountRoutes.js)**
        - **[activityRoutes](./api/routes/activityRoutes.js)**
        - **[blockRoutes](./api/routes/blockRoutes.js)**
        - **[campRoutes](./api/routes/campRoutes.js)**
        - **[campusRoutes](./api/routes/campusRoutes.js)**
        - **[counselorRoutes](./api/routes/counselorRoutes.js)**
        - **[groupRoutes](./api/routes/groupRoutes.js)**
        - **[roomRoutes](./api/routes/roomRoutes.js)**
        - **[scheduleRoutes](./api/routes/scheduleRoutes.js)**
        - **[studentRoutes](./api/routes/studentRoutes.js)**
    </details>

    <details>
    <summary>Services:</summary>

    - **[services](./api/services)**
        - **[accountService](./api/services/accountService.js)**
        - **[activityService](./api/services/activityService.js)**
        - **[blockService](./api/services/blockService.js)**
        - **[campService](./api/services/campService.js)**
        - **[campusService](./api/services/campusService.js)**
        - **[counselorService](./api/services/counselorService.js)**
        - **[groupService](./api/services/groupService.js)**
        - **[roomService](./api/services/roomService.js)**
        - **[scheduleService](./api/services/scheduleService.js)**
        - **[studentService](./api/services/studentService.js)**

            <details>
            <summary>Algorithms:</summary>

            - **[algo](./api/services/algo)**
                - **[accountService](./api/services/algo/scheduleAlgo.js)**
                - **[activityService](./api/services/algo/groupAlgo.js)**
            </details>

    </details>

- **[config](./config)**
- **[logging](./logging)**
- **[app.js](./app.js)**
- **[logger.js](./logger.js)**
- **[server.js](./server.js)**

</details>

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
Ensure JSDoc is written correctly (link to jsdoc). Ensure architecture is adhered to. Ensure changes are always checked for refactoring with frontend (link to frontend repo/readme). Anything else?

## Documentation & Resources
List of links for extra docs and resources:
- Postman collection download link;
- Generated JSDoc download link;
- YRES;

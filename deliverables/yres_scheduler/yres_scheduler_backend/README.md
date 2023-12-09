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
The design of the YRES Scheduler Backend API aims to follow a hybrid [CLEAN](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and [Service-oriented](https://aws.amazon.com/what-is/service-oriented-architecture/#:~:text=you%20implement%20microservices%3F-,What%20is%20service%2Doriented%20architecture%3F,other%20across%20platforms%20and%20languages.) Architecture, whereby guidelines are borrowed from both approaches. The platform is divided into hierarchical layers of abstraction, each with specific responsibilities. The innermost layer, _Enterprise Business Rules_, defines attributes and  behaviour for all entities that are relevant to the scheduler application (e.g. activity, student etc). Entities are data structures that provide a common language for data to be manipulated across services and use cases.

![Backend API Higher-level Design Diagram](./docs/backend_api_1.jpg "Backend API Higher-level Design Diagram")

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
Ensure JSDoc is written correctly (link to jsdoc). Ensure architecture is adhered to. Ensure changes are always checked for refactoring with frontend (link to frontend repo/readme). Anything else?

## Documentation & Resources
List of links for extra docs and resources:
- Postman collection download link;
- Generated JSDoc download link;
- YRES;

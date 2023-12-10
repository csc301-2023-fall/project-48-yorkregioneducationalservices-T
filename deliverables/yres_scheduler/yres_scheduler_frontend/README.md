# YRES Scheduler: Frontend

The frontend in the YRES Scheduler provides a practical interface for users to manage schedules, profiles, and floorplans. Functioning as the mediator between the user and the backend, it streamlines interactions, allowing users to manipulate data and generate schedules easily. Following a modular and component-based design using React.js, the architecture prioritizes simplicity and reusability.

This README provides set-up instructions along with an overview of the architecture and design. The README also provides information about the key subfolders and the app's styling.


## Table of Contents
1. [Getting Started](#getting-started)
    - [Setup Instructions](#setup-instructions)
    - [Running Tests](#running-tests)
2. [Architecture and Design](#architecture-and-design)
    - [Architecture](#architecture)
    - [Directory Structure](#directory-structure)
    - [Error Handling](#error-handling)
    - [Authentication](#authentication)
3. [Pages](#pages)
    - [floorplan](#floorplan)
    - [profiles](#profiles)
    - [schedules](#schedules)
5. [Components](#components)
6. [Modals](#modals)
7. [Styling](#styling)
8. [Coding Practices](#coding-practices)
9. [Documentation and Resources](#documentation-and-resources)

## Getting started

### Setup
 1. Navigate to the './deliverables/yres_scheduler/yres_scheduler_frontend' directory and install dependencies: `npm i --legacy-peer-deps`.
 2. Then build the frontend application: `npm run build`.
 3. Finally, start the frontend server: `npm start`.

### Running Tests
1. Complete all the necessary frontend setup steps
2. Then run jest tests: `npm test`.

## Architecture and Design

### Architecture
This web application project has a directory structure that follows a modular and component-based architecture, using React.js for frontend development. The "src/app" directory is the primary folder that encompasses various modules and components.

The "main-menu" module is the pages folder that contains sub-modules like "floorplan," "profiles," and "schedules." Each sub-module contains a "pages.jsx" file, defining React components for specific functionalities related to floorplans, user profiles, and schedules. The "layout.jsx" file in the "main-menu" module serves as the primary layout component for this section of the application. The three submodules here are the three pages the user can access upon logging in.

To handle authentication, there's an "api/auth/[nextauth]" directory, which includes a "route.js" file defining an API route for authentication using NextAuth.

The "components" directory is a key part of the architecture, with various React components for different purposes. These components include tables (e.g., "activitiesTable.jsx," "counselorProfilesTable.jsx"), UI elements (e.g., "alert.jsx," "loading.jsx"), and functionality-specific components (e.g., "activityCreate.jsx," "counselorAdd.jsx").

The "data" directory stores data-related files, such as "example.json" and "school_floorplan_example.jpg," providing resources for frontend development independent of backend.

The "login" directory handles the login functionality, with "layout.jsx" defining the layout component for the login page, and "page.jsx" specifying the React component for the login page.

Lastly, there are globally applicable files like "favicon.ico" for the application's favicon, "global.css" for global styles, "helper.jsx" for shared utility functions, "layout.jsx" for the main layout of the entire application, "not-found.jsx" to handle 404 errors, and "page.jsx" as a generic page layout component.

This structure promotes code organization, modularity, and reusability, following best practices for React.js development. It provides a clear separation of concerns between different features, making it easier to maintain and scale the application.

### Directory Structure
```
src/app/
|-- __tests__/
|   |-- __snapshots__/
|   |   |-- header.js.snap
|   |
|   |-- header.js
|
|-- (main-menu)/
|   |-- floorplan/
|   |   |-- pages.jsx
|   |
|   |-- profiles/
|   |   |-- pages.jsx
|   |
|   |-- schedules/
|   |   |-- pages.jsx
|   |
|   |-- layout.jsx
|
|-- api/auth/[nextauth]
|   |-- route.js
|   
|-- components/
|   |-- activitiesTable.jsx
|   |-- alert.jsx
|   |-- counselorProfilesTable.jsx
|   |-- floorPlanCanvas.jsx
|   |-- floorPlanCanvasWrapper.jsx
|   |-- footer.jsx
|   |-- friendSearchTable.jsx
|   |-- groupsTable.jsx
|   |-- header.jsx
|   |-- importStudentCSV.jsx
|   |-- loading.jsx
|   |-- profilesSwitcher.jsx
|   |-- refinedDropDowns.jsx
|   |-- roomsTable.jsx
|   |-- scheduleTable.jsx
|   |-- scheduleTimetable.jsx
|   |-- sidebar.jsx
|   |-- studentProfilesTable.jsx
|   |-- table.jsx
|
|-- data/
|   |-- example.json
|   |-- school_floorplan_example.jpg
|
|-- login/
|   |-- layout.jsx
|   |-- page.jsx
|
|-- modals/
|   |-- activityCreate.jsx
|   |-- activityEdit.jsx
|   |-- counselorAdd.jsx
|   |-- counselorEdit.jsx
|   |-- enemyAdd.jsx
|   |-- friendAdd.jsx
|   |-- imageAdd.jsx
|   |-- importStudent.jsx
|   |-- roomsCreate.jsx
|   |-- roomsEdit.jsx
|   |-- studentAdd.jsx
|   |-- studentEdit.jsx
|
|-- favicon.ico
|-- global.css
|-- helper.jsx
|-- layout.jsx
|-- not-found.jsx
|-- page.jsx
```

### Error Handling
On the front end, our code parses backend responses with fetch requests, extracting error codes for error handling. User-friendly alerts and notifications are displayed in response to an error, notifying the user of the error code and message. 
When users input information they are also prompted with errors if they input information that is inaccurate (i.e. trying to add a friend that doesn't exist)

### Authentication
How to use the API authentication.

## Pages
These are the three pages that the user can access when logged in. They are found in the React.js src/app/(main-menu) folder. Each page is tied to a key feature.

### floorplan
##### (Floorplan Management)
Users can upload a floorplan image for room reference and manually add rooms. Additionally, they can manually add potential activities for scheduling. The platform allows users to edit, search, delete, or add both rooms and activities. 
The floorplan management feature, located on the floorplan page, ensures precise information for schedule generation.

### profiles
##### (Profile Management)
Users can add student and counselor profiles manually or through a .csv file import using a form activated by a button. The added profiles are stored in a database and displayed in a searchable table. Users can edit and delete profiles directly from the table, with a search bar at the top for convenience. 
Editing involves using the same form as adding, where each field serves as an attribute. Additionally, users can delete the entire database, a function typically employed when a camp session concludes. This profile management feature, situated on the profiles page, ensures accurate information for schedule generation.

### schedules
##### (Schedule Generation)
Once users input profiles, rooms, and activities, they can easily generate schedules by visiting the schedule page and clicking "generate schedule." 
This process also involves backend creating groups based on inputted information like preferences, sex, and age. The feature aims to simplify the mixing and matching process, resulting in an ideal schedule.

## Components
The components are found in the React.js src/app/components folder. They are utilized in the three main pages that the user can access and within each other. They ensure adherence to modularity and keep functions reasonably short which is crucial in React development for maintainability and readability.
Greater detail for each component can be found in comments within the file.
| Component                   | Description                                             |
|-----------------------------|---------------------------------------------------------|
| activitiesTable.jsx         | Manages and displays activities in a table.             |
| alert.jsx                   | Displays alert messages, for easy use in other components|
| counselorProfilesTable.jsx  | Manages counselor profiles in a table.                  |
| floorPlanCanvas.jsx         | Renders a floor plan canvas.                             |
| floorPlanCanvasWrapper.jsx  | Wrapper for the floor plan canvas.                       |
| footer.jsx                  | Website's footer component.                             |
| friendSearchTable.jsx       | Manages and displays friend search results in a table. |
| groupsTable.jsx             | Manages and displays groups in a table.            |
| header.jsx                  | Website's header component.                             |
| importStudentCSV.jsx        | Imports student data from a CSV file.                   |
| loading.jsx                 | Displays loading indicators.                            |
| profilesSwitcher.jsx        | Switches between student and counselor profiles.         |
| refinedDropDowns.jsx        | Displays refined dropdowns, for easy use in other components|
| roomsTable.jsx              | Manages and displays rooms in a table.                  |
| scheduleTable.jsx           | Manages and displays schedules in a table.              |
| scheduleTimetable.jsx       | Manages and displays the scheduled timetable.           |
| sidebar.jsx                 | Website's sidebar component.                            |
| studentProfilesTable.jsx    | Manages student profiles in a table.                    |
| table.jsx                   | Generic table component for reuse across the application|

## Modals
The modals are found in the React.js src/app/modals folder. They are pop-up components that display fields in a form. They are used to allow the user to input information for creating or updating data. 
Greater detail for each modal can be found in comments within the file.
| Modal                | Description                                    |
|----------------------|------------------------------------------------|
| activityCreate.jsx   | Modal for creating new activities.             |
| activityEdit.jsx     | Modal for editing existing activities.         |
| counselorAdd.jsx     | Modal for adding new counselors.               |
| counselorEdit.jsx    | Modal for editing existing counselor details. |
| enemyAdd.jsx         | Modal for adding new enemies for a student.   |
| friendAdd.jsx        | Modal for adding new friends for a student.    |
| imageAdd.jsx         | Modal for adding new floor plan image.         |
| importStudent.jsx    | Modal for importing student data.              |
| roomsCreate.jsx      | Modal for creating new rooms.                  |
| roomsEdit.jsx        | Modal for editing existing room details.      |
| studentAdd.jsx       | Modal for adding new students.                 |
| studentEdit.jsx      | Modal for editing existing student details.   |

## Styling
The global overall styling is found in the React.js src/app/global.css Cascade Style Sheet. It contains 8 subcategories.
### General App Wide Styles:
Defines styles for elements like #menu-layout, #app-content, and #footer that are used throughout the website.

### Generic Helper Styles:
Includes styles for utility classes like .center-align, .right-align, and .left-align.

### 404 Page Styling:
Describes styles specific to the 404 error page (notFound-container, notFound-heading, notFound-text, notFound-link).

### App Header Styling:
Contains styles for the application header (nav-header, nav-tabs, nav-link, header-logo, welcome).

### Login Specific Styles:
Defines styles for elements on the login page (#login-header, #login-form, #login-message, login-title).

### Floorplan Specific Styles:
Specifies styles for elements related to floorplans (floorplan-box img, .floorplan-canvas).

### Schedules Specific Styles:
Defines styles for the schedule-related elements (#schedules, #schedule-pane, #schedule-timetable, .timetable-header, .timetable-event, .timetable-hour).

### Profiles Specific Styles:
Contains styles for the profiles section (#profiles-header, #profiles-table, #profiles-page, .action-button, .table-actions, .table-container).

## Coding Practices
Our coding practices ensure distinct categorization throughout our files. All components are kept in the components folder, all helper functions are kept within helper.jsx and all modals are kept within the modals folder.
We utilized modals for all user input when the user wanted to change or create an object. Our coding practices ensured that everything was modular and neatly organized.
 
## Documentation & Resources
List of links for extra docs and resources:
- 

# YRES Scheduler 

![image](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/109639262/83c81b5e-102f-48ff-9749-a3f7869d62d9)
[Link to Deployed Product](http://ec2-18-218-217-198.us-east-2.compute.amazonaws.com:3000/login) The username is `admin`, and the password is `adminpw`.
## Partner Intro
Partner Contact Information:
Hugo Quan: Web Developer co-op, primary point of contact
hugo.quan@upluseducation.ca

Celina Yueh: Web Developer co-op, secondary point of contact
celina.yueh@upluseducation.ca

## Description of the project
The product is a web application for planning summer camps. The website allows the user to input a floor plan, rooms, activities, students, and counselors. Details about each element will be included in the input. For example, an individual student will have information about their name, age, sex and group preferences. To make this easier we allow mass import through CSV files. The website will then generate groups and schedules based on the inputted information. The benefits of our application are the simplification of the scheduling process, the accuracy afforded, and the ease of distribution for the schedule. Our app solves the problem of course coordinators having to manually create schedules accounting for various complicated factors and the distribution of the schedules.

## Key Features
### Profile management
Users can add two types of profiles: student and counselor. They can add them manually, one by one, through a form activated from a button, or by importing a .csv file. The added profile will be stored in a database, and displayed to the user in a table. Users will be able to search for, edit, and delete those profiles in the table. There is a search bar above the table and there are edit and delete icons that allow for profile alteration. Editing presents the same form as adding, with each field corresponding to an attribute.

Users can also delete a whole database (useful for when the camp session ends). There is a profile management feature found on the profiles page so that we have accurate information when generating a schedule.

 ### Floorplan management
Users can upload an image of a floor plan (for visual reference of each room). They can then manually add each room. The users can also manually add potential activities that could take place in the schedule. Users can edit, search, delete, or add rooms and activities.

The floor plan management feature is found on the floor plan page so that we have accurate information when generating a schedule.

### Schedule generation
After inputting profiles, rooms, and activities, users can generate schedules based on the inputted information. This is done by visiting the schedule page and clicking on "generate schedule". The generate schedule call will also include the generation of groups based on the given information (such as preferences, sex and age). The purpose of this feature is to simplify the mixing and matching to create an ideal schedule.

### Account system
Only logged-in users can access the application. This is to ensure that only official YRES camp coordinators have access to personal student information and can interact with scheduling data. The account login information will be given to the partner in the handoff.

### Schedule exportation
Users can filter and view the generated schedule for each group. They can then export the filtered or non-filtered schedule into a CSV file to make slight modifications or print it as a PDF file. This is to ensure that the schedule can be easily distributed among all the camp staff members.

<img width="750" alt="Screenshot 2023-11-20 at 2 54 00 AM" src="https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/65968691/98041d11-5876-47ad-9ae0-d5ec804e81d8">
​

## Instructions
### Logging in
1. The user lands at the login page before they can access the app. They input a username and password to log into a pre-existing account that we give to them during the handoff. This step needs to be completed for the user to be granted authorization.
### Inputting Information
 2. Once in the app and on the profiles page, they can insert data relating to students and counselors in a CSV file. They don't need to input any IDs for students or counselors (besides student numbers), because we generate them. All available data will be displayed in an interactive table that allows for the editing and deletion of students or counselors. The user can toggle between students and counselors through a dropdown. They can also choose to search for student/counselor profiles and manually add profiles.
 3. On another page called 'floorplan', they can input a floor plan for a building on the camp along with rooms that each have a room type. We will generate room IDs for each room. This data can also be read, updated, searched, and deleted in the same way as the other entities. However, adding rooms must be done manually. There is no mass import CSV option.
 4. On the same floorplan page, they can also input activities that will take place at the camp, each of which will contain data such as; available rooms to be hosted in, number of occurrences throughout the camp, name of the activity, etc. This data can also be read, updated, searched, and deleted in the same way as the other entities. Adding activities must also be done manually. There is no mass import CSV option.
### Generate Groups and Schedule
 5. On another page named 'schedule', the user can click a button to generate a schedule and groups. Groups and schedules will be displayed in a table and calendar on the page with the option to download a CSV file of the schedule. Students are grouped according to their specifications (i.e. preferences of students to be kept apart/together, age, sex) in groups of up to 20 students with 1 or 2 counselors supervising (These numbers are customizable in the configuration file).
 *** Note that a schedule can only be created after all necessary information has been inputted.

## Development Requirements
 1. Ensure the latest version of [Node.JS](https://nodejs.org/en) with NPM is installed.
 2. Clone the team repository: `https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T.git`
 3. Navigate to the './deliverables/yres_scheduler/yres_scheduler_backend' directory and install dependencies: `npm install`.
 4. Start the backend API `node server.js`.
 5. To run the backend tests run: `npm test`.
 6. Navigate to the './deliverables/yres_scheduler/yres_scheduler_frontend' directory and install dependencies: `npm install`.
 7. Then build the frontend application: `npm run build`.
 8. Finally, start the frontend server: `npm start`.

We leverage GitHub automation to employ CI/CD and Docker for our development pipeline. Our PostgreSQL database is consistently hosted on an EC2 instance, ensuring its availability. As a result, the database is automatically deployed and seamlessly connected to the backend whenever it's run locally. To connect to the database, ensure you have [psql](https://www.postgresql.org/download/) installed, then  `psql -h ec2-18-218-217-198.us-east-2.compute.amazonaws.com -p 5432 -U yres -d yres_db` password: `csc301`.

 ### Key Documentation for Development
 * Documentation regarding DevOps can be found in the following [ReadMe](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/blob/main/.github/workflows/DevOps.md).
 * Documentation regarding the database can be found in the following [ReadMe](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/blob/feature/entities_marc/deliverables/yres_scheduler/yres_scheduler_database/database.md).
 * Documentation regarding the backend API can be found in the following [ReadMe](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/blob/feature/entities_marc/deliverables/yres_scheduler/yres_scheduler_backend/README.md).
 * Documentation regarding the frontend design can be found in the following [ReadMe](#).
  
 ## Deployment and Github Workflow
 * Within the frontend codebase, since we are working with Next.js, we have been using file-based routing, meaning routes are named by their folder, rather than the actual filename. Thus, each high-level page file is simply named `page.jsx`, but stored within a folder with proper names such as, `profiles`, `schedules` etc.
 * Our group is divided into two subteams, one team for the frontend and another for the backend. Our GitHub workflow consists primarily of pull requests from personal branches (usually labelled by name and subteam). Each pull request is reviewed by at least two members of the subteam the PR belonged to (in the case of frontend this would be the entire team). Anyone can merge a pull request, as long as it has been reviewed by a sufficient number of people and has had all requested changes made. This workflow leads to great collaboration, without the need for any specific authoritative figures dictating what can and cannot be merged, as well as an overall feeling of unity within the group.

 ![image](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/109639262/bd4cb238-b7e0-4daa-bec9-3bb52ffef6ff)

 * Our development process is meticulously structured to prevent conflicts between teams by separating backend and frontend code. We leverage GitHub Workflows for continuous integration tests, employing four primary automation workflows. These encompass CI for the backend, CD for the backend, CI/CD for the database, and CI/CD for the frontend—all seamlessly integrated into an EC2 instance. These workflows are triggered by various actions such as pull requests, pushes/merges to the main branch, or specific file alterations.
 * We have three separate folders: frontend, backend, and database. This is to ensure each process is modular and doesn't conflict with the other two. The backend process is started within the backend folder and the same is true for the frontend and database folders.
 * This streamlined approach ensures effortless and automated deployment, maintaining a continuously operational main version while validating every build before integration into the main branch. This not only simplifies deployment but also guarantees a stable and reliable codebase at all times.
 
![Screenshot 2023-11-16 at 12 19 19 AM](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/65968691/cc3f71ee-a7b2-4b1a-b38f-0b997a550ff7)

 ## Coding Standards and Guidelines
We will use [ESLint](https://eslint.org) to ensure adherence to the [standard JavaScript style guide](https://google.github.io/styleguide/jsguide.html), and GitHub workflows to prevent merges to the main branch which have not passed all tests. We will also use [Swagger](https://swagger.io) for documenting the purposes and contracts of all backend API requests. The frontend will use file-based routing. 
​
 ## Licenses 
​
Why the MIT license?
* Simplicity: It's clear, allowing virtually unrestricted use, and our partners support using it.
* Popularity: The license is widely recognized and understood as Many open-source projects use it.
* No Copyleft: Flexible for various uses as someone who takes this project, makes modifications, and distributes their modified version isn’t required to be open-sourced.

Impacts on the codebase + development:
* Freedom: Anyone can use, modify, or distribute the code, even for commercial purposes.
* No Warranty: The software is provided "as-is".
* Attribution: Users must include the original MIT license text when using the code.
* Openness: While encouraging contributions, the license doesn't ensure all modifications remain open-source.

# YRES Scheduler 

<img width="750" alt="Screenshot 2023-11-17 at 12 42 34 AM" src="https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/65968691/31d3ab77-02c4-44a2-9460-b0783665c2bb">


[Link To Deployed App](http://ec2-18-218-217-198.us-east-2.compute.amazonaws.com:3000/)
(Note FloorPlan and View Schedule is currently using dummy data)

## Partner Intro
Partner Contact Information:
Hugo Quan: Web Developer co-op, primary point of contact
hugo.quan@upluseducation.ca

Celina Yueh: Web Developer co-op, secondary point of contact
celina.yueh@upluseducation.ca

York Region Educational Services (YRES) is a non-profit organization based in Ontario focused on providing education to people of all ages. They offer classes in several programs such as English and French, and STEAM. YRES also hosts summer camp programs for children ages 5-12.

## Description about the project
The product is a web application that generates student summer camp schedules using an inputted floor plan and user data. The value is the simplification of the scheduling process, the accuracy afforded, and the ease of distribution for the schedule. This solves the problem of the course coordinators having to manually create schedules accounting for various factors and the distributing of the schedules.
​
## Key Features
 * Schedule generation: Users can generate schedules based on counselors, and campus information. A campus will hold many camps in a week. On each day, they will take classes from morning to afternoon. Each class is assigned two staffs as instructors. The generated schedule has all class arrangements of the campus.
 * Account system: Only course manager(s) of the YRES organization will be able to create an account. Only loginned users can access the application. (Done in backend - integration required on frontend)
 * Profile management: Add: Users can add four types of profiles (student, counselor, staff, and class). They can add either one-by-one manually through a form or by importing a .csv file. The added profile will be stored in a database, and meanwhile displayed to the user in a table. Edit: Users will be able to search for, edit, and delete those profiles in the table.
They can search in the table to find the interested profile, then edit through a form, or delete it. They can also delete a whole database (used when the camp session ends).
 * Campus and floor plan management: Add: Users can add new campus, and for each campus add new floor plans. Each floor plan has an associated image. For each floor plan, users can add classrooms (it is ideal they can do so on the image, but not strictly required). Edit: Users can edit the name of campuses, name and image of floor plans. They can also delete campuses, floor plans, and classrooms of a floor plan.
 * Schedule exportation: Users can filter the generated schedule for each camp or each classroom. Then they can export the filtered or non-filtered schedule into .csv to make slight modifications, or print it as .pdf.

<img width="750" alt="Screenshot 2023-11-17 at 12 52 22 AM" src="https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/65968691/2ede121e-d1d3-4c3c-9976-d560bbdeb733">

​
## Instructions
 * The user lands at the sign up page before they can access the app, where they input a username and password to create an account. If they already have a page, they need to input a valid username-password pair to access the app.
 * Once in the app, they can insert data relating to students and counselors in a csv located in deliverables/yres_scheduler/yres_scheduler_frontend/src/app/data/student_add_data.csv where each student has a unique id. They can also remove and/or update and/or read data that has been inputted previously.
 * On another page, they can input a floor plan for a building on the camp and place dots on the map corresponding to different rooms, which have a room type and a unique room number. This data can also be read, updated, and deleted in the same way as the other entities.
 * Users can also add input activities which will take place at the camp, each of which will contain data like; possible room assignment, number of occurences throughout the camp, activity name etc.
 * On another page, the user can ask to generate a schedule, which will return as a downloadable file csv file, where students are grouped according to their specifications (i.e. pairs of students to keep apart/together, etc.) in groups of approximately 20 and between 1 and 2 counselors.

 ## Development requirements
 1. Ensure the latest version of [Node.JS](https://nodejs.org/en) with NPM is installed.
 2. Clone the team repository: `https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T.git`
 3. Navigate to the './deliverables/yres_scheduler/yres_scheduler_backend' directory and install dependencies: `npm install`.
 4. Start the backend API `node server.js`.
 5. To run the backend tests run: `npm test`
 6. Navigate to the './deliverables/yres_scheduler/yres_scheduler_frontend' directory and install dependencies: `npm install`.
 7. Then build the frontend application: `npm run build`.
 8. Finally, start the frontend server: `npm start`.

We leverage GitHub automation to employ CI/CD and Docker for our development pipeline. Our PostgreSQL database is consistently hosted on an EC2 instance, ensuring its availability. As a result, the database is automatically deployed and seamlessly connected to the backend whenever it's run locally. To connect to the db ensure you have [psql](https://www.postgresql.org/download/) installed, then  `psql -h ec2-18-218-217-198.us-east-2.compute.amazonaws.com -p 5432 -U yres -d yres_db` password: csc301.
  
 ## Deployment and Github Workflow
 * Within the frontend codebase, since we are working with Next.js, we have been using file-based routing, meaning routes are named by their folder, rather than the actual filename. Thus, each high level page file is simply named `page.jsx`, but stored within folder with names such as, `profiles`, `schedules` etc. 
 * Our group is divided into two subteams, one team for frontend and one team for backend. Our github workflow consists primarily iof pull-requests from personal branches (usually labelled by name and subteam). Each pull-request is review by at least two members of the subteam the PR belonged to (in the case of frontend this is the entire team). Anyone can merge a pull-request, as long as it has been reviewed by a sufficient amount of people and have had all requested changes made. This workflow leads to great collaboration, without the need of any specific authoratative figures dictating what can and cannot be merged. It has led to great teamwork and an overall feeling of unity within the group. 
 * Our development process is meticulously structured to prevent conflicts between teams by separating both backend and frontend code. We leverage Github Workflows for continuous integration tests, employing four primary automation workflows. These encompass CI for the backend, CD for the backend, CI/CD for the database, and CI/CD for the frontend—all seamlessly integrated onto an EC2 instance. These workflows are triggered by various actions such as pull requests, pushes/merges to the main branch, or specific file alterations.
 * This streamlined approach ensures effortless and automated deployment, maintaining a continuously operational main version while validating every build before integration into the main branch. This not only simplifies deployment but also guarantees a stable and reliable codebase at all times.
![Screenshot 2023-11-16 at 12 19 19 AM](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/65968691/cc3f71ee-a7b2-4b1a-b38f-0b997a550ff7)
 ## Coding Standards and Guidelines
We will use [ESLint](https://eslint.org) to ensure adherence to the [standard JavaScript style guide](https://google.github.io/styleguide/jsguide.html), using Github workflow to prevent merges to main that have not passed all tests. We will also use [Swagger](https://swagger.io) for documenting the purposes and contracts of all backend API requests. On the frontend we use file base routing. 
​
 ## Licenses 
​
Why the MIT license?
* Simplicity: It's clear, allows virtually unrestricted use, and our partners were okay with it.
* Popularity: Many open-source projects use it, thus it is widely recognized and understood. 
* No Copyleft: Flexible for various uses as someone that takes this project, makes modifications, and distributes their modified version aren’t required to be open-sourced.

Impacts on the codebase + development:
* Freedom: Anyone can use, modify, or distribute the code, including for commercial purposes.
* No Warranty: The software is provided "as-is".
* Attribution: Users must include the original MIT license text when using the code.
* Openness: While encouraging contributions, the license doesn't ensure all modifications remain open-source.

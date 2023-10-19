# YRES Scheduler 

​​<img width="500" alt="Screenshot 2023-09-29 at 9 43 11 PM" src="https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/65968691/5f692ff7-e83c-44dc-9ed7-4ba49f608887">

## Partner Intro
Partner Contact Information:
Hugo Quan: Web Developer co-op, primary point of contact
hugo.quan@upluseducation.ca

Celina Yueh: Web Developer co-op, secondary point of contact
celina.yueh@upluseducation.ca

York Region Educational Services (YRES) is a non-profit organization based in Ontario focused on providing education to people of all ages. They offer classes in several programs such as English and French, and STEAM. YRES also hosts summer camp programs for children ages 5-12.

## Description about the project
Keep this section very brief.
 * Provide a high-level description of your application and it's value from an end-user's perspective
 * What is the problem you're trying to solve? Is there any context required to understand **why** the application solves this problem?

The product is a web application that generates student summer camp schedules using an inputted floor plan and user data. The value is the simplification of the scheduling process, the accuracy afforded, and the ease of distribution for the schedule. This solves the problem of the course coordinators having to manually create schedules accounting for various factors and the distributing of the schedules.
​
## Key Features (More to be added)
 * Account system: Only course manager(s) of the YRES organization will be able to create an account. Only loginned users can access the application.
 * Profile management: Add: Users can add four types of profiles (student, counselor, staff, and class). They can add either one-by-one manually through a form or by importing a .csv file. The added profile will be stored in a database, and meanwhile displayed to the user in a table. Edit: Users will be able to search for, edit, and delete those profiles in the table.
They can search in the table to find the interested profile, then edit through a form, or delete it. They can also delete a whole database (used when the camp session ends).
 * Campus and floor plan management: Add: Users can add new campus, and for each campus add new floor plans. Each floor plan has an associated image. For each floor plan, users can add classrooms (it is ideal they can do so on the image, but not strictly required). Edit: Users can edit the name of campuses, name and image of floor plans. They can also delete campuses, floor plans, and classrooms of a floor plan.
 * Camp division: Users can generate camp plans based on students and counselors. A camp will have 2 counselors leading 25 students.
 * Schedule generation: Users can generate schedules based on camp division, staff, and campus information. A campus will hold many camps in a week. On each day, they will take classes from morning to afternoon. Each class is assigned two staffs as instructors. The generated schedule has all class arrangements of the campus.
 * Schedule exportation: Users can filter the generated schedule for each camp or each classroom. Then they can export the filtered or non-filtered schedule into .csv to make slight modifications, or print it as .pdf.
​
## Instructions (More to be added)
 * The user lands at the sing up page before they can access the app, where they input a username and password to create an account. If they already have a page, they need to input a valid username-password pair to access the app.
 * Once in the app, they can insert data relating to students and counselors (format unspecified). They can also remove and/or update and/or read data that has been inputted previously.
 * On another page, they can input a floor plan for a building on the camp and place dots on the map corresponding to different rooms, which have a room type and a unique room number. This data can also be read, updated, and deleted in the same way as the other entities.
 * On another page, the user can ask to generate a schedule, which will return as a downloadable file (format unspecified) where students are grouped according to their specifications (i.e. pairs of students to keep apart/together, etc.) in groups of approximately 20 and between 1 and 2 counselors.

 ## Development requirements (To Be Determined)
 * What are the technical requirements for a developer to set up on their machine or server (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application. You should address this part like how one would expect a README doc of real-world deployed application would be.
 * You can see this [example](https://github.com/alichtman/shallow-backup#readme) to get started.
 
 ## Deployment and Github Workflow (To Be Determined)
​
Describe your Git/GitHub workflow. Essentially, we want to understand how your team members share codebase, avoid conflicts and deploys the application.
​
 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Describe your overall deployment process from writing code to viewing a live application
 * What deployment tool(s) are you using? And how?
 * Don't forget to **briefly justify why** you chose this workflow or particular aspects of it!

 ## Coding Standards and Guidelines
We will use [ESLint](https://eslint.org) to ensure adherence to the [standard JavaScript style guide](https://google.github.io/styleguide/jsguide.html), using Github workflow to prevent merges to main that have not passed all tests. We will also use [Swagger](https://swagger.io) for documenting the purposes and contracts of all backend API requests. 
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

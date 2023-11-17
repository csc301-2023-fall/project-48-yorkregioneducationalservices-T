# 48 YRES (York Regional Educational Services) 

 > _Note:_ This document is meant to be written during (or shortly after) your review meeting, which should happen fairly close to the due date.      
 >      
 > _Suggestion:_ Have your review meeting a day or two before the due date. This way you will have some time to go over (and edit) this document, and all team members should have a chance to make their contribution.


## Iteration XX - Review & Retrospect

 * When: Thursday November 16, 2023
 * Where: Online

## Process - Reflection


#### Q1. What worked well

List **process-related** (i.e. team organization and how you work) decisions and actions that worked well.


 * 2 - 4 important decisions, processes, actions, or anything else that worked well for you, ordered from most to least important.
 * Give a supporting argument about what makes you think that way.
 * Feel free to refer/link to process artifact(s).

1. The Frontend development process went smoothly when indpendent of backend. Frontend completed task at a good pace and we developed a UI our partner was happy with. The Frontend had a minimal viable product ready early and didn't face issues until integration.

2. We leverage Github Workflows for continuous integration tests, employing four primary automation workflows. These encompass CI for the backend, CD for the backend, CI/CD for the database, and CI/CD for the frontend—all seamlessly integrated onto an EC2 instance. These workflows are triggered by various actions such as pull requests, pushes/merges to the main branch, or specific file alterations.

 * This streamlined approach ensures effortless and automated deployment, maintaining a continuously operational main version while validating every build before integration into the main branch. This not only simplifies deployment but also guarantees a stable and reliable codebase at all times and a single version of a database that everyone can work with. [GitHub Actions](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/actions?page=2)
![Screenshot 2023-11-16 at 12 19 19 AM](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/65968691/cc3f71ee-a7b2-4b1a-b38f-0b997a550ff7)

3. The Schema Design was generally good and di not require significant changes over the course of development. Most significantly, an intermediary table was created to outline a many to many relationship between Room and Activity, and some (on delete) behaviours were implemented for some tables.
   

#### Q2. What did not work well

List **process-related** (i.e. team organization and how you work) decisions and actions that did not work well.

 * 2 - 4 important decisions, processes, actions, or anything else that did not work well for you, ordered from most to least important.
 * Give a supporting argument about what makes you think that way.
 * Feel free to refer/link to process artifact(s).

 * 1 - One issue that held us back was lines of communication between the front and back end teams. Up until close to the deadline the two teams worked in parallel without much discussion with each other, and this changed only near the end, however at that point there was an overwhelming amount of messages between random people trying to solve various issues.

 * 2 - A second issue was that we had a much larger scope planned and when we lowered the scope we ended up with a lot of loose ends. There are many left over frontend and backend code that is unapplicable and our database schema had holes.


#### Q3(a). Planned changes

List any **process-related** (i.e. team organization and/or how you work) changes you are planning to make (if there are any)

 * Ordered from most to least important, with supporting argument explaining a change.

#### Q3(b). Integration & Next steps
Briefly explain how you integrated the previously developed individuals components as one product (i.e. How did you be combine the code from 3 sub-repos previously created) and if/how the assignment was helpful or not helpful.

 * Keep this very short (1-3 lines).


## Product - Review

#### Q4. How was your product demo?
 * How did you prepare your demo?
 
 * What did you manage to demo to your partner?
 * Did your partner accept the features? And were there change requests?
 * What were your learnings through this process? This can be either from a process and/or product perspective.
 * *This section will be marked very leniently so keep it brief and just make sure the points are addressed*

 * We demonstrated the frontend side of the project only, showing what we were hoping to achieve by the submission deadline. The partner wa happy with the features shown to them and the decisions we made scaling their inital request up/down in scope. 

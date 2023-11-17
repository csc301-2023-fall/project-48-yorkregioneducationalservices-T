# 48 YRES (York Regional Educational Services) 

## Iteration 3 - Review & Retrospect

 * When: Thursday November 16, 2023
 * Where: Online

## Process - Reflection


#### Q1. What worked well

List **process-related** (i.e. team organization and how you work) decisions and actions that worked well.


 * 2 - 4 important decisions, processes, actions, or anything else that worked well for you, ordered from most to least important.
 * Give a supporting argument about what makes you think that way.
 * Feel free to refer/link to process artifact(s).

2. We leverage Github Workflows for continuous integration tests, employing four primary automation workflows. These encompass CI for the backend, CD for the backend, CI/CD for the database, and CI/CD for the frontend—all seamlessly integrated onto an EC2 instance. These workflows are triggered by various actions such as pull requests, pushes/merges to the main branch, or specific file alterations.

 * This streamlined approach ensures effortless and automated deployment, maintaining a continuously operational main version while validating every build before integration into the main branch. This not only simplifies deployment but also guarantees a stable and reliable codebase at all times and a single version of a database that everyone can work with. [GitHub Actions](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/actions?page=2)
![Screenshot 2023-11-16 at 12 19 19 AM](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/65968691/cc3f71ee-a7b2-4b1a-b38f-0b997a550ff7)

   

#### Q2. What did not work well

List **process-related** (i.e. team organization and how you work) decisions and actions that did not work well.

 * 2 - 4 important decisions, processes, actions, or anything else that did not work well for you, ordered from most to least important.
 * Give a supporting argument about what makes you think that way.
 * Feel free to refer/link to process artifact(s).


#### Q3(a). Planned changes

 * Communication: We plan to integrate our communication between the frontend and the backend, as having it completely sperate made code integration much more difficult. For example, api calls were being ogranized with out any frontend having any knowledge of their form. This led to a very sloppy integration of the two, and a last of last minute hustle to resolve bugs.
 * Goal Organization: We plan to create a more robust shortterm planning routine with list of at least 5 goals to be completed in the upcoming 3 days. There were often stretches of a couple days where the team felt as though we didnt really have much to work on, when in reality we just hadn't set enough goals for ourselves.
 * Code Organization: We plan to rework the organization of the backend/database as currently it is a bit confusing and difficult to integrate with. 
#### Q3(b). Integration & Next steps 
Briefly explain how you integrated the previously developed individuals components as one product (i.e. How did you be combine the code from 3 sub-repos previously created) and if/how the assignment was helpful or not helpful.

 We integrated the individual components through three seperate pull requests into the main repo. We felt as though the assignment led to a bit of fragmentation within the organization of code, as everything was built almost completely disjoint of eachother.


## Product - Review

#### Q4. How was your product demo?
 * How did you prepare your demo?
 
 * What did you manage to demo to your partner?
 * Did your partner accept the features? And were there change requests?
 * What were your learnings through this process? This can be either from a process and/or product perspective.
 * *This section will be marked very leniently so keep it brief and just make sure the points are addressed*

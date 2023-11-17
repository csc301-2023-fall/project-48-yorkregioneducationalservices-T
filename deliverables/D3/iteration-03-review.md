# Your Team Number and Name

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

2. Our development process is meticulously structured to prevent conflicts between teams by separating both backend and frontend code. We leverage Github Workflows for continuous integration tests, employing four primary automation workflows. These encompass CI for the backend, CD for the backend, CI/CD for the database, and CI/CD for the frontend—all seamlessly integrated onto an EC2 instance. These workflows are triggered by various actions such as pull requests, pushes/merges to the main branch, or specific file alterations.

 * This streamlined approach ensures effortless and automated deployment, maintaining a continuously operational main version while validating every build before integration into the main branch. This not only simplifies deployment but also guarantees a stable and reliable codebase at all times and a single version of a database that everyone can work with. https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/actions TODO format ur to say link
![Screenshot 2023-11-16 at 12 19 19 AM](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/65968691/cc3f71ee-a7b2-4b1a-b38f-0b997a550ff7)

   

#### Q2. What did not work well

List **process-related** (i.e. team organization and how you work) decisions and actions that did not work well.

 * 2 - 4 important decisions, processes, actions, or anything else that did not work well for you, ordered from most to least important.
 * Give a supporting argument about what makes you think that way.
 * Feel free to refer/link to process artifact(s).

The biggest thing we did not do well on was communication. Throughout most of development, the frontend and backend teams worked fairly independently without talking with each other very much. While working in smaller teams helped each sub group organize themselves better, the lack of communication meant there were many occasions where either frontend or backend had unclear expectations for how a workflow or entity worked according to the other team. This became especially obvious when integrating with the backend. The frontend team needed to modify many entities and change how the UI works in order for the backend to integrate comfortably. If both sub teams communicated better with each other, we would have avoided a lot of the confusion when it came time to merge both halves together.

<figure>
  <img src="./2.2.png" alt="Team Building Activity" width="30%"/>
  <figcaption>
    <em>Miscommunication in communication</em>
  </figcaption>
</figure>

Another thing that did not work well for us was we failed to make our app very portable. While we were able to get CI/CD working, getting the full app with frontend, backend, and DB on each of our local machines did not work well. This led to us using the deployed DB for testing and running the frontend and backend servers on each of our devices. This lack of isolation in testing lead to many instances where changes to the DB lead to errors on our local testing instances. This made us spend a considerable amount of time debugging to make sure our own local testing instances worked rather than ensuring features work.

<figure>
  <img src="./2.1.png" alt="Team Building Activity" width="30%"/>
  <figcaption>
    <em>Trying to get our builds to work</em>
  </figcaption>
</figure>

#### Q3(a). Planned changes

List any **process-related** (i.e. team organization and/or how you work) changes you are planning to make (if there are any)

 * Ordered from most to least important, with supporting argument explaining a change.

#### Q3(b). Integration & Next steps
Briefly explain how you integrated the previously developed individuals components as one product (i.e. How did you be combine the code from 3 sub-repos previously created) and if/how the assignment was helpful or not helpful.

 * Keep this very short (1-3 lines).


## Product - Review

#### Q4. How was your product demo?
 * How did you prepare your demo?
    To prepare for our demo, as we planned on doing backend integration last, we anticipated not being able to have a fully functional app to demonstrate. However, we did want our partner to see all the workflows of the app. As a result, we worked to make sure the frontend was complete with all the workflows the app was supposed to have. This preparation would also help us focus our efforts into developing and integrating the backend.
 * What did you manage to demo to your partner?
    We were able to successfully demonstrate a finished frontend with the partner. This was done via a Zoom share screen. While there was only limited interactivity as a result, the fact that the frontend was finished meant the partner could see and comment on the main workflows we had.
 * Did your partner accept the features? And were there change requests?
    The partner commented that they were happy with the features and did not request any changes. They did however, take photos of our presentation and would get back to us depending on how other members in the partner organization felt. They have yet to make any replies.
 * What were your learnings through this process? This can be either from a process and/or product perspective.
 * *This section will be marked very leniently so keep it brief and just make sure the points are addressed*

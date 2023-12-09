# Database Design
## Deployment
The database(s) for this project were designed using [PostgreSQL](https://www.postgresql.org/). The database can be deployed either locally or automatically to the ec2 server via DevOps. To deploy, it is necessary to have both Docker and Docker Compose installed locally. Below are two links to visit to accomplish this:
-	[How to install Docker Compose (three different methods)](https://docs.docker.com/compose/install/)
-	[Installing Docker](https://docs.docker.com/get-docker/)

Once the prerequisites have been installed, Docker Compose can be run with the command `docker-compose up -d`.
Linked below is a guide on how to deploy a PostgreSQL database using Docker (as well as a separate link on how to install PostgreSQL):
-	[Using Postgres with Docker Compose](https://geshan.com.np/blog/2021/12/docker-postgres/)
-	[Installing PostgreSQL](https://commandprompt.com/education/how-to-download-and-install-postgresql/)

To tear down the deployment and get rid of all saved data and Docker processes running, use the command `docker-compose down --volumes`.

## Two Databases
For this project, we have both a production database and a testing database. It is necessary to have PSQL installed locally to connect to either database (refer to the above section for a link on how to install it). Once installed, you can connect to the databases with the following commands:

(If the server is hosted locally)
-	Production: `psql -h localhost -U yres -d yres_db -p 5432`
-	Testing: `psql -h localhost -U yres -d testing_db -p 5500`

(If the server is hosted on ec2)
-	Production: `psql -h ec2-18-218-217-198.us-east-2.compute.amazonaws.com -U yres -d yres_db -p 5432`
-	Testing: `psql -h ec2-18-218-217-198.us-east-2.compute.amazonaws.com -U yres -d testing_db -p 5500`

## Layout
The database for this project contains 12 relations:
1.	Campus: Represents the physical campsite itself. One fixed campus is created by default.
2.	Camp: Represents the summer camp program. One fixed camp is created by default.
3.	Activity: Represents any event that takes place during one block in the schedule (i.e. class, gym/library visit, outdoor time)
4.	Room: Represents a location for an Activity to take place in a schedule block.
5.	RoomActivity: An intermediary relation for the many-to-many relationship between Room and Activity. Contains details of one activity which can take place in one room.
6.	Student: Represents one summer camp participant.
7.	FriendPreference: Relation representing the recursive relationship between two student entities. Details two students who should be kept together/apart for the scheduling process.
8.	Counselor: Represents one summer camp staff member accompanying students.
9.	Schedule: Represents one schedule instance.
10.	Group: Represents one ‘class’ of which several students and counselors are members.
11.	Block: Represents the individual time blocks which the schedules are composed of.
12.	LoginInfo: Contains authentication information for users of the application.

Included below is a pseudo-ER diagram designed to describe the entities and the relationships between them in a visual manner:  

![image](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/blob/feature/entities_marc/deliverables/yres_scheduler/yres_scheduler_database/docs/CSC301%20Database.jpg)

For most of the entities, there are designated database plugins which contain queries for the database to be accessed/modified. Functions in the plugins are called by the corresponding service in reaction to receiving a request from the front end. Campus and Camp are entities which are not currently meant to be created, edited, deleted; and the Block, Group, and Schedule entities are disconnected from user interaction as they are involved purely with the scheduling algorithm.

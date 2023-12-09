# DevOps

## Introduction

[DevOps](https://www.atlassian.com/devops), short for Development and Operations, is a set of practices aimed at improving collaboration and efficiency between software development (Dev) and IT operations (Ops) teams. There are several reasons why you should choose to adopt DevOps:

- Faster Time to Market: DevOps practices enable faster development, testing, and deployment of software. This speed would allow you to release new features and updates more frequently.

- Improved Collaboration: DevOps encourages collaboration and communication between different teams involved in the software development lifecycle. It breaks down silos and promotes a culture of shared responsibility, leading to better products and smoother workflows.

- Increased Stability and Reliability: By automating processes such as testing, deployment, and infrastructure management, DevOps helps maintain the stability and reliability of applications and systems.

- Enhanced Quality: Continuous Integration (CI) and Continuous Deployment (CD) practices in DevOps ensure that code changes are regularly tested and integrated, reducing the chances of introducing bugs or issues into the software.

Overall, DevOps aims to create a more agile, efficient, and collaborative environment, allowing you to deliver high-quality software faster and more reliably. DevOps has really helped our team because it automatically ran our tests and then seamlessly deployed the main/production version of code right onto the server - enhancing our development as the team could always access the most up-to-date version of the DB. 
 

<img src="https://octopus.com/devops/i/x/octopus-devops-infinity.png" width="50%">

## Setup

First, familiarize yourself with [GitHub Actions](https://github.com/features/actions). Next, you need some server to deploy to, we used [EC2](https://aws.amazon.com/ec2/). After that, you need to add the [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions), view the following image to see where to add the Secrets:![Screenshot 2023-12-09 at 5.43.59 PM](https://i.imgur.com/5U7wTBP.png) 

You need to add the following Secrets:
- `EC2_HOST` 
  - This is the server host name ([DNS](https://www.cloudflare.com/learning/dns/what-is-dns/)) to SSH.
  - For example ec2-18-218-217-198.us-east-2.compute.amazonaws.com
- `EC2_PRIVATE_KEY`
  - This is the private key for GitHub Actions to SSH.
  - If you are using EC2, this [link](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/create-key-pairs.html) will be helpful for you to create one. 
- `EC2_USERNAME`
  - This will vary with the type of OS you are using for your server.
  - In our case we used Ubuntu and for Ubuntu instances, the default username is `ubuntu`
- `PG_PASSWORD`
  - This is currently set to `csc301`. If you wish to change it, you can do so in the following file: `deliverables/yres_scheduler/yres_scheduler_database/docker-compose.yml`.

Finally, you need to expose/open the following web socket ports to the public on your server:
- `1234` - For the backend server.
- `3000` - For the frontend server.
- `5432` - For the PSQL Docker DB.
- `5500` - [Optional] If you choose to use the testing DB (highly recommended)

If you are using EC2, here are the instructions to do so in the [link](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html).

Now you are done the with DevOps setup.

## Process

The process is fairly simple and is illustrated by the following diagram: ![ill4](https://i.imgur.com/lbRcUJw.jpg)

Essentially we have 4 GitHub Workflows:
1. `CI.yml` is triggered on any code push or PR to the `main` branch. It makes sure the server builds properly and runs all the backend tests using `npm test`. 
2. `deployBackend.yml` is triggered by any code push to `main`. It is responsible for transferring the code to the server, then deploying the backend server, and finally testing the server connection to make sure the deployment was successful.
3. `deployDB.yml` is triggered by any code change to the DB schema pushed to `main` on the following path `deliverables/yres_scheduler/yres_scheduler_database/yres_schema.sql`. It is responsible for transferring the code to the server, then deploying the Docker container housing the DB, and finally testing the connection.
4. `deployFrontend.yml` is triggered by any code push to `main`. The responsibility and steps are the exactly same as `deployBackend.yml`.


Note: If any of the steps in the workflow fail, the workflow will fail and will be shown with a red X otherwise with a green check mark. This includes the code transfer, tests, deployment, etc.
Also Note: Before any deployment of the scripts make sure to teardown any existing deployed server/process that is currently running. 
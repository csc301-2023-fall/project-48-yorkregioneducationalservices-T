1) Log in to AWS, or create an account.
2) Navigate to the **EC2 Dashboard**. ![image](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/62919149/cc2ba564-0a70-49fa-ab8a-bf221c67a9e2)
3) Create a new instance by clicking **Launch Instance**.
4) Name the instance, select the Ubuntu server for you Amazon Machine Image, select your desired instance type, create a new RSA key pair(make sure you keep track of its location). That's it for config; select the **Launch Instance** button at the bottom of the screen.
5) Locate your instance by navigating to **All Instances**, then select your newly created instance. Open the **Security** tab, and click the security groups tab.![image](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/62919149/47fe51ad-9aa2-4e65-9baa-b047a5b4f158)

6) Head to **Edit Inbound Rules**, and create a new rule with Type = Custom, Port range = 3000, Source=IPv4.

Now its time to connect to your EC2 instance from your machine.
1) Open a terminal in the same directory as the .pem key file that your downloaded earlier when creating your key pair.
2) Click the **Connect** tab while your EC2 instance is selected ![image](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/62919149/082e0467-6f5b-474c-bb90-30f7a1ad6b0f)

3) Copy and paste bullet point #3 and the example into your terminal and run both commands. Enter `yes` when asked if you wish to continue connecting. You should now be connected to the EC2 through shell!
4) Next, run `sudo apt update`
`curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -`
`sudo apt-get install -y nodejs` to install sudo and NPM.
5) Now, its time to clone the git repo into the EC2 instance. [This](https://stackoverflow.com/questions/19596974/ec2-how-to-clone-git-repository) stack overflow thread is an excellent step by step of creating a github deploy key. Only thing to note, all the commands ran should be done **inside** the local SSH terminal.
6) Once you've cloned the repo into the EC2 instance, all that's left to do is deploy!
## Deploying the app
1) In order to make your app feel at home, run `npm i` to install all your node modules into this local repository.
2) Next, build your project, by running `npm run build'. Your output should look something like this.![image](https://github.com/csc301-2023-fall/project-48-yorkregioneducationalservices-T/assets/62919149/ba9d916d-cbe1-491f-8ee7-0f7d9aec605d)
3) Next, run `npm start &` to start the process in the background.
4) Using the public IPv4 link, with `:3000`, you should see the deployed app up and running!

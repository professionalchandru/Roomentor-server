# Roomentor-server

This is a sample project which is developed from scratch. By this applicatiion customer can book rooms which is offered by room owners. Once room is booked by customer that room can't book by other customers on the already booked date.

# Key Technologies

The key technologies which is used in this projects are follows:
1. Backend language: Node Js
2. Backend frame works: express js
3. Validation library: Joi
4. Database: MongoDB
5. object storage: Cloudinary
6. Authentication: JWT
and some other dependecies. For versions and other dependencies please refer package.json

# .env

create cloudinary account to get CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET. You can signup cloudinary account : https://cloudinary.com/users/register/free

Here I don't attach my .env file. Instead you need to create .env file and add the follwing things,

1. DB_URI = mongodb+srv://username:password@cluster0.xr9i8.mongodb.net/dbname?retryWrites=true&w=majority // Please change the username, password and dbname into your mongodb credentials

2. JWT_SECRET = "your secret key"

3. CLOUD_NAME= "your cloud name"

4. CLOUD_API_KEY= "your cloud api_key"

5. CLOUD_API_SECRET = "your cloud api secret"
 

# To download and install a project

1. Clone the repo using one of the options given in github.
2. In terminal type and execute "npm install"
3. once all packages downloaded you are ready to run

# To start a project

1. In terminal use the command "npm start"
2. If you want to run a project in developer mode use the command "npm run dev"
3. If you want to build a code for production use the command "npm run build"

I hope these are the hints and procedures will help you to understand the flow

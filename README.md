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
7. To test api's: insomnia or postman
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
   (hint: App will run in port 5000)

# To install Postman

1. Please find here: https://www.postman.com/downloads/
2. once downloaded and installed import "Roomentor.postman_collection.json"
3. now you can find all the folders and api

# To install Insomnia

1. Please find here: https://insomnia.rest/download/
2. once downloaded and installed import "Roomentor api's with sample data.json"
3. now you can find all the folders and api

# Hints to check the api's and flow to check the api's

1.  My preference to check the api's using insomnia. Please install the app and export "Roomentor api's with sample data.json" file on the app. Instead insomnia you can use postman.

2.  You can find differnt api folders in insomnia and postman named owner, customer, rooms, images, and book room and room status.

    ## Owner:

    1.  Need to signup using necessary credentials.

    2.  After signup, you can use email and password and type as "owner". At result you can get JWT token.

    3.  After sign in you can edit or delete users using respective api's.

    ## Customer:

    1.  Need to signup using necessary credentials.

    2.  After signup, you can use email and password and type as "customer". At result you can get JWT token.

    3.  After sign in you can edit or delete users using respective api's.

    ## Rooms:

    1.  Inside rooms folder you can see many of api's which is mainly based on rooms which can handle by respective users.

    2.  Owner can add, edit, delete rooms and their details using his own token after signin.

    3.  Customer can check the rooms details, all the rooms, and all the rooms in the city which is owned by different house owners, using his own token.

    4.  Once Customer selected particular room, he can check the availablity using availablity calender api. Then he can able to book rooms in which dates are available for next 60 days.

    ## Images:

    1.  Owner can add and delete respective room images

    ## Book Rooms and Room Status

    1.  Once customer is satisfied with room and that's availablity, he can able to book the rooms.

    2.  Owner and customer can track their booking status by their respective api's.

    3.  Once the customer arrived, statyed and vacted room a owner can change the room status from "Booked" to "Vacated".

# Reference Data
1. If you want to check the data and access mongodb, cloudinary and make project ready to run you can replace this to .env file.

   1. DB_URI = mongodb+srv://chandru:chandru@cluster0.9tiqi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

   2. JWT_SECRET = j@u34bJHD#$@Avhls3%4,.2

   3. CLOUD_NAME= chandru

   4. CLOUD_API_KEY= 942937563591164

   5. CLOUD_API_SECRET = T6HjptioXuygGnI2MzkntG_upQk

   ## user name and password for mongodb and cloudinary
   EMAIL = ketivex246@xasems.com
   PASSWORD = Abcd@1234

I hope these are the hints and procedures will help you to understand the flow

# Social-Network-API

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  ## Description

  The goal of this project was to build an API for a social network web application that uses Express.js for routing, and a MongoDB database that stores the data by utilizing the Mongoose ODM library. The app will offer a place where users can share their thoughts, react to freinds' thoughts, and create a friend list.

  ## Table of Contents 
  
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [Questions](#questions)

  ## Installation
* Clone the repository to local storage
* Navigate to the folder inside your terminal and run 'npm install' to install the necessary node modules
* Make sure you have MongoDB installed on your machine, if you need help [here's a guide to get you started](https://www.mongodb.com/docs/manual/installation/)

* Return to your node terminal and run 'npm run seed' to populate the database with the provided table data.

* Now that the database has some data, run 'npm start' in your terminal to start the application! 
 

  

## Usage
* Once the prerequisite files are installed, locate the 'Social-Network-API' folder inside your terminal, and run 'npm start'

* Because the app is entirely back-end, you will need to use an API platform such as [Insomnia](https://docs.insomnia.rest/insomnia/get-started#:~:text=Insomnia%20is%20an%20open%20source,code%20generation%2C%20and%20environment%20variables.) or [Postman](https://www.postman.com/) to test the functionality of the app.


    [Click here to view the app in action](https://drive.google.com/file/d/1EQ9JkRFMkT_i2WfHXY2itFFuET1eLpMo/view)

    [![Alt text](<Screenshot 2023-11-07 151159-1.png>)](https://drive.google.com/file/d/1EQ9JkRFMkT_i2WfHXY2itFFuET1eLpMo/view)

  ### User Routes
  * GET  will return all users ( localhost:3001/api/users ) or a single user by its '_id' ( localhost:3001/api/users/:userId )
  * POST to ' localhost:3001/api/users/:userId ' to create a new user using this format:
  
        {
          "username": "balderdash999",
          "email": "bd999@email.com"
          }
  * PUT to ' localhost:3001/api/users/:userId ' to update a user using the following format:
        
        --- Update the username and email ---
        {
          "username": "balderdash123456",
          "email": "bd123456@email.com"
          }

        --- Update just the username ---
        {
          "username": "balderdash123456"
          }

        --- Update just the email address ---
        {
          "email": "bd123456@email.com"
          }
  * DELETE to ' localhost:3001/api/users/:userId ' to delete a user by its '_id'. The user's associated thoughts will also be deleted upon deletion of the user.


   ### Friend Routes

  * POST to ' localhost:3001/api/users/:userId/friends/:friendId ' to add a friend to a user's friend list. The ':userId' should be the '_id' of the user who is adding a friend, and the ':friendId' should be the '_id' of the user being added to the friend list.
  
  * DELETE to ' localhost:3001/api/users/:userId/friends/:friendId ' to delete a friend from a user's friend list.  The ':userId' should be the '_id' of the user who is deleting a friend, and the ':friendId' should be the '_id' of the user being deleted from the friend list.


  ### Thought Routes

  * GET  will return all thoughts ( localhost:3001/api/thoughts ) or a single thought by its '_id'  ( localhost:3001/api/thoughts/:thoughtId )
  * POST to ' localhost:3001/api/thoughts/:thoughtId ' to create a new thought and attach it to the user who created it by using this format:
  
        {
          "thoughtText": "Here's a brand new thought!",
          "username": "balderdash999"
          }
  * PUT to ' localhost:3001/api/thoughts/:thoughtId ' to update a thought using the following format:
        
        {
          "thoughtText": "Here's an updated thought!"
          }
        
  * DELETE to ' localhost:3001/api/thoughts/:thoughtId ' to delete a thought by its '_id'

  ### Reaction Routes


  * POST to ' localhost:3001/api/thoughts/:thoughtId/reactions ' to add a reaction to a user's thought. The ':thoughtId' should be the '_id' of the thought that is recieving a reaction. The post request should follow this format:

        {   
            "reactionBody": "This reaction is to a thought i thought was awesome!",
            "username": "balderdash999"
            }
  
  * DELETE to ' localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId ' to delete a reaction from a user's thought.  The ':thoughtId' should be the '_id' of the thought that is losing a reaction, and the ':reactionId' should be the 'reactionId' of the reaction being deleted from thought's reaction list.

  


  ## Credits

  * UCF Fullstack Coding Bootcamp

  ## License

  [MIT](https://opensource.org/licenses/MIT)


  ## Questions
  
  Reach out to me if you have any questions about the project!
  
  Github: [https://github.com/newprice247](https://github.com/newprice247)
  
  Email: newprice247@gmail.com

const express = require('express');
const app = express();
//const fs = require('fs')

//Listening on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});


let log = console.log

//my webProjects arry object
const webProjects = 
[
   {
      "id": 1,
      "title": "React Game!",
      "description": "Tic tac toe game created using Create React app.",
      "URL": "http://heroku/myapp/game/"
   },
   {
      "id": 2,
      "title": "Online store",
      "description": "Online store created with HTML, CSS and JavaScript.",
      "URL": "https://git.com/myrepos/shop/index"
   }
]


//USE POSTMAN
//1.  Display array items on port 8080.
//2.  Create a POSt request that adds an item to array.
//3.  Delete an array item with a specified id.
//4.  Able to Update an array item title or description.

//METHODS I'LL USE
//GET = Gets data from teh sever.
//POST = Add items to array.
//PUT = Updated data on the server.
//DELETE =delete item with specific id.

//parse WebProject.json from a string to JS object
let data = fs.readFileSync('WebProject.json')
let projects = JSON.parse(data)
log(projects)
let replay = "";
//Displays project list
app.get('/api', (req, res) => {
   for (let i = 0; i < projects.length; i++) {
      replay += projects[i].title + "<br/>"
      log(replay)
      
   }
   res.send(replay)
});


//Add item to list.
//each Item has an :id, :title, :description and :URL = keys
//In browser, give params/keys a value
app.post('/add/:title', (req, res)=>{
   

   projects[title] = score;//placing key inside the object.
      let objFile = JSON.stringify(jsonFile)//converts js object back to sting

      fs.writeFile('items.json', objFile, (err)=>{
         if(err){// handle andy errors when writing to list.
            console.log("something is broken");
         } else {
         console.log('all set')
         reply = { 
            word: word,
            score: score,
            status: "success"
         }
         res.send(reply)
         }
      })
})
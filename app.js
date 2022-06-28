const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');
let projectFile = fs.readFileSync('WebProject.json');
const bodyParser = require('body-parser');
//const fs = require('fs')




app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use(bodyParser.urlencoded({
   extended: false
}))
app.use(bodyParser.json())
/*You will now be able to get data passed through in the 
body of the HTTP POST or PUT request using req.body (e.g.req.body.name)*/




let webProjects = JSON.parse(projectFile);

let log = console.log;

//This function will convert the webProjects-array back to a string and write it to WebProject.json
function saveToJSON() {

   let newData = JSON.stringify(webProjects);

   fs.writeFile('WebProject.json', newData, (err) => {
      if (err) { // handle andy errors when writing to list.
         console.log("something is broken");
      } else {
         console.log("File saved!");
      }
   })
};

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

let reply = "";

//Increment each ID by 1 that gets pushed/add to webProjects.
//The initial value will be the length of webProjects-array.
let itemId = webProjects.length;

//==========================================================POST
//WITH POST:
//User will be able to add a new item to the webProjects-array.
//User must enter specific KEY's in postman with any value to make a successful POST request
//On POST user will see there new item in webProjects-array
app.post('/add', (req, res) => {

   itemId + 1;

   //This Item stores the user data as an object.
   //This object will then be pushed into the webProjects-array.
   let newItem = {
      "id": itemId,
      "title": `${req.body.title}`,
      "description": `${req.body.description}`,
      "url": `${req.body.url}`
   }

   //Check key.values pairs before push().
   //User must add the correct KEY's to POST any data.
   if (!req.body.title || !req.body.description || !req.body.url) {
      res.send(`OOPS, something is wrong. You can have any VALUE, but your KEY's must be:
      title,
      description,
      url `)

   } else {

      //push newItem-object to webProjects-object
      webProjects.push(newItem)
      saveToJSON()
      res.send(webProjects)
   }
});

//==========================================================GET
//Displays project list on sever/postman
app.get('/api', (req, res) => { //GET method

   webProjects.forEach(
      item => { //Loop over each object item
         reply += `
      Title:  ${item.title}
      Description:  ${item.description}
      URL:  ${item.url}
      ID: ${item.id}
      `
      }
   );
   res.send(webProjects) //sends array item to server.
});

//==========================================================DELETE
//delete any item from webProjects-array by it's ID
//The user must enter id as the KEY and then any number as teh VALUE.
app.delete('/delete', (req, res) => {

   //Find the index of the chose item using  query.id.
   //In postman, the user inputs a VALUE, if the value/id exist, that values object is removed.
   let indexOfObject = webProjects.findIndex(object => {
      return object.id == req.body.id;
   });

   //This will run based on the length of webprojects-array
   if (req.body.id > webProjects.length) {
      res.send("OOPs, that id does not exist or is has already been removed.")
   } else if (req.body.id == -1) {
      res.send("OOPs, add a number grater the -0")
   } else {

      // res.send(`${webProjects[req.body.id].title} was removed`)
      webProjects.splice(indexOfObject, 1);
      webProjects.forEach((item, index) => item.id = index) //updated array item id's with new values
      //rewrite id's in order
      saveToJSON()
      res.send(webProjects)
      //log(webProjects)
   }

});


//==========================================================PUT/update
//The user can update an object in postman:
//User must 1st add the id as a KEY to find the object item
//then add the title, description and url KEY's with any values to update that item
app.put('/update', (req, res) => { //GET method

   //We need to find the items index.
   let index = webProjects.findIndex(object => {
      return object.id == req.body.id;
   });

   //This adds the user update if an update was made. Else, it stays the same
   webProjects[index].title = req.body.title ?
      webProjects[index].title = req.body.title :
      webProjects[index].title = webProjects[index].title;

   webProjects[index].description = req.body.description ?
      webProjects[index].description = req.body.description :
      webProjects[index].description = webProjects[index].description;

   webProjects[index].url = req.body.url ?
      webProjects[index].url = req.body.url :
      webProjects[index].url = webProjects[index].url;
   saveToJSON()
   res.send(webProjects)
});

/* For Heroku Deployment */
if (process.env.NODE_ENV === 'production') {
   app.use(express.static(path.join(__dirname, 'frontend/build')));
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,
         'frontend', 'build', 'index.html'));
   });
}



//Listening on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`Server is listening on port ${PORT}`);
});
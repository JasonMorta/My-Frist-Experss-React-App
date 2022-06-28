import React from "react";
import "./add.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function AddMenu(props) {

  //switch between update and save button
// let saveBtn =  props.isEditing ? 
//               <Button 
//               onClick={props.saveNewItem}
//               variant="contained"
//               >SAVE </Button>
//               :
//               <Button 
//               onClick={props.updateItem}
//               variant="contained"
//               >Update </Button>;


  return (
    <>
      <div className="list-container" style={{ display: `${props.itemMenuUI}` }}>
        {props.isAdding ? <h3>Add Project</h3>: <h3>Edit Item</h3>}
        <div id="text-field">
          <TextField
            required
            className="textField"
            id="outlined-basic"
            label={props.addTitle ? props.addTitle : "Title"}
            variant="outlined"
            onInput={props.handleTitle}
            value={props.title}
          />
          <TextField
            className="textField"
            id="outlined-basic"
            label={props.addTitle ? props.addDes : "Description"}
            variant="outlined"
            onInput={props.handleDescription}
            value={props.description}
          />
          <TextField
            
            className="textField"
            id="outlined-basic"
            label={props.addTitle ? props.addUrl : "URL"}
            variant="outlined"
            onInput={props.handleURL}
            value={props.url}
          />

          <Button 
              onClick={props.saveNewItem}
              variant="contained"
              >SAVE </Button>       

          <Button 
          onClick={props.closeBox}
          variant="contained"
          >close </Button>
        </div>
      </div>
    </>
  );
}

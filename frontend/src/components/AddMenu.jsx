import React from "react";
import "./add.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function AddMenu(props) {

  const [state, setState]=React.useState(props.urlValue)

  //switch between update and save button
let saveBtn =  props.isEditing ? 
              <Button 
              onClick={props.saveNewItem}
              variant="contained"
              >SAVE </Button>
              :
              <Button 
              onClick={props.updateItem}
              variant="contained"
              >Update </Button>;


  return (
    <>
      <div className="list-container" style={{ display: `${props.itemMenuUI}` }}>
        {props.isAdding ? <h3>Add Project</h3>: <h3>Edit Item</h3>}
        <div id="text-field">
          <TextField
            className="textField"
            id="outlined-basic"
            label={props.addTitle ? props.addTitle : "Title"}
            variant="outlined"
            onChange={props.handleTitle}
            value={props.title}
          />
          <TextField
            className="textField"
            id="outlined-basic"
            label={props.addTitle ? props.addDes : "Description"}
            variant="outlined"
            onChange={props.handleDescription}
            value={props.description}
          />
          <TextField
            className="textField"
            id="outlined-basic"
            label={props.addTitle ? props.addUrl : "URL"}
            variant="outlined"
            onChange={props.handleURL}
            value={state}
            
          />

          {saveBtn}

          <Button 
          onClick={props.closeBox}
          variant="contained"
          >close </Button>
        </div>
      </div>
    </>
  );
}

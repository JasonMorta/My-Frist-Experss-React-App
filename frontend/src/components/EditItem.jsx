import React from "react";
import "./add.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function EditItem(props) {
  
  //  const [state, setSate] = useState({
  //     addItem: true,
  //     hide: "block",
  // })

  //close AddMenu
  // function closeBox() {
  //   setNewItemMenu('none');
  // }

  // function handleTitle(e) {
  //   console.log(e.target.value)
  // }

  // function saveAndClose(){
  //   setNewItemMenu('none');
  // }
 
  //opens AddMenu


  return (
    <>
      <div className="list-container" style={{ display: `${props.itemMenuUI}` }}>
         <h3>Edit item</h3>
        <div id="text-field">
          <TextField
            className="textField"
            id="outlined-basic"
            label={props.addTitle ? props.addTitle : "Title"}
            variant="outlined"
            onInput={props.handleTitle}
            defaultValue={props.titleValue}
          />
          <TextField
            className="textField"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            onInput={props.handleDescription}
            defaultValue={props.desValue}
          />
          <TextField
            className="textField"
            id="outlined-basic"
            label="URL"
            variant="outlined"
            onInput={props.handleURL}
            defaultValue={props.inputURL}
          />
          <Button 
          onClick={props.updateItem}
          variant="contained"
          >Update </Button>
          <Button 
          onClick={props.closeBox}
          variant="contained"
          >close </Button>
        </div>
      </div>
    </>
  );
}

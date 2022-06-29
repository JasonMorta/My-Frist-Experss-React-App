import "./App.css";
import ProjectList from "./components/ProjectList";
import React, { Component } from "react";
import AddMenu from "./components/AddMenu";
//import DropDowList from './components/DropDownList';
import AddIcon from "./components/AddIcon";
import EditItem from "./components/EditItem";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdding: false,
      isEditing: false,
      hide: "none",
      itemMenuUI: "none",
      id: "",
      title: "",
      description: "",
      url: "",
      menuItems: [],
      webProjects: [],
      value: "Select Project",
      itemTitle: false,
      addTitle: "",
      addDes: "",
      addUrl: "",
      updateState: "",
    };
  }

  //API POST request to retrieve data
  request = async function () {
    const response = await fetch("/api");
    const data = await response.json(); //convert data to json
    this.setState({ webProjects: data });
    console.log(this.state.webProjects);
  }; //end of request

  componentDidMount() {
    this.request();
  }

  //close AddMenu
  //This function only closes the itemMenuUI
  //in nothing was added
  closeBox = (e) => {
    this.setState({
      isAdding: false,
      isEditing: false,
      title: "",
      description: "",
      url: "",
    });
  };

  //AddMenuUI option.
  //these handlers listen for user input changes
  //Title add user input value to state
  title = (e) => {
    this.setState({ title: e.target.value });
    console.log(this.state.title);
  };
  //Description add user input value to state
  description = (e) => {
    this.setState({ description: e.target.value });
  };
  //URL add user input value to state
  handleURL = (e) => {
    this.setState({ url: e.target.value }, () => {
      console.log(this.state.url);
    });
  };

  //ADD button +
  //open's itemMenuUI
  //This function only opens the itemMenuUIU
  //to and clears input field values
  handleAddItem = () => {
    this.setState({}, () => {
      this.setState({
        isAdding: true,
        hide: "block",
        title: "",
        description: "",
        url: "",
        addTitle: "",
        addDes: "",
        addUrl: "",
      });
    });
  };

  //SAVE item to List and close itemMenuUI
  saveNewItem = () => {
    fetch("/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        url: this.state.url,
      }),
      //handle errors
    })
      .then((res) => res.json())
      .then((response) =>
        this.setState({
          //Where state get updated and reloads page.
          webProjects: response,
          hide: "none",
        })
      )
      .catch((error) => console.log("Error:", error));
    //clear state values after post request
    console.log(this.state.webProjects);
  };

  //delete item from list
  handleDelete = (e) => {
    fetch("/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: e.target.id,
      }),
      //handle errors
    })
      .then((res) => res.json())
      .then((response) => this.setState({ webProjects: response }))
      .catch((error) => alert("Error:", error));
    // this.request()
  };

  //Edit list item
  //This function only open the AddItemUI
  //Also set the input fields to target values
  handleEdit = (e) => {
    console.log(e);
    // e.target.useMap = e.target.title
    this.setState({
      isAdding: false,
      isEditing: true,
      hide: "block",
      titleValue: e.target.title,
      desValue: e.target.dataset.des,
      inputURL: e.target.dataset.link,
      id: e.target.id,
    });
    //target values are obtained from the image(part of the .map)
    //I used the data- attribute to store the current item data in the edit button.
  };

  //UPDATE Button inside itemMenuUI
  //This update the selected item with new values
  updateItem = (e) => {
    console.log(e.target.id);
    fetch("/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        url: this.state.url,
      }),

      //handle errors
    })
      .then((res) => res.json())
      .then((response) =>
        this.setState({
          //Where state get updated and reloads page.
          webProjects: response,
          isEditing: false,
          hide: "none",
          title: "",
          description: "",
          url: "",
        })
      )

      .catch((error) => console.log("Error:", error));
    console.log(this.state.webProjects);
  };

  render() {
    return (
      <div
        className="App"
        onClick={(e) => {
          this.setState({ updateState: e.target });
        }}
      >
        <section className="App-header">
          <div className="menu-container"></div>
          <h2 style={{ color: "#ea7798", marginBottom: "15px" }}>
            My Project List
          </h2>
          <div className="item-container">

            {this.state.isAdding || this.state.isEditing ? <></>:
              <AddIcon handleAddItem={this.handleAddItem.bind(this)} />}
            <ProjectList
              listItem={this.state.webProjects}
              key={this.state.id}
              handleEdit={this.handleEdit.bind(this)}
              handleDelete={this.handleDelete.bind(this)}
            />
          </div>
          {this.state.isAdding ? (
            <AddMenu
              url={this.state.url}
              description={this.state.description}
              title={this.state.title}
              isAdding={this.state.isAdding}
              addDes={this.state.addDes}
              addUrl={this.state.addUrl}
              addTitle={this.state.addTitle}
              itemTitle={this.state.itemTitle}
              itemMenuUI={this.state.hide}
              handleTitle={this.title.bind(this)}
              handleDescription={this.description.bind(this)}
              handleURL={this.handleURL.bind(this)}
              saveNewItem={this.saveNewItem.bind(this)}
              closeBox={this.closeBox.bind(this)}
            />
          ) : (
            <></>
          )}

          {this.state.isEditing ? (
            <EditItem
              addTitle={this.state.addTitle}
              handleTitle={this.title.bind(this)}
              handleDescription={this.description.bind(this)}
              handleURL={this.handleURL.bind(this)}
              isEditing={this.state.isEditing}
              // description={this.state.description}
              title={this.state.title}
              updateItem={this.updateItem.bind(this)}
              closeBox={this.closeBox.bind(this)}
              titleValue={this.state.titleValue}
              desValue={this.state.desValue}
              inputURL={this.state.inputURL}
            />
          ) : (
            <></>
          )}
        </section>
      </div>
    );
  }
}

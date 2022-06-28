import './App.css';
import ProjectList from './components/ProjectList';
import React, { Component } from 'react'
import AddMenu from './components/AddMenu';
//import DropDowList from './components/DropDownList';
import AddIcon from './components/AddIcon';
//import EditItem from './components/EditItem';


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAdding: false,
      isEditing: true,
      hide: 'none',
      itemMenuUI: 'none',
      id: '',
      title: '',
      description: '',
      url: '',
      menuItems: [],
      webProjects: [],
      value: 'Select Project',
      itemTitle: false,
      addTitle: false,
      addDes: '',
      addUrl: "",
      
      updateState: '',
    }
  
  }


    //API POST request to retrieve data
    request = async function () {
      const response = await fetch("/api")
      const data = await response.json(); //convert data to json
      this.setState({webProjects: data})
      console.log(this.state.webProjects)
    }; //end of request
  
    
    componentDidMount(){
      this.request()
     
    }

  //close AddMenu
  //This function only closes the itemMenuUI
  //in nothing was added
  closeBox = (e) => {
    this.setState({hide: 'none',
    title: '',
    description: '',
    url:'',});
  }

  //AddMenuUI option.
  //these handlers listen for user input changes
  //Title
  title = (e) =>{
    this.setState({title: e.target.value});
    console.log(this.state.title)
  }
  //Description
  description = (e) =>{
    this.setState({description: e.target.value});
  }
  //URL
  url = (e) =>{
    this.setState({url: e.target.value});
    
  }

  //ADD button +
  //open's itemMenuUI
  //This function only opens the itemMenuUIU
  //to and clears input field values
  handleAddItem = ()=>{
    this.setState({
      isEditing: true,}, ()=>{
        this.setState({
        isAdding: true,
        hide: 'block',
        title: '',
        description: '',
        url:'',
        addTitle:'',
        addDes: '',
        addUrl: '',
        })
      });
  }

  //SAVE item to List and close itemMenuUI
  saveNewItem =()=>{
    fetch("/add", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title: this.state.title,
        description: this.state.description,
        url: this.state.url
      })
       //handle errors
      })
      .then(res => res.json())
      .then(response => this.setState({//Where state get updated and reloads page.
        webProjects: response,
        hide: 'none',
        title: '',
        description: '',
        url: '',}))
      .catch(error => console.log('Error:', error));
      //clear state values after post request   
  }

  //delete item from list
  handleDelete = (e) => {
    fetch('/delete', {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: e.target.id
      })
       //handle errors
      })
      .then(res => res.json())
      .then(response => this.setState({webProjects: response}))
      .catch(error => alert('Error:', error));
      // this.request()
  }

  //Edit list item
  //This function only open the AddItemUI
  //Also set the input fields to target values
  handleEdit=(e)=>{
    console.log(e)
   // e.target.useMap = e.target.title
    this.setState({
      isAdding: false,
      hide: 'block',
      addTitle: e.target.title,
      addDes: e.target.dataset.des,
      urlValue: e.target.dataset.url,
      isEditing: false,
      id: e.target.id,
    });
    //target values are obtained from the image(part of the .map)
    //I used the data- attribute to store the current item data in the edit button.
  }

  //UPDATE Button inside itemMenuUI
  //This update the selected item with new values
  updateItem=(e)=>{
    console.log(e.target.id)
      fetch('/update', {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          id: this.state.id,
          title: this.state.title,
          description: this.state.description,
          url: this.state.url
        })
         //handle errors
        })
        .then(res => res.json())
        .then(response => this.setState({//Where state get updated and reloads page.
          webProjects: response,
          hide: 'none',
          title: '',
          description: '',
          url: '',}))
        .catch(error => console.log('Error:', error));
        this.setState({hide: 'none'})
       
  }



  render() {
    return (
      <div className="App" onClick={(e)=>{this.setState({updateState: e.target})}}>
    <section className="App-header">
      <div className='menu-container'>

      
      </div>
      <h2>My Project List</h2>
      <div className='item-container'>
       
      <AddIcon handleAddItem={this.handleAddItem.bind(this)} />
        <ProjectList
        listItem={this.state.webProjects}
        key={this.state.id}
        handleEdit={this.handleEdit.bind(this)}
        handleDelete={this.handleDelete.bind(this)}
        />
        
        </div>
      <AddMenu 
      url={this.state.url}
      description={this.state.description}
      title={this.state.title}
      isEditing={this.state.isEditing}
      addDes={this.state.addDes}
      addUrl={this.state.addUrl}
      addTitle={this.state.addTitle}
      itemTitle={this.state.itemTitle}
      isAdding={this.state.isAdding}
      itemMenuUI={this.state.hide}
      handleTitle={this.title.bind(this)}
      handleDescription={this.description.bind(this)}
      handleURL={this.url.bind(this)}
      saveNewItem={this.saveNewItem.bind(this)}
      updateItem={this.updateItem.bind(this)}
      closeBox={this.closeBox.bind(this)}
      urlValue={this.state.urlValue} />
      
    </section>
    </div>
    )
  }
}







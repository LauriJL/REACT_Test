import React, { Component } from 'react';
import './App.css';
import NWUserAdd from './NWUserAdd';
import NWUserEdit from './NWUserEdit';
import NWUserDelete from './NWUserDelete';

class NWUsersFetch extends Component {

  constructor(props) {
    super(props);
    //console.log("NWCustomerFetch-komponentti: constructor");
    this.state = { 
        kayttajat: [], 
        start: 0,
        take: 10,
        visible: "table",
        page: 0,
        firstname: "",
        lastname: "",
        accesslevel: "",
        yksiKayttaja: [],
        renderChildAdd: true,
        renderChildEdit: true,
        renderChildDelete: true, 
        removeUser: [],
        LoginID: '',
        LoginID2Del: ''
    }; 
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangeAccessLevel = this.handleChangeAccessLevel.bind(this);
    this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
    this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
  }

  //Unmount
  handleChildUnmountAdd(){
    this.setState({renderChild: false});
    this.handleClickTable();
    this.HaeKayttajatNWRestApista();
  }

  handleChildUnmountEdit(){
    this.setState({renderChild: false});
    this.handleClickTable();
    this.HaeKayttajatNWRestApista();
  }

    handleChildUnmountDelete(){
    this.setState({renderChildDelete: false});
    this.handleClickTable();
    this.HaeKayttajatNWRestApista();
  }

  handleClickTable = () => {
    this.setState({visible: "table"});
  }

  handleClickAdd = () => {
    this.setState({visible: "addForm", renderChildAdd: true})
  }

  handleClickEdit = (loginObj, event) => {
    this.setState({
      yksiKayttaja: loginObj,
      visible: "editForm",
      renderChildEdit: true
    })
  }

  handleClickDelete = (loginObj,event) => {
    this.setState({
      removeUser: loginObj, 
      visible: "deleteForm", 
      renderChildDelete: true
    })
  }

  handleClickHelp = () => {
    this.setState({visible: "help"})
  }

  handleClickPrev = (event) => {
    let pageNumber = this.state.page;
    if (pageNumber > 0){pageNumber = pageNumber-10;}
    this.setState({page: pageNumber}, this.handleSubmit);
  }

  handleClickNext = (event) => {
    this.setState({page: this.state.page+10},this.handleSubmit);
  }

  handleChangeFirstName(e){
    let input = e.target.value;
    this.setState({firstname:input},this.handleSubmit);
  }

  handleChangeLastName(e){
    let input = e.target.value;
    this.setState({lastname:input},this.handleSubmit);
  }

  handleChangeAccessLevel(e){
    let input = e.target.value;
    this.setState({accesslevel:input},this.handleSubmit);
  }

  componentDidMount() {
    this.HaeKayttajatNWRestApista();
  }

  handleSubmit(){
    this.HaeKayttajatNWRestApista();
  }

  HaeKayttajatNWRestApista() {
    let jwttoken = localStorage.getItem('token');
    let uri = "";
    if (this.state.firstname !== "") {
      uri = 'https://localhost:5001/northwind/logins/r?page='+this.state.page+'&limit='+this.state.take+'&firstname='+this.state.firstname;
    } else if (this.state.lastname !== "") {
      uri = 'https://localhost:5001/northwind/logins/r?page='+this.state.page+'&limit='+this.state.take+'&lastname='+this.state.lastname;
    }
    else if (this.state.accesslevel !== "") {
      uri = 'https://localhost:5001/northwind/logins/r?page='+this.state.page+'&limit='+this.state.take+'&accesslevel='+this.state.accesslevel;
    } 
    else {
      uri = 'https://localhost:5001/northwind/logins/r?page='+this.state.page+'&limit='+this.state.take;
      console.log("Retrieving from REST API without country " + uri);
    }   
    fetch(uri, {
      method:"GET",
      headers:{
        Authorization:"Bearer "+jwttoken,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
    .then((json) => {
      const logindata = json;
      this.setState({ kayttajat: logindata })
  });
  }

  NWDeleteRestApista() {
    let apiUrl = 'https://localhost:5001/northwind/loginss/delete/'+this.state.LoginID2Del;
    fetch(apiUrl, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: null
    }).then((response) => response.json())
        .then((json) => {
            const success = json;
            console.log(`Response from server: ${success}.`);
            if (success) {
               //this.dismiss(); 
               this.ResetDeleteDone();
            }
        });
  }

  render() {
    //console.log("NWCustomerFetch-komponentti: render");
    let viesti = "";
    let taulukko = [];
    let tHeaders = "";
    if (this.state.kayttajat.length > 0) {
        tHeaders = <tr><th>Login Id</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Username</th><th>Password</th><th>Access Level</th><th>Edit</th><th>Delete</th></tr>
        for (let index = 0; index < this.state.kayttajat.length; index++) {
            const element = this.state.kayttajat[index];
            taulukko.push(<tr key={element.loginId}>
            <td>{element.loginId}</td>
            <td>{element.firstname}</td>
            <td>{element.lastname}</td>
            <td>{element.email}</td>
            <td>{element.username}</td>
            <td>{element.password}</td>
            <td>{element.accesslevelId}</td>
            <td><button onClick={this.handleClickEdit.bind(this, element)} className="buttonEdit">Edit</button></td>
            <td><button onClick={this.handleClickDelete.bind(this, element)} className="buttonDelete">Delete</button></td>
            </tr>);
      }
    }
    else {
      viesti = "Retrieving data from database..."
    }

    if (this.state.visible === "table") {
      return (
        <div className='maindiv'>
        <h2>Users</h2>
        <p>{viesti}</p>
        <p className='text'>Search by first name: <input type="text" placeholder="Enter first name" title="Find user" value={this.state.firstname} onChange={this.handleChangeFirstName}/></p>
        <p className='text'>Search by last name: <input type="text" placeholder="Enter last name" title="Find user" value={this.state.lastname} onChange={this.handleChangeLastName}/></p>
        <p className='text'>Filter by access level: <input type="text" placeholder="Enter access level" title="Find users" value={this.state.accesslevel} onChange={this.handleChangeAccessLevel}/></p>
        <br/>
        <button className="buttonAdd" onClick={this.handleClickAdd}>Add New User</button>
        <br/>
        <button className="button" onClick={this.handleClickPrev}>&#8592; Previous</button>
        <button className="button" onClick={this.handleClickNext}>Next &#8594;</button>
        <br/>
        <table className="table table-dark" id = "t01"><thead class="thead">{tHeaders}</thead><tbody class="tbody">{taulukko}</tbody></table>
      </div>
      );
    } 
    else if (this.state.visible === "addForm") {
      return (
        <div className="maindiv">         
          <h2>Add New User</h2>
          <div>
            <button className="button" onClick={this.handleClickTable}>Back to Users</button>
            <button className="button" onClick={this.handleClickHelp}>Help</button>
          </div>
          {this.state.renderChildAdd ? <NWUserAdd unmountMe={this.handleChildUnmountAdd} /> : null}
        </div>
      );
    } 
    else if (this.state.visible === "editForm") {
      return (
        <div className="maindiv">
          <h2>Edit User Data</h2>
          <div>
            <button className="button" onClick={this.handleClickTable}>Back to Users</button>
            <button className="button" onClick={this.handleClickHelp}>Help</button>
          </div>
          {this.state.renderChildEdit ? <NWUserEdit loginObj={this.state.yksiKayttaja} unmountMe={this.handleChildUnmountEdit} /> : null}
        </div>
      );
    }
    else if (this.state.visible === "deleteForm") {
      return (
        <div className="maindiv">
          <h2>Delete User</h2>
          <div>
            <button className="button" onClick={this.handleClickTable}>Back to Users</button>
            <button className="button" onClick={this.handleClickHelp}>Help</button>
          </div>
          {this.state.renderChildEdit ? <NWUserDelete loginObj={this.state.removeUser} unmountMe={this.handleChildUnmountDelete} /> : null}
        </div>
      );
    }
    else if (this.state.visible === "help") {
      return (
        <div className="help">
          <h2 className='h2'>Users</h2>
          <p className='text' style={{marginLeft:'10px'}}>Browse, add, modify and delete users by using the appropriate buttons.</p>
          <p  className='text' style={{marginLeft:'10px'}}>Please note, that adding, editing and deleting users requires that you log in first.</p>
          <button class="button" onClick={this.handleClickTable} style={{marginLeft:'10px'}}>Back to Users</button>
        </div>
      );      
    } else {
      return(
        <div className="box1">
        <h1>Application error! Reload page.</h1>
      </div>
      );     
    }
    
  }
}
export default NWUsersFetch;


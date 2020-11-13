import React, {Component} from 'react';
import './App.css';

class NWUserAdd extends Component {

    // Konstruktori
    constructor(props){
        super(props);
        this.state = { 
            LoginID: '',
            FirstName: '',
            LastName: '',
            Email: '',
            UserName: '',
            Password: '',
            AccesslevelID: ''
          };
        this.handleChangeLoginID = this.handleChangeLoginID.bind(this);
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeAccesslevelID = this.handleChangeAccesslevelID.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Dismiss
    dismiss(){
        this.props.unmountMe();
    }

    //Event listeners
    handleChangeLoginID(e){
        var input = e.target.value;
        this.setState({...this.state,LoginID: input});
    }

    handleChangeFirstName(e){
        var input = e.target.value;
        this.setState({...this.state,FirstName: input})
    }

    handleChangeLastName(e) {
        var input = e.target.value;
        this.setState({...this.state,LastName: input});
    }

    handleChangeEmail(e) {
        var input = e.target.value;
        this.setState({...this.state,Email: input});
    }

    handleChangeUserName(e) {
        var input = e.target.value;
        this.setState({...this.state,UserName: input});
    }

    handleChangePassword(e) {
        var input = e.target.value;
        this.setState({...this.state,Password: input});
    }

    handleChangeAccesslevelID(e) {
        var input = e.target.value;
        this.setState({...this.state,AccesslevelID: input});
    }

    handleSubmit(e){
        e.preventDefault();
        this.InsertToDatabase();
    }

    // Kantaan vienti
    InsertToDatabase(){
        //Luodaan JS objekti tuotetta varten. Tiedot objektiin haetaan state:sta.
        const kayttaja = {
            // LoginID: this.state.LoginID,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            UserName: this.state.UserName,
            Password: this.state.Password,
            AccesslevelID: this.state.AccesslevelID
        };
        
        //Luodaan kayttaja JSON
        const kayttajaJSON = JSON.stringify(kayttaja);

        //API-kutsu: viedään data kantaan fetchillä.
        //console.log('kayttajaJSON = ' + kayttajaJSON);
        const apiURL = 'https://localhost:5001/northwind/Logins/add/';
        fetch(apiURL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: kayttajaJSON
        })
        .then((response) => response.json())
        .then((json) => {
            //Store data returned from backend to the current state
            const success = json;
            //console.log(`Response from server: ${success}.`);
            if (success){
                this.dismiss();
            }
        });
    }

    render(){
        return(
            //Form
            <form className="box3" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Enter first name" onChange={this.handleChangeFirstName} />  
                <input type="text" placeholder="Enter last name" onChange={this.handleChangeLastName} />    
                <input type="text" placeholder="Enter email" onChange={this.handleChangeEmail} />   
                <input type="text" placeholder="Enter username" onChange={this.handleChangeUserName} />   
                <input type="text" placeholder="Enter password" onChange={this.handleChangePassword} />               
                <input type="text" placeholder="Enter access level" onChange={this.handleChangeAccesslevelID} />      
                <br/>
                <button type="submit">Save Changes</button> 
            </form>
        );
    }
}

export default NWUserAdd;

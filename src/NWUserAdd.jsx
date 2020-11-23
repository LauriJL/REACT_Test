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
        let jwttoken = localStorage.getItem('token');
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
                Authorization:"Bearer "+jwttoken,
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
            <form className="formSmall" onSubmit={this.handleSubmit}>
                <p><input className='inputForm' type="text" style={{marginTop:'10px'}} placeholder="First name" onChange={this.handleChangeFirstName} /></p> 
                <p><input className='inputForm' type="text" placeholder="Last name" onChange={this.handleChangeLastName} /></p>   
                <p><input className='inputForm' type="text" placeholder="Email" onChange={this.handleChangeEmail} /></p>   
                <p><input className='inputForm' type="text" placeholder="Username" onChange={this.handleChangeUserName} /></p>   
                <p><input className='inputForm' type="text" placeholder="Password" onChange={this.handleChangePassword} /></p>               
                <p><input className='inputForm' type="text" placeholder="Access level" onChange={this.handleChangeAccesslevelID} /></p>      
                <br/>
                <p><button type="submit" className='buttonAdd' style={{marginLeft:'10px'}}>Save Changes</button></p> 
            </form>
        );
    }
}

export default NWUserAdd;

import React, {Component} from 'react';
import './App.css';

class NWUserDelete extends Component {
    //Constructor
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
        this.handlePerformDelete = this.handlePerformDelete.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Dismiss
    dismiss(){
        this.props.unmountMe();
    }

    //Event listeners
    handleChangeLoginID(e) {
        var input = e.target.value;
        this.setState({...this.state,LoginID: input});
    }

    handleChangeFirstName(e){
        var input = e.target.value;
        this.setState({...this.state,FirstName: input});
    }

    handleChangeLastName(e){
        var input = e.target.value;
        this.setState({...this.state,LastName: input})
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
        //alert('Päivitettävä käyttäjä: ' + this.state.LoginID);
        e.preventDefault();
        this.UpdateDatabase();
    }

    callBackRoutine() {
        console.log('NWProductDELETE: . . . . callBackRoutine >>>---' + this.state.loginObj.LoginID);											  
    }

    componentDidMount() {
        //console.log("NWUserDELETE-componentDidMount this.props.loginObj.loginId: " + this.props.loginObj.loginId);
        this.setState({
            LoginID: this.props.loginObj.loginId,
            FirstName: this.props.loginObj.firstname,
            LastName: this.props.loginObj.lastname,
            Email: this.props.loginObj.email,
            UserName: this.props.loginObj.username,
            Password: this.props.loginObj.password,
            AccesslevelID: this.props.loginObj.accesslevelId}
            );
        }
  
    handlePerformDelete(event) {
        console.log('handlePerformDelete >>>>>', this.state.LoginID)
        event.preventDefault();
        this.NWDeleteUserFromRestApi();
        }

    ResetDeleteDone() {
        console.log('ResetDeleteDone ???????????????');
        this.setState({
            LoginID: '', 
        })
        this.handleClickTable();
        this.HaeKayttajatNWRestApista();
    }

    //Delete from database
    NWDeleteUserFromRestApi() {
        let apiUrl = 'https://localhost:5001/northwind/logins/delete/' + this.state.LoginID;
        console.log("NWDeleteUserFromRestApi " + apiUrl);
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
                   this.dismiss(); 
                   //this.ResetDeleteDone();
                }
            });
    }

    render() {
        return (
            <form className="box1" onSubmit={this.handlePerformDelete}>    
            <table id="deletetbl">  
                <tr><td className="otsikko">Login ID:</td><td>{this.state.LoginID}</td></tr>
                <tr><td className="otsikko">First Name:</td><td>{this.state.FirstName}</td></tr>
                <tr><td className="otsikko">Last Name:</td><td>{this.state.LastName} </td></tr> 
                <tr><td className="otsikko">Email:</td><td>{this.state.Email} </td></tr>
                <tr><td className="otsikko">Username:</td><td>{this.state.UserName} </td></tr>
                <tr><td className="otsikko">Password:</td><td>{this.state.Password} </td></tr>           
                <tr><td className="otsikko">Access Level:</td><td>{this.state.AccesslevelID} </td></tr>
            </table>   
            <br/>
            <button className="button" type="submit">Delete</button>
        </form>
        );
    }
}
export default NWUserDelete;
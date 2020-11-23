import React, {Component} from 'react';
import './App.css';

class NWUserEdit extends Component {
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
        e.preventDefault();
        this.UpdateDatabase();
    }

    // callBackRoutine() {
    //     console.log('NWUserEDIT: . . . . callBackRoutine >>>---' + this.state.loginObj.ProductID);											  
    // }

    componentDidMount() {
        //console.log("NWUserEDIT-componentDidMount this.props.loginObj.productId: " + this.props.loginObj.productId);
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

    //Update database
    UpdateDatabase() {
        let jwttoken = localStorage.getItem('token');                 
        const kayttaja = {
            LoginID: this.state.LoginID,
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            UserName: this.state.UserName,
            Password: this.state.Password,
            AccesslevelID: this.state.AccesslevelID
        };
        //send an asynchronous request to the backend
        const kayttajaJson = JSON.stringify(kayttaja);
        const apiUrl= 'https://localhost:5001/northwind/logins/update/'+ this.state.LoginID
        console.log(apiUrl);
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization:"Bearer "+jwttoken,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: kayttajaJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    this.dismiss();
                }
            });
    }

    render() {
        return (
        <form className="formSmall" onSubmit={this.handleSubmit}>
            <p><input type="text" className='inputForm' value={this.state.FirstName} style={{marginTop:'10px'}} placeholder="First name" onChange={this.handleChangeFirstName} /></p>  
            <p><input type="text" className='inputForm' value={this.state.LastName} placeholder="Last name" onChange={this.handleChangeLastName} /></p>    
            <p><input type="text" className='inputForm' value={this.state.Email} placeholder="Email" onChange={this.handleChangeEmail} /></p>   
            <p><input type="text" className='inputForm' value={this.state.UserName} placeholder="Username" onChange={this.handleChangeUserName} /></p>   
            <p><input type="text" className='inputForm' value={this.state.Password} placeholder="Unit price" onChange={this.handleChangePassword} /></p>               
            <p><input type="text" className='inputForm' value={this.state.AccesslevelID} placeholder="Access level" onChange={this.handleChangeAccesslevelID} /></p>     
            <br/>
            <p><button type="submit" className='buttonAdd' style={{marginLeft:'10px'}}>Save Changes</button></p> 
        </form>
        );
    }
}
export default NWUserEdit;
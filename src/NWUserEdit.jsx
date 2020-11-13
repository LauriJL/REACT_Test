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
        //alert('Päivitettävä tuote: ' + this.state.ProductID);
        e.preventDefault();
        this.UpdateDatabase();
    }

    // callBackRoutine() {
    //     console.log('NWProductEDIT: . . . . callBackRoutine >>>---' + this.state.tuoteObj.ProductID);											  
    // }

    componentDidMount() {
        //console.log("NWProductEDIT-componentDidMount this.props.tuoteObj.productId: " + this.props.tuoteObj.productId);
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

    //Päivitys kantaan
    UpdateDatabase() {
        // Luodaan tuoteobjekti, johon haetaan state:sta tiedot                     
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
        //console.log("tuoteJson = " + tuoteJson);
        const apiUrl= 'https://localhost:5001/northwind/logins/update/'+ this.state.LoginID
        console.log(apiUrl);
        fetch(apiUrl, {
            method: "PUT",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
            body: kayttajaJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    console.log("Pyyntö tuotteen päivittämiseksi tehty -- -- -- -- --");
                    this.dismiss();
                }
            });
    }

    render() {
        return (
        <form className="box3" onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.FirstName} placeholder="Enter first name" onChange={this.handleChangeFirstName} />  
            <input type="text" value={this.state.LastName} placeholder="Enter last name" onChange={this.handleChangeLastName} />    
            <input type="text" value={this.state.Email} placeholder="Enter email" onChange={this.handleChangeEmail} />   
            <input type="text" value={this.state.UserName} placeholder="Enter username" onChange={this.handleChangeUserName} />   
            <input type="text" value={this.state.Password} placeholder="Enter unit price" onChange={this.handleChangePassword} />               
            <input type="text" value={this.state.AccesslevelID} placeholder="Enter accesslevel" onChange={this.handleChangeAccesslevelID} />     
            <br/>
            <button type="submit">Save Changes</button> 
        </form>
        );
    }
}
export default NWUserEdit;
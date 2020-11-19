import React, {Component} from 'react';
import './App.css';

class Login extends Component {
    constructor(props){
        super (props);
        this.state = {
            UserName: '',
            Password: '',
            ShowLoginForm: true,
            LoggedInUser: ''
        }
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const userFromLocalStorage = localStorage.getItem('user')
        if (userFromLocalStorage) {
            this.setState({...this.state, ShowLoginForm: false, LoggedInUser: userFromLocalStorage})
        }
    }

    logOut() {
        localStorage.clear()
        this.setState({...this.state, ShowLoginForm: true, LoggedInUser: ''})
    }

    handleChangeUserName(e) {
        var input = e.target.value
        this.setState({...this.state,UserName:input})
    }

    handleChangePassword(e) {
        var input = (e.target.value)
        this.setState({...this.state,Password:input})
    }

    handleSubmit(e) {
        e.preventDefault()
        this.createObject()
    }

    createObject() {
        const loginData = {
            username:this.state.UserName,
            password:this.state.Password
        }

        //Send async request to backend
        const loginDataJson = JSON.stringify(loginData)
        console.log(loginDataJson);
        let apiUrl = 'https://localhost:5001/northwind/authentication/'

        fetch(apiUrl,{
            method:"POST",
            headers: {
                "Accept":"application/json",
                "Content-type":"application/json"
            },
            body:loginDataJson
        }).then((response) => response.json())
            .then((json) => {
                const logindata = json
                if (logindata.username === undefined){
                    alert("Login failure")
                }
                else {
                    localStorage.setItem('user', logindata.username)
                    localStorage.setItem('token', logindata.token)
                    this.setState({...this.state, LoggedInUser:logindata.username, ShowLoginForm:false})
                }
            })
    }

    render() {
        if (this.state.ShowLoginForm === true) {
            return(
                <form onSubmit={this.handleSubmit}>
                    <input type='text' className='input' placeholder='Username' onChange={this.handleChangeUserName}/>
                    &nbsp;
                    <input type='password' className='input' placeholder='Password' onChange={this.handleChangePassword}/>
                    <br />
                    <button type='submit' className="buttonAdd">Login</button>
                </form>
            )
        }
        else {
            return(
                <>
                    <h4>You are logged in as {this.state.LoggedInUser}</h4>
                    <button onClick={()=> this.logOut()} className='buttonDelete'>Logout</button>
                </>
            )
        }
    }
}


export default Login
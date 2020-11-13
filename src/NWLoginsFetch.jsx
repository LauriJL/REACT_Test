import React, { Component } from 'react';
import './App.css';

class NWLoginsFetch extends Component {

    constructor(props){
        super(props);
        this.state={
            logins: []
        };
    }

    FetchFromNWRestAPI(){
        let uri = 'https://localhost:5001/northwind/logins';
        fetch(uri)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({ logins:json});
        });
    }

    componentDidMount() {
        this.FetchFromNWRestAPI();
    }

    render(){
        let viesti = "";
        let taulukko = [];
        let tHeaders = "";
        if (this.state.logins.length > 0) {
            tHeaders = <tr><th>LoginId</th><th>Etunimi</th><th>Sukunimi</th><th>Sähköposti</th><th>Käyttäjänimi</th><th>Taso</th></tr>
            for (let index = 0; index < this.state.logins.length; index++){
                const element = this.state.logins[index];
                taulukko.push(<tr key={element.loginid}>
                    <td>{element.loginid}</td>
                    <td>{element.firstname}</td>
                    <td>{element.lastname}</td>
                    <td>{element.email}</td>
                    <td>{element.username}</td>
                    <td>{element.accesslevelid}</td>
                </tr>);
            }
        } else{
            viesti = "Tietoja haetaan..."
        }
        return(
            <div>
                <h1>Käyttäjät</h1>
                <p>{viesti}</p>
                <table class="table" id = "t02"><thead class="thead">{tHeaders}</thead><tbody class="tbody">{taulukko}</tbody></table>
            </div>
        )
    }
}
export default NWLoginsFetch;
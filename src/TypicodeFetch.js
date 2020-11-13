import React, { Component } from 'react';
import './App.css';

class TypicodeFetch extends Component {
    constructor(props){
        super(props);
        // console.log('TypicodeFetch: Constructor');
        this.state = {
            todos: [],
            start: 0,
            end: 10,
            page: 1,
            limit: 10,
            recordcount: 0,
            userId: ""
        };
        this.handleChangeUserId = this.handleChangeUserId.bind(this)
;    }

    componentDidMount() {
        // console.log('TypicodeFetch: componentDidMount');
        this.HaeTypicodesta();
    }

    handleSubmit(){
        // console.log("Typicode fetch: In handleSubmit");
        this.HaeTypicodesta();
    }

    HaeTypicodesta(){
        //let uri = 'https://jsonplaceholder.typicode.com/todos';
        let uri = "";
        if (this.state.userId !== ""){
            uri = 'https://jsonplaceholder.typicode.com/todos?userId='+this.state.userId+'&_page='+this.state.page+'&_limit='+this.state.limit;
        }
        else {
            uri = 'https://jsonplaceholder.typicode.com/todos?_page='+this.state.page+'&_limit='+this.state.limit;
        }
        
        // console.log('TypicodeFetch: HaeTypicodesta: ' + uri);
        fetch(uri)
            .then(response => response.json())
            .then(json=>{
                // console.log(json);
                this.setState({ todos: json, recordcount: json.length });
            });
    }

    handleClickPrev = (event) => {
        let pageNumber = this.state.page;
        if (pageNumber > 0){
            pageNumber=pageNumber-1;
        }
        this.setState({page: pageNumber},this.handleSubmit);
        // this.HaeTypicodesta();
    }

    handleClickNext = (event) => {
        this.setState({page: this.state.page+1},this.handleSubmit);
        // this.HaeTypicodesta();
    }

    handleChangeUserId(event){
        let arvo = event.target.value;
        this.setState({userId:arvo},this.handleSubmit);
    }

    componentWillUnmount(){
        // console.log('TypicodeFetch: componentWillUnmount');
    }

    render(){
        // console.log('TypicodeFetch: Render');
        let viesti = 'Rivejä: ' + this.state.recordcount;
        let taulukko = [];
        if (this.state.todos.length > 0){
            for (let index=0;index < this.state.todos.length; index++){
                const element = this.state.todos[index];
                taulukko.push(<tr key={element.id}>
                    <td>{element.id}</td>
                    <td>{element.userId}</td>
                    <td>{element.title}</td>
                    <td>{element.completed}</td>
                </tr>);
            }
        } else {
            viesti = "Ladataan tietoja..."
        }
        return(
            <div>
                <div className="TypicodeFetch">
                <h2>Haku Typicodesta Fetch-komennolla</h2>
                <p>{viesti}</p>
                <input type="text" placeholder="Syötä käyttäjätunnus" title="Saat antamasi käyttäjän tiedot" value={this.state.userId} onChange={this.handleChangeUserId}/>
                <br/>
                <br/>
                <button class="button" onClick={this.handleClickPrev}>Edelliset</button>
                <button class="button" onClick={this.handleClickNext}>Seuraavat</button>
                <table id="t01"><tbody>{taulukko}</tbody></table>
            </div>
            </div>
        );
    }
}

export default TypicodeFetch;
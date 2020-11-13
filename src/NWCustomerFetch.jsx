import React, { Component } from 'react';
import './App.css';
import Helpit from './Helpit.jsx'
import NWCustomerAdd from './NWCustomerAdd.jsx';
import NWCustomerEdit from './NWCustomerEdit.jsx';
// import NWDeleteRestApista from './NWDeleteRestApista.jsx';

class NWCustomerFetch extends Component {

  constructor(props) {
    super(props);
    //console.log("NWCustomerFetch-komponentti: constructor");
    this.state = { 
        asiakkaat: [], 
        start: 0,
        take: 10,
        visible: "table",
        page: 1,
        country: "",
        yksiAsiakas: [],
        renderChildAdd: true,
        renderChildEdit: true,
        renderChildDelete: true, 
        CustomerID: '',
        CustomerID2Del: ''
    }; 
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
    this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
  }

  //Unmount
  handleChildUnmountAdd(){
    this.setState({renderChild: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleChildUnmountEdit(){
    //console.log("Ollaan NWCustomerFetch -handleChildUnmountEdit-rutiinissa - - - - - - ");
    this.setState({renderChild: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

    handleChildUnmountDelete(){
    console.log("Ollaan NWCustomerFetch -handleChildUnmountDelete-rutiinissa - - - - - - ");
    this.setState({renderChildDelete: false});
    this.handleClickTable();
    this.HaeNWRestApista();
  }

  handleClickTable = () => {
    this.setState({visible: "table"});
  }

  handleClickAdd = () => {
    this.setState({visible: "addForm", renderChildAdd: true})
  }

  handleClickEdit = (asiakasObj, event) => {
    //alert(event.type);
    this.setState({
      yksiAsiakas: asiakasObj,
      visible: "editForm",
      renderChildEdit: true
    })
  }

  handleClickDelete = (poistettava,event) => {
    //console.log('HandleClickDelete >>>>>>', poistettava)
    alert("Poistetan asiakas: " + poistettava);
    this.setState({
      CustomerID2Del: poistettava, 
      visible: "deleteForm", 
      // renderChildDelete: true
    })
  }

  handlePerformDelete(event) {
    //console.log('handlePerformDelete >>>>>', this.state.CustomerID2Del)
    event.preventDefault();
    this.NWDeleteRestApista();
  }

  ResetDeleteDone() {
    //console.log('ResetDeleteDone >>>>>');
    this.setState({
      CustomerID2Del: '', 
    })
    this.handleClickTable();
    this.HaeNWRestApista();
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

  handleChangeCountry(event){
    let arvo = event.target.value;
    this.setState({country:arvo},this.handleSubmit);
  }

  componentDidMount() {
    this.HaeNWRestApista();
  }

  handleSubmit(){
    this.HaeNWRestApista();
  }

  HaeNWRestApista() {
    let uri = "";
    if (this.state.country !== ""){
      uri = 'https://localhost:5001/northwind/customers/r?page='+this.state.page+'&limit='+this.state.take+'&country='+this.state.country;
      //console.log("Retrieving from REST API " + uri);
    } else {
      uri = 'https://localhost:5001/northwind/customers/r?page='+this.state.page+'&limit='+this.state.take;
      //console.log("Retrieving from REST API without country " + uri);
    }   
    fetch(uri)
    .then(response => response.json())
    .then(json => {
        //console.log(json);
        this.setState({ asiakkaat: json }); //Viedään tulosjoukko (json) setState-komennolla asiakkaat -olioon
    });
  }

  NWDeleteRestApista() {
    let apiUrl = 'https://localhost:5001/northwind/customers/delete/'+this.state.CustomerID2Del;
    //console.log("NWDeleteRestApista " + apiUrl);
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
               //console.log("Pyyntö asiakkaan poistamiseksi tehty -- -- -- -- --");
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
    if (this.state.asiakkaat.length > 0) {
        //Luodaan taulukon otsikot
        tHeaders = <tr><th>Customer Id</th><th>Company Name</th><th>Contact Name</th><th>Address</th><th>City</th><th>Country</th><th>Muokkaa</th><th>Poista</th></tr>
        for (let index = 0; index < this.state.asiakkaat.length; index++) {
            const element = this.state.asiakkaat[index];
            taulukko.push(<tr key={element.customerId}>
            <td>{element.customerId}</td>
            <td>{element.companyName}</td>
            <td>{element.contactName}</td>
            <td>{element.address}</td>
            <td>{element.city}</td>
            <td>{element.country}</td>
            <td><button onClick={this.handleClickEdit.bind(this, element)}>Muokkaa</button></td>
            <td><button onClick={this.handleClickDelete.bind(this, element.customerId)}>Poista</button></td>
            </tr>);
      }
    }
    else {
      viesti = "Retrieving data from database..."
    }

    if (this.state.visible === "table") {
      return (
        <div className="box1">
        <h2>Customers</h2>
        <p>{viesti}</p>
        <input type="text" placeholder="Filter by country" title="Saat antamasi maan mukaiset tiedot" value={this.state.country} onChange={this.handleChangeCountry}/>
        <br/>
        <br/>
        {/* <button className="button" onClick={this.handleClickHelp}>Help</button> */}
        <button className="button" onClick={this.handleClickAdd}>Add New</button>
        {/* <button className="button" onClick={this.handleClickTable}>Browse Customers</button> */}
        <button className="button" onClick={this.handleClickPrev}>Previous</button>
        <button className="button" onClick={this.handleClickNext}>Next</button>
        <br/>
        <table className="table table-dark" id = "t01"><thead class="thead">{tHeaders}</thead><tbody class="tbody">{taulukko}</tbody></table>
      </div>
      );
    } 
    else if (this.state.visible === "addForm") {
      return (
        <div className="box1">         
          <h2>Add New Customer</h2>
          <div>
            <button className="button" onClick={this.handleClickTable}>Browse Customers</button>
            <button className="button" onClick={this.handleClickHelp}>Help</button>
          </div>

          {/* <NWCustomerAdd /> */}
          {this.state.renderChildAdd ? <NWCustomerAdd unmountMe={this.handleChildUnmountAdd} /> : null}
        </div>
      );
    } 
    else if (this.state.visible === "editForm") {
      return (
        <div className="box1">
          <h2>Edit Customer Data</h2>
          <div>
            <button onClick={this.handleClickTable}>Browse Customers</button>
            <button onClick={this.handleClickHelp}>Help</button>
          </div>
          {this.state.renderChildEdit ? <NWCustomerEdit asiakasObj={this.state.yksiAsiakas} unmountMe={this.handleChildUnmountEdit} /> : null}
        </div>
      );
    }
    else if (this.state.visible === "deleteForm") {
      return (
        <div className="box1">
          <h2>Delete Customer</h2>
          <div>
            <>
              <div>
                <button onClick={this.handlePerformDelete}>Cnofirm delete</button>
                <hr/>
              </div>
              <div>
                <button onClick={this.handleClickTable}>Browse Customers</button>
                <button onClick={this.handleClickHelp}>Help</button>
              </div>
            </>
          </div>
        </div>
      );
    }
    else if (this.state.visible === "help") {
      return (
        <div className="box2">
          <h2>Sovelluksen opasteet</h2>
          <button class="button" onClick={this.handleClickTable}>Selaa asiakkaita</button>
          <button class="button" onClick={this.handleClickAdd}>Lisää asiakas</button>
          <Helpit moduli="NWCustomerFetch"/>
        </div>
      );      
    } else {
      return(
        <div className="box1">
        <h1>Sovellusvirhe! Lataa sivu uudelleen.</h1>
      </div>
      );     
    }
    
  }
}
export default NWCustomerFetch;


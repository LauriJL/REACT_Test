import React, { Component } from 'react';
import './App.css';
import NWCustomerAdd from './NWCustomerAdd.jsx';
import NWCustomerEdit from './NWCustomerEdit.jsx';
import NWCustomerDelete from './NWCustomerDelete.jsx';

class NWCustomerFetch extends Component {

  constructor(props) {
    super(props);
    //console.log("NWCustomerFetch-komponentti: constructor");
    this.state = { 
        asiakkaat: [], 
        start: 0,
        take: 10,
        visible: "table",
        page: 0,
        country: "",
        yksiAsiakas: [],
        renderChildAdd: true,
        renderChildEdit: true,
        renderChildDelete: true, 
        CustomerID: '',
        CustomerID2Del: []
    }; 
    this.handleChangeCountry = this.handleChangeCountry.bind(this);
    this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
    this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
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

  //Unmount
  handleChildUnmountAdd(){
    this.setState({renderChild: false});
    this.handleClickTable();
    this.GetCustFromNWRestApi();
  }

  handleChildUnmountEdit(){
    //console.log("Ollaan NWCustomerFetch -handleChildUnmountEdit-rutiinissa - - - - - - ");
    this.setState({renderChild: false});
    this.handleClickTable();
    this.GetCustFromNWRestApi();
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

  handleClickDelete = (asiakasObj,event) => {
    console.log('HandleClickDelete >>>>>>', asiakasObj)
    //alert("Poistetan asiakas: " + asiakasObj);
    this.setState({
      CustomerID2Del: asiakasObj, 
      visible: "deleteForm", 
      renderChildDelete: true
    })
  }

  handleChildUnmountDelete(){
    console.log("Ollaan NWCustomerFetch -handleChildUnmountDelete-rutiinissa - - - - - - ");
    this.setState({renderChildDelete: false});
    this.handleClickTable();
    this.GetCustFromNWRestApi();
  }

  handleChangeCountry(event){
    let arvo = event.target.value;
    this.setState({country:arvo},this.handleSubmit);
  }

  componentDidMount() {
    this.GetCustFromNWRestApi();
  }

  handleClickTable = () => {
    this.setState({visible: "table"});
  }

  handleSubmit(){
    this.GetCustFromNWRestApi();
  }

  GetCustFromNWRestApi() {
    let jwttoken = localStorage.getItem('token');
    let uri = "";
    if (this.state.country !== ""){
      uri = 'https://localhost:5001/northwind/customers/r?page='+this.state.page+'&limit='+this.state.take+'&country='+this.state.country;
    } else {
      uri = 'https://localhost:5001/northwind/customers/r?page='+this.state.page+'&limit='+this.state.take;
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
        this.setState({ asiakkaat: logindata })
    }
    )
  }

  render() {
    let viesti = "";
    let taulukko = [];
    let tHeaders = "";
    if (this.state.asiakkaat.length > 0) {
        tHeaders = <tr><th>Customer ID</th><th>Company Name</th><th>Contact Name</th><th>Address</th><th>City</th><th>Country</th><th>Edit</th><th>Delete</th></tr>
        for (let index = 0; index < this.state.asiakkaat.length; index++) {
            const element = this.state.asiakkaat[index];
            taulukko.push(<tr key={element.customerId}>
            <td>{element.customerId}</td>
            <td>{element.companyName}</td>
            <td>{element.contactName}</td>
            <td>{element.address}</td>
            <td>{element.city}</td>
            <td>{element.country}</td>
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
        <h2>Customers</h2>
        <p>{viesti}</p>
        <input type="text" placeholder="Filter by country" title="Filter customers by country" value={this.state.country} onChange={this.handleChangeCountry}/>
        <br/>
        <br/>
        <button className="buttonAdd" onClick={this.handleClickAdd}>Add New Customer</button>
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
        <div className='maindiv'>         
          <h2>Add New Customer</h2>
          <div >
            <button className="button" onClick={this.handleClickTable}>Back to Customers</button>
            <button className="button" onClick={this.handleClickHelp}>Help</button>
          </div>
          {this.state.renderChildAdd ? <NWCustomerAdd unmountMe={this.handleChildUnmountAdd} /> : null}
        </div>
      );
    } 
    else if (this.state.visible === "editForm") {
      return (
        <div className="maindiv">
          <h2>Edit Customer Data</h2>
          <div>
            <button className="button" onClick={this.handleClickTable}>Back to Customers</button>
            <button className="button" onClick={this.handleClickHelp}>Help</button>
          </div>
          {this.state.renderChildEdit ? <NWCustomerEdit asiakasObj={this.state.yksiAsiakas} unmountMe={this.handleChildUnmountEdit} /> : null}
        </div>
      );
    }
    else if (this.state.visible === "deleteForm") {
      return (
        <div className="maindiv">
          <h2>Delete Customer</h2>
          <div>
            <div>
              <button className="button" onClick={this.handleClickTable}>Back to Customers</button>
              <button className="button" onClick={this.handleClickHelp}>Help</button>
            </div>
          {this.state.renderChildDelete ? <NWCustomerDelete asiakasObj={this.state.CustomerID2Del} unmountMe={this.handleChildUnmountDelete} /> : null}
          </div>
        </div>
      );
    }
    else if (this.state.visible === "help") {
      return (
        <div className="help">
          <h2 className='h2'>Customers</h2>
          <p className='text' style={{marginLeft:'10px'}}>Browse, add, modify and delete customers by using the appropriate buttons.</p>
          <button class="button" onClick={this.handleClickTable} style={{marginLeft:'10px'}}>Back to Customers</button>
        </div>
      );      
    } 
    else {
      return(
        <div className="box1">
        <h1>Application error! Reload page.</h1>
      </div>
      );     
    }
    
  }
}
export default NWCustomerFetch;


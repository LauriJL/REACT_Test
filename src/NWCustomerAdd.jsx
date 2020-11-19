import React, {Component} from 'react';
import './App.css';

class NWCustomerAdd extends Component {

    // Konstruktori
    constructor(props){
        super(props);
        this.state = { 
            CustomerID: '',
            CompanyName: '',
            ContactName: '',
            ContactTitle: '',
            Address: '',
            City: '',
            Region: '',
            PostalCode: '',
            Country: '',
            Phone: '',
            Fax: ''
          };
        this.handleChangeCustomerID = this.handleChangeCustomerID.bind(this);
        this.handleChangeCompanyName = this.handleChangeCompanyName.bind(this);
        this.handleChangeContactName = this.handleChangeContactName.bind(this);
        this.handleChangeContactTitle = this.handleChangeContactTitle.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeRegion = this.handleChangeRegion.bind(this);
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleChangeCountry = this.handleChangeCountry.bind(this);
        this.handleChangePhone = this.handleChangePhone.bind(this);
        this.handleChangeFax = this.handleChangeFax.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Dismiss
    dismiss(){
        this.props.unmountMe();
    }

    // Kuuntelijat
    handleChangeCustomerID(e) {
        var input = e.target.value;
        this.setState({...this.state,CustomerID: input.toUpperCase()});
    }

    handleChangeCompanyName(e){
        var input = e.target.value;
        this.setState({...this.state,CompanyName: input});
    }

    handleChangeContactName(e){
        var input = e.target.value;
        this.setState({...this.state,ContactName: input})
    }

    handleChangeContactTitle(e) {
        var input = e.target.value;
        this.setState({...this.state,ContactTitle: input});
    }

    handleChangeAddress(e) {
        var input = e.target.value;
        this.setState({...this.state,Address: input});
    }

    handleChangeCity(e) {
        var input = e.target.value;
        this.setState({...this.state,City: input});
    }

    handleChangeRegion(e) {
        var input = e.target.value;
        this.setState({...this.state,Region: input});
    }

    handleChangePostalCode(e) {
        var input = e.target.value;
        this.setState({...this.state,PostalCode: input});
    }

    handleChangeCountry(e) {
        var input = e.target.value;
        this.setState({...this.state,Country: input});
    }

    handleChangePhone(e) {
        var input = e.target.value;
        this.setState({...this.state,Phone: input});
    }

    handleChangeFax(e) {
        var input = e.target.value;
        this.setState({...this.state,Fax: input});
    }

    handleSubmit(e){
        //alert(this.state.CustomerID + ' lisätty kantaan.');
        e.preventDefault();
        this.InsertToDatabase();
    }

    // Kantaan vienti
    InsertToDatabase(){
        //Luodaan JS objekti asiakasta varten. Tiedot objektiin haetaan state:sta.
        const asiakas = {customerID: this.state.CustomerID,
                        companyName: this.state.CompanyName,
                        contactName: this.state.ContactName,
                        contactTitle: this.state.ContactTitle,
                        address: this.state.Address,
                        city: this.state.City,
                        region: this.state.Region,
                        postalCode: this.state.PostalCode,
                        country: this.state.Country,
                        phone: this.state.Phone,
                        fax: this.state.Fax};
        
        //Luodaan asiakas JSON
        const asiakasJSON = JSON.stringify(asiakas);

        //API-kutsu: viedään data kantaan fetchillä.
        //console.log('asiakasJSON = ' + asiakasJSON);
        const apiURL = 'https://localhost:5001/northwind/Customers/add';
        //const apiURL = 'https://localhost:5001/northwind/Customers';
        fetch(apiURL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: asiakasJSON
        })
        .then((response) => response.json())
        .then((json) => {
            //Store data returned from backend to the current state
            const success = json;
            console.log(`Response from server: ${success}.`);
            if (success){
                this.dismiss();
            }
        });
    }

    render(){
        return(
            // Lomake
            <form className="box3" onSubmit={this.handleSubmit}>
                <input type="text" title="Syötä asiakastunnus" placeholder="CustomerID" onChange={this.handleChangeCustomerID}/>
                <input type="text" placeholder="CompanyName" onChange={this.handleChangeCompanyName}/>
                <input type="text" placeholder="ContactName" onChange={this.handleChangeContactName}/>
                <input type="text" placeholder="ContactTitle" onChange={this.handleChangeContactTitle}/>
                <input type="text" placeholder="Address" onChange={this.handleChangeAddress}/>
                <input type="text" placeholder="City" onChange={this.handleChangeCity}/>
                <input type="text" placeholder="Region" onChange={this.handleChangeRegion}/>
                <input type="text" placeholder="PostalCode" onChange={this.handleChangePostalCode}/>
                <input type="text" placeholder="Country" onChange={this.handleChangeCountry}/>
                <input type="text" placeholder="Phone" onChange={this.handleChangePhone}/>
                <input type="text" placeholder="Fax" onChange={this.handleChangeFax}/>
                <br/>
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default NWCustomerAdd;

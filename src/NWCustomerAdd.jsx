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
        e.preventDefault();
        this.InsertToDatabase();
    }

    //Update database
    InsertToDatabase(){
        let jwttoken = localStorage.getItem('token');
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
        
        //Create customer JSON
        const asiakasJSON = JSON.stringify(asiakas);

        //API-call: insert data to database with fetch
        const apiURL = 'https://localhost:5001/northwind/Customers/add';

        fetch(apiURL, {
            method: "POST",
            headers: {
                Authorization:"Bearer "+jwttoken,
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
            <>
            <h5>Note: You need to be logged in in order to be able to add new customers.</h5>
            <form className="formMedium" onSubmit={this.handleSubmit}>
                <p><input className='inputForm' type="text" style={{marginTop:'10px'}} placeholder="CustomerID" onChange={this.handleChangeCustomerID}/></p>
                <p><input className='inputForm' type="text" placeholder="CompanyName" onChange={this.handleChangeCompanyName}/></p>
                <p><input className='inputForm' type="text" placeholder="ContactName" onChange={this.handleChangeContactName}/></p>
                <p><input className='inputForm' type="text" placeholder="ContactTitle" onChange={this.handleChangeContactTitle}/></p>
                <p><input className='inputForm' type="text" placeholder="Address" onChange={this.handleChangeAddress}/></p>
                <p><input className='inputForm' type="text" placeholder="City" onChange={this.handleChangeCity}/></p>
                <p><input className='inputForm' type="text" placeholder="Region" onChange={this.handleChangeRegion}/></p>
                <p><input className='inputForm' type="text" placeholder="PostalCode" onChange={this.handleChangePostalCode}/></p>
                <p><input className='inputForm' type="text" placeholder="Country" onChange={this.handleChangeCountry}/></p>
                <p><input className='inputForm' type="text" placeholder="Phone" onChange={this.handleChangePhone}/></p>
                <p><input className='inputForm' type="text" placeholder="Fax" onChange={this.handleChangeFax}/></p>
                <p><button type="submit" className='buttonAdd' style={{marginLeft:'10px'}}>Save</button></p>
            </form>
            </>
        );
    }
}

export default NWCustomerAdd;

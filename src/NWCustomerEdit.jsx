import React, {Component} from 'react';
import './App.css';

class NWCustomerEdit extends Component {
    //Constructor
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

    //Kuuntelijat
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
        //alert('Päivitettävä asiakas: ' + this.state.CustomerID);
        e.preventDefault();
        this.UpdateDatabase();
    }

    // callBackRoutine() {
    //     console.log('NWCustomerEDIT: . . . . callBackRoutine >>>---' + this.state.asiakasObj.CustomerID);											  
    // }

    componentDidMount() {
        console.log("NWCustomerEDIT-componentDidMount this.props.asiakasObj.customerId: " + this.props.asiakasObj.customerId);
        this.setState({
            CustomerID: this.props.asiakasObj.customerId,
            CompanyName: this.props.asiakasObj.companyName,
            ContactName: this.props.asiakasObj.contactName,
            ContactTitle: this.props.asiakasObj.contactTitle,
            Address: this.props.asiakasObj.address,
            PostalCode: this.props.asiakasObj.postalCode,
            Phone: this.props.asiakasObj.phone,
            Fax: this.props.asiakasObj.fax}
            );
            //Tutkitaan onko arvo null --> jos ei, niin viedään se stateen
            if (this.props.asiakasObj.city) {this.setState({City: this.props.asiakasObj.city});};
            if (this.props.asiakasObj.country) {
                this.setState({Country: this.props.asiakasObj.country});
            };
    }

    //Päivitys kantaan
    UpdateDatabase() {
        // Luodaan asiakasobjekti, johon haetaan state:sta tiedot                     
        const asiakas = {CustomerID: this.state.CustomerID,
            CompanyName: this.state.CompanyName,
            ContactName: this.state.ContactName,
            ContactTitle: this.state.ContactTitle,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country,
            Phone: this.state.Phone,
            Fax: this.state.Fax
        };
        //send an asynchronous request to the backend
        const asiakasJson = JSON.stringify(asiakas);
        //console.log("asiakasJson = " + asiakasJson);
        // const apiUrl= 'https://localhost:5001/northwind/customers/'+this.state.CustomerID;
        const apiUrl= 'https://localhost:5001/northwind/customers/update/'+this.state.CustomerID
        fetch(apiUrl, {
            method: "PUT",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
            body: asiakasJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    console.log("Pyyntö asiakkaan päivittämiseksi tehty -- -- -- -- --");
                    this.dismiss();
                }
            });
    }

    render() {
        return (
        <form className="form" onSubmit={this.handleSubmit}>        
            <p><input type="text" className='inputForm' style={{marginTop:'10px'}} value={this.state.CustomerID} title="Syötä asiakastunnus" placeholder="CustomerID" onChange={this.handleChangeCustomerID} /></p>    
            <p><input type="text" className='inputForm' value={this.state.CompanyName} placeholder="CompanyName" onChange={this.handleChangeCompanyName} /></p>
            <p><input type="text" className='inputForm' value={this.state.ContactName} placeholder="ContactName" onChange={this.handleChangeContactName} /></p>   
            <p><input type="text" className='inputForm' value={this.state.ContactTitle} placeholder="ContactTitle" onChange={this.handleChangeContactTitle} /></p>   
            <p><input type="text" className='inputForm' value={this.state.Address} placeholder="Address" onChange={this.handleChangeAddress} /></p>   
            <p><input type="text" className='inputForm' value={this.state.PostalCode} placeholder="PostalCode" onChange={this.handleChangePostalCode} /></p>               
            <p><input type="text" className='inputForm' value={this.state.City} placeholder="City" onChange={this.handleChangeCity} /></p>   
            <p><input type="text" className='inputForm' value={this.state.Country} placeholder="Country" onChange={this.handleChangeCountry} /></p>  
            <p><input type="text" className='inputForm' value={this.state.Phone} placeholder="Phone" onChange={this.handleChangePhone} /> </p>  
            <p><input type="text" className='inputForm' value={this.state.Fax} placeholder="Fax" onChange={this.handleChangeFax} /></p> 
            <p><button type="submit" className='buttonAdd' style={{marginLeft:'10px'}}>Save changes</button></p> 
        </form>
        );
    }
}
export default NWCustomerEdit;
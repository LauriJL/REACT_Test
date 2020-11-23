import React, {Component} from 'react';
import './App.css';

class NWCustomerDelete extends Component {
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
        this.handlePerformDelete = this.handlePerformDelete.bind(this);
    }

    //Dismiss
    dismiss(){
        this.props.unmountMe();
    }

    //Kuuntelijat
    handleChangeCustomerID(e) {
        var input = e.target.value;
        this.setState({...this.state,CustomerID:input});
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
        this.UpdateDatabase();
    }

    callBackRoutine() {
        //console.log('NWCustomerDELETE: . . . . callBackRoutine >>>---' + this.state.asiakasObj.CustomerID);											  
    }

    componentDidMount() {
        console.log("NWCustomerDELETE-componentDidMount this.props.asiakasObj.customerId: " + this.props.asiakasObj.customerId);
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
        }

    handlePerformDelete(event) {
        console.log('handlePerformDelete >>>>>', this.state.CustomerID)
        event.preventDefault();
        this.NWDeleteCustFromRestApi();
        }

    ResetDeleteDone() {
        console.log('ResetDeleteDone >>>>>');
        this.setState({
            CustomerID: '', 
        })
        this.handleClickTable();
        this.GetCustFromNWRestApi();
    }

    //Delete customer from NW database
    NWDeleteCustFromRestApi() {
        let apiUrl = 'https://localhost:5001/northwind/customers/delete/'+this.state.CustomerID;
        console.log("NWDeleteRestApista " + apiUrl);
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
                this.dismiss(); 
                //this.ResetDeleteDone();
                }
            });
        }

    render() {
        return (
            <>
            <form className="formDelete" onSubmit={this.handlePerformDelete}>        
            <table style={{marginLeft:'10px'}}>  
                    <tr className="text"><td >Customer ID:</td><td>{this.state.customerId}</td></tr>
                    <tr className="text"><td>Company Name:</td><td>{this.state.CompanyName}</td></tr>
                    <tr className="text"><td>Contact Name:</td><td>{this.state.ContactName} </td></tr> 
                    <tr className="text"><td>Contact Title:</td><td>{this.state.ContactTitle} </td></tr>
                    <tr className="text"><td>Address:</td><td>{this.state.Address} </td></tr>
                    <tr className="text"><td>City:</td><td>{this.state.City} </td></tr>           
                    <tr className="text"><td>Region:</td><td>{this.state.Region} </td></tr>
                    <tr className="text"><td>Postal Code:</td><td>{this.state.PostalCode} </td></tr>
                    <tr className="text"><td>Country:</td><td>{this.state.Country} </td></tr>
                    <tr className="text"><td>Phone:</td><td>{this.state.Phone} </td></tr>
                    <tr className="text"><td>Fax:</td><td>{this.state.Fax} </td></tr> 
                </table>   
                <br/>
                <button className="buttonDelete" type="submit" style={{marginLeft:'10px'}}>Delete</button>
            </form>
        </>
        );
    }
}
export default NWCustomerDelete;
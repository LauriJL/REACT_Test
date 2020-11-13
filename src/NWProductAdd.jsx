import React, {Component} from 'react';
import './App.css';

class NWProductAdd extends Component {

    // Konstruktori
    constructor(props){
        super(props);
        this.state = { 
            ProductID: '',
            ProductName: '',
            SupplierID: '',
            CategoryID: '',
            QuantityPerUnit: '',
            UnitPrice: '',
            UnitsInStock: '',
            UnitsOnOrder: '',
            ReorderLevel: '',
            Discontinued: ''
          };
        this.handleChangeProductName = this.handleChangeProductName.bind(this);
        this.handleChangeSupplierID = this.handleChangeSupplierID.bind(this);
        this.handleChangeCategoryID = this.handleChangeCategoryID.bind(this);
        this.handleChangeQuantityPerUnit = this.handleChangeQuantityPerUnit.bind(this);
        this.handleChangeUnitPrice = this.handleChangeUnitPrice.bind(this);
        this.handleChangeUnitsInStock = this.handleChangeUnitsInStock.bind(this);
        this.handleChangeUnitsOnOrder = this.handleChangeUnitsOnOrder.bind(this);
        this.handleChangeReorderLevel = this.handleChangeReorderLevel.bind(this);
        this.handleChangeDiscontinued = this.handleChangeDiscontinued.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //Dismiss
    dismiss(){
        this.props.unmountMe();
    }

    //Event listeners
    handleChangeProductName(e){
        var input = e.target.value;
        this.setState({...this.state,ProductName: input});
    }

    handleChangeSupplierID(e){
        var input = e.target.value;
        this.setState({...this.state,SupplierID: input})
    }

    handleChangeCategoryID(e) {
        var input = e.target.value;
        this.setState({...this.state,CategoryID: input});
    }

    handleChangeQuantityPerUnit(e) {
        var input = e.target.value;
        this.setState({...this.state,QuantityPerUnit: input});
    }

    handleChangeUnitPrice(e) {
        var input = e.target.value;
        this.setState({...this.state,UnitPrice: input});
    }

    handleChangeUnitsInStock(e) {
        var input = e.target.value;
        this.setState({...this.state,UnitsInStock: input});
    }

    handleChangeUnitsOnOrder(e) {
        var input = e.target.value;
        this.setState({...this.state,UnitsOnOrder: input});
    }

    handleChangeReorderLevel(e) {
        var input = e.target.value;
        this.setState({...this.state,ReorderLevel: input});
    }

    handleChangeDiscontinued(changeEvent) {
        this.setState({
            Discontinued: changeEvent.target.value
          });
    }

    handleSubmit(e){
        e.preventDefault();
        this.InsertToDatabase();
    }

    // Kantaan vienti
    InsertToDatabase(){
        //Luodaan JS objekti tuotetta varten. Tiedot objektiin haetaan state:sta.
        const tuote = {
            ProductName: this.state.ProductName,
            SupplierID: this.state.SupplierID,
            CategoryID: this.state.CategoryID,
            QuantityPerUnit: this.state.QuantityPerUnit,
            UnitPrice: this.state.UnitPrice,
            UnitsInStock: this.state.UnitsInStock,
            UnitsOnOrder: this.state.UnitsOnOrder,
            ReorderLevel: this.state.ReorderLevel,
            Discontinued: this.state.Discontinued
        };
        
        //Luodaan asiakas JSON
        const tuoteJSON = JSON.stringify(tuote);

        //API-kutsu: viedään data kantaan fetchillä.
        //console.log('tuoteJSON = ' + tuoteJSON);
        const apiURL = 'https://localhost:5001/northwind/Products/add/';
        //const apiURL = 'https://localhost:5001/northwind/Customers';
        fetch(apiURL, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: tuoteJSON
        })
        .then((response) => response.json())
        .then((json) => {
            //Store data returned from backend to the current state
            const success = json;
            //console.log(`Response from server: ${success}.`);
            if (success){
                this.dismiss();
            }
        });
    }

    render(){
        return(
            //Form
            <form className="box3" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Enter product name" onChange={this.handleChangeProductName} />  
                <input type="text" placeholder="Enter supplier ID" onChange={this.handleChangeSupplierID} />    
                <input type="text" placeholder="Enter category ID" onChange={this.handleChangeCategoryID} />   
                <input type="text" placeholder="Enter quantity per unit" onChange={this.handleChangeQuantityPerUnit} />   
                <input type="text" placeholder="Enter unit price" onChange={this.handleChangeUnitPrice} />               
                <input type="text" placeholder="Enter number of units in stock" onChange={this.handleChangeUnitsInStock} />   
                <input type="text" placeholder="Enter number of units on order" onChange={this.handleChangeUnitsOnOrder} />   
                <input type="text" placeholder="Enter reorder level" onChange={this.handleChangeReorderLevel} />   
                {/* <input type="text" placeholder="Discontinued?" onChange={this.handleChangeDiscontinued} />    */}
                <p><b>Discontinued:</b> &nbsp;
                <label>
                <input type="radio" value="false" checked={this.state.Discontinued === 'false'} onChange={this.handleChangeDiscontinued}/>
                    No         
                </label> &nbsp; &nbsp;
                <label>
                    <input type="radio" value="true" checked={this.state.Discontinued === 'true'} onChange={this.handleChangeDiscontinued}/>
                    Yes
                </label> </p> 
                <button type="submit">Save Changes</button> 
            </form>
        );
    }
}

export default NWProductAdd;

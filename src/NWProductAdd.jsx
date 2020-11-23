import React, {Component} from 'react';
import './App.css';

class NWProductAdd extends Component {

    // Constructor
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
        //Create JS object for product. object data retrieved from state.
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
        
        //Create product JSON
        const tuoteJSON = JSON.stringify(tuote);

        //API call: insert data to databse with fetch.
        const apiURL = 'https://localhost:5001/northwind/Products/add/';
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
            if (success){
                this.dismiss();
            }
        });
    }

    render(){
        return(
            //Form
            <form className="formSmall" onSubmit={this.handleSubmit}>
                <p><input className='inputForm' type="text" style={{marginTop:'10px'}} placeholder="Product name" onChange={this.handleChangeProductName} /></p> 
                <p><input className='inputForm' type="text" placeholder="Supplier ID" onChange={this.handleChangeSupplierID} /> </p>   
                <p><input className='inputForm' type="text" placeholder="Category ID" onChange={this.handleChangeCategoryID} /> </p>  
                <p><input className='inputForm' type="text" placeholder="Quantity per unit" onChange={this.handleChangeQuantityPerUnit} /> </p> 
                <p><input className='inputForm' type="text" placeholder="Unit price" onChange={this.handleChangeUnitPrice} /> </p>              
                <p><input className='inputForm' type="text" placeholder="Number of units in stock" onChange={this.handleChangeUnitsInStock} /> </p> 
                <p><input className='inputForm' type="text" placeholder="Number of units on order" onChange={this.handleChangeUnitsOnOrder} /> </p>  
                <p><input className='inputForm' type="text" placeholder="Reorder level" onChange={this.handleChangeReorderLevel} /> </p>  
                <p className='text' style={{marginLeft:'10px'}}><b>Discontinued:</b> &nbsp;
                <label >
                <input type="radio" value="false" checked={this.state.Discontinued === 'false'} onChange={this.handleChangeDiscontinued}/>
                    No         
                </label> &nbsp; &nbsp;
                <label>
                    <input type="radio" value="true" checked={this.state.Discontinued === 'true'} onChange={this.handleChangeDiscontinued}/>
                    Yes
                </label> </p> 
                <p><button type="submit" className='buttonAdd' style={{marginLeft:'10px'}}>Save Changes</button> </p>
            </form>
        );
    }
}

export default NWProductAdd;

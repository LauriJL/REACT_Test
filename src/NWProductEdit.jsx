import React, {Component} from 'react';
import './App.css';

class NWProductEdit extends Component {
    //Constructor
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
            Discontinued: 'false'
          };
        this.handleChangeProductID = this.handleChangeProductID.bind(this);
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
    handleChangeProductID(e) {
        var input = e.target.value;
        this.setState({...this.state,ProductID: input});
    }

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
        this.UpdateDatabase();
    }

    // callBackRoutine() {
    //     console.log('NWProductEDIT: . . . . callBackRoutine >>>---' + this.state.tuoteObj.ProductID);											  
    // }

    componentDidMount() {
        //console.log("NWProductEDIT-componentDidMount this.props.tuoteObj.productId: " + this.props.tuoteObj.productId);
        this.setState({
            ProductID: this.props.tuoteObj.productId,
            ProductName: this.props.tuoteObj.productName,
            SupplierID: this.props.tuoteObj.supplierId,
            CategoryID: this.props.tuoteObj.categoryId,
            QuantityPerUnit: this.props.tuoteObj.quantityPerUnit,
            UnitPrice: this.props.tuoteObj.unitPrice,
            UnitsInStock: this.props.tuoteObj.unitsInStock,
            UnitsOnOrder: this.props.tuoteObj.unitsOnOrder,
            ReorderLevel: this.props.tuoteObj.reorderLevel,
            Discontinued: this.props.tuoteObj.discontinued}
            );
     }

    //Update database
    UpdateDatabase() {                 
        const tuote = {ProductID: this.state.ProductID,
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
        //send an asynchronous request to the backend
        const tuoteJson = JSON.stringify(tuote);
        const apiUrl= 'https://localhost:5001/northwind/products/update/'+ this.state.ProductID
        console.log(apiUrl);
        fetch(apiUrl, {
            method: "PUT",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
            body: tuoteJson
        }).then((response) => response.json())
            .then((json) => {
                const success = json;
                console.log(`Response from server: ${success}.`);
                if (success) {
                    console.log("Pyyntö tuotteen päivittämiseksi tehty -- -- -- -- --");
                    this.dismiss();
                }
            });
    }

    render() {
        return (
        <form className="formSmall" onSubmit={this.handleSubmit}>
            <p><input type="text" className='inputForm' value={this.state.ProductName} style={{marginTop:'10px'}} placeholder="Product name" onChange={this.handleChangeProductName} /> </p>
            <p><input type="text" className='inputForm' value={this.state.SupplierID} placeholder="Supplier ID" onChange={this.handleChangeSupplierID} /> </p>   
            <p><input type="text" className='inputForm' value={this.state.CategoryID} placeholder="Category ID" onChange={this.handleChangeCategoryID} /> </p>  
            <p><input type="text" className='inputForm' value={this.state.QuantityPerUnit} placeholder="Quantity per unit" onChange={this.handleChangeQuantityPerUnit} /></p>   
            <p><input type="text" className='inputForm' value={this.state.UnitPrice} placeholder="Unit price" onChange={this.handleChangeUnitPrice} /></p>               
            <p><input type="text" className='inputForm' value={this.state.UnitsInStock} placeholder="Number of units in stock" onChange={this.handleChangeUnitsInStock} /></p>   
            <p><input type="text" className='inputForm' value={this.state.UnitsOnOrder} placeholder="Number of units on order" onChange={this.handleChangeUnitsOnOrder} /></p>   
            <p><input type="text" className='inputForm' value={this.state.ReorderLevel} placeholder="Reorder level" onChange={this.handleChangeReorderLevel} /></p>  
            <br/>
            <p className='text' style={{marginLeft:'10px'}}><b>Discontinued</b> &nbsp;
            <label>
                <input type="radio" value="false" checked={this.state.Discontinued === 'false'} onChange={this.handleChangeDiscontinued}/>
                No         
            </label>&nbsp; &nbsp;
            <label>
                <input type="radio" value="true" checked={this.state.Discontinued === 'true'} onChange={this.handleChangeDiscontinued}/>
                Yes
            </label> </p> 
            <button type="submit" className='buttonAdd' style={{marginLeft:'10px'}}>Save Changes</button> 
        </form>
        );
    }
}
export default NWProductEdit;
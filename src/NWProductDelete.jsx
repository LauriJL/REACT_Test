import React, {Component} from 'react';
import './App.css';

class NWProductDelete extends Component {
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
            Discontinued: ''
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

        this.handlePerformDelete = this.handlePerformDelete.bind(this);
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

    handleChangeDiscontinued(e) {
        var input = e.target.value;
        this.setState({...this.state,Discontinued: input});
    }

    handleSubmit(e){
        //alert('Päivitettävä tuote: ' + this.state.ProductID);
        e.preventDefault();
        this.UpdateDatabase();
    }

    callBackRoutine() {
        console.log('NWProductDELETE: . . . . callBackRoutine >>>---' + this.state.tuoteObj.ProductID);											  
    }

    componentDidMount() {
        console.log("NWProductDELETE-componentDidMount this.props.tuoteObj.productId: " + this.props.tuoteObj.productId);
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
  
    handlePerformDelete(event) {
        console.log('handlePerformDelete >>>>>', this.state.ProductID)
        event.preventDefault();
        this.NWDeleteProdFromRestApi();
        }

    ResetDeleteDone() {
        console.log('ResetDeleteDone ???????????????');
        this.setState({
            ProductID: '', 
        })
        this.handleClickTable();
        this.HaeTuotteetNWRestApista();
    }

    //Delete from database
    NWDeleteProdFromRestApi() {
        let apiUrl = 'https://localhost:5001/northwind/products/delete/'+this.state.ProductID;
        console.log("NWDeleteProdFromRestApi " + apiUrl);
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
                   console.log("Pyyntö tuotteen poistamiseksi tehty -- -- -- -- --");
                   this.dismiss(); 
                   //this.ResetDeleteDone();
                }
            });
    }

    render() {
        return (
            <form className="box1" onSubmit={this.handlePerformDelete}>    
            <table id="deletetbl">  
                <tr><td className="otsikko">Product ID:</td><td>{this.state.ProductID}</td></tr>
                <tr><td className="otsikko">Product Name:</td><td>{this.state.ProductName}</td></tr>
                <tr><td className="otsikko">Category ID:</td><td>{this.state.CategoryID} </td></tr> 
                <tr><td className="otsikko">Quantity per Unit:</td><td>{this.state.QuantityPerUnit} </td></tr>
                <tr><td className="otsikko">Unit Price:</td><td>{this.state.UnitPrice} </td></tr>
                <tr><td className="otsikko">Units in Stock:</td><td>{this.state.UnitsInStock} </td></tr>           
                <tr><td className="otsikko">Units on Order:</td><td>{this.state.UnitsOnOrder} </td></tr>
                <tr><td className="otsikko">Reorder Level:</td><td>{this.state.ReorderLevel} </td></tr>
                <tr><td className="otsikko">Discontinued:</td><td>{this.state.Discontinued.toString()} </td></tr> 
            </table>   
            <br/>
            <button className="button" type="submit">Delete</button>
        </form>
        );
    }
}
export default NWProductDelete;
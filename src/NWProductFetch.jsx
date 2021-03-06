import React, { Component } from 'react';
import './App.css';
import NWProductEdit from './NWProductEdit';
import NWProductAdd from './NWProductAdd';
import NWProductDelete from './NWProductDelete';

class NWProductFetch extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        tuotteet: [],
        recordcount:0 ,
        product: "",
        supplierid: "",
        start: 0,
        take: 10,
        page: 0,
        visible: "table",
        renderChildAdd: true,
        renderChildEdit: true,
        renderChildDelete: true,
        yksiTuote: [],
        removeProduct: [],
        ProductID: ""
    };
    this.handleChangeProductName = this.handleChangeProductName.bind(this);
    this.handleChangeSupplierId = this.handleChangeSupplierId.bind(this);
    this.handleChildUnmountAdd = this.handleChildUnmountAdd.bind(this);
    this.handleChildUnmountEdit = this.handleChildUnmountEdit.bind(this);
    this.handleChildUnmountDelete = this.handleChildUnmountDelete.bind(this);
  }
  
  handleClickPrev = (event) => {
    let pageNumber = this.state.page;
    if (pageNumber > 0){pageNumber = pageNumber-10;}
    this.setState({page: pageNumber}, this.handleSubmit);
  }

  handleClickNext = (event) => {
    this.setState({page: this.state.page+10},this.handleSubmit);
  }

  handleChangeProductName(e){
    let input = e.target.value;
    this.setState({product:input},this.handleSubmit);
  }

  handleChangeSupplierId(e){
    let input = e.target.value;
    this.setState({supplierid:input},this.handleSubmit);
  }

  handleSubmit(){
    this.HaeTuotteetNWRestApista();
  }

  componentDidMount() {
    this.HaeTuotteetNWRestApista();
  }

  handleClickTable = () => {
    this.setState({visible: "table"});
  }

  handleClickHelp = () => {
    this.setState({visible: "help"})
  }

  handleClickAdd = () => {
    this.setState({visible: "addForm", renderChildAdd: true})
  }

  handleChildUnmountAdd(){
    this.setState({renderChild: false});
    this.handleClickTable();
    this.HaeTuotteetNWRestApista();
  }

  handleClickEdit = (tuoteObj, event) => {
    this.setState({
      yksiTuote: tuoteObj,
      visible: "editForm",
      renderChildEdit: true
    })
  }

  handleClickDelete = (tuoteObj, event) => {
    console.log("<<<<<<<<<<<<<handleClickDelete -- -- -- Poistan tuotteen>>>>", tuoteObj); 
    this.setState({
      removeProduct: tuoteObj, 
      visible: "deleteForm", 
      renderChildDelete: true
    })
  }

  handleChildUnmountEdit() {
    this.setState({renderChild: false});
    this.handleClickTable();
    this.HaeTuotteetNWRestApista();
  }

  handleChildUnmountDelete() {
    console.log("Ollaan NWProductFetch -handleChildUnmountDelete-rutiinissa - - - - - - ");
    this.setState({renderChildDelete: false});
    this.handleClickTable();
    this.HaeTuotteetNWRestApista();
  }
 
  HaeTuotteetNWRestApista() {
    let uri = "";
    if (this.state.product !== "") {
      uri = 'https://localhost:5001/northwind/products/r?page=' + this.state.start + '&limit=' + this.state.take + '&name=' + this.state.product;
    } 
    else if (this.state.supplierid !== "") {
      uri = 'https://localhost:5001/northwind/products/r?page=' + this.state.start + '&limit=' + this.state.take + '&supplierid=' + this.state.supplierid;
    }
    else {
      uri = 'https://localhost:5001/northwind/products/r?page=' + this.state.page + '&limit=' + this.state.take;
    }
    fetch(uri)
    .then(response => response.json())
    .then(json => {
        this.setState({ tuotteet: json, recordcount: json.length }); 
    });
  }

  render() {
    let viesti = "";
    let taulukko = [];
    let tHeaders = "";
    if (this.state.tuotteet.length > 0) {
        //Luodaan taulukon otsikot
        tHeaders = <tr><th>Product ID</th><th>Product Name</th><th>Supplier ID</th><th>Category ID</th><th>Quantity per Unit</th>
        <th>Unit Price</th><th>Units in Stock</th><th>Units on Order</th><th>Reorder Level</th><th>Discontinued</th><th>Edit</th><th>Delete</th></tr>
        for (let index = 0; index < this.state.tuotteet.length; index++) {
            const element = this.state.tuotteet[index];
            taulukko.push(<tr key={element.productId}>
            <td>{element.productId}</td>
            <td>{element.productName}</td>
            <td>{element.supplierId}</td>
            <td>{element.categoryId}</td>
            <td>{element.quantityPerUnit}</td>
            <td>{element.unitPrice}</td>
            <td>{element.unitsInStock}</td>
            <td>{element.unitsOnOrder}</td>
            <td>{element.reorderLevel}</td>
            <td>{element.discontinued.toString()}</td>
            <td><button onClick={this.handleClickEdit.bind(this, element)} className="buttonEdit">Edit</button></td>
            <td><button onClick={this.handleClickDelete.bind(this, element)} className="buttonDelete">Delete</button></td>
            </tr>);
      }
    }
    else {
      viesti = "Retrieving data from database..."
    }
    if (this.state.visible === "table"){
      return(
        <div className='maindiv'>
          <h2 >Products</h2>
          <br/>
          <p className='text'>Search by product name: <input type="text" placeholder="Enter product name" title="Find product" value={this.state.product} onChange={this.handleChangeProductName}/></p>
          <p className='text'>Filter by supplier ID: <input type="text" placeholder="Enter supplier ID" title="Find supplier" value={this.state.supplierid} onChange={this.handleChangeSupplierId}/></p>
          <br/>
          <button className="buttonAdd" onClick={this.handleClickAdd}>Add New Product</button>
          <br/>
          <button className="button" onClick={this.handleClickPrev}>&#8592; Previous</button>
          <button className="button" onClick={this.handleClickNext}>Next &#8594;</button>
          <br/>
          <table className="table table-dark">
            <thead className="thead">{tHeaders}</thead>
            <tbody>{taulukko}</tbody>
          </table>
        </div>
      );
    }
    else if (this.state.visible === "addForm") {
      return (
        <div className='maindiv'>         
          <h2>Add New Product</h2>
          <div>
            <button className="button" onClick={this.handleClickTable}>Back to Products</button>
            <button className="button" onClick={this.handleClickHelp}>Help</button>
          </div>
          {this.state.renderChildAdd ? <NWProductAdd unmountMe={this.handleChildUnmountAdd} /> : null}
        </div>
      );
    } 
    else if (this.state.visible === "editForm") {
      return (
        <div className='maindiv'>
          <h2>Edit Product Data</h2>
          <div>
            <button className="button" onClick={this.handleClickTable}>Back to Products</button>
            <button className="button" onClick={this.handleClickHelp}>Help</button>
          </div>
          {this.state.renderChildEdit ? <NWProductEdit tuoteObj={this.state.yksiTuote} unmountMe={this.handleChildUnmountEdit} /> : null}
        </div>
      );
    }
    else if (this.state.visible === "deleteForm") {
      return (
        <div className='maindiv'>
          <h2>Delete Product</h2>
          <div>
            <button className="button" onClick={this.handleClickTable}>Back to Products</button>
            <button className="button" onClick={this.handleClickHelp}>Help</button>
          </div>
          {this.state.renderChildDelete ? <NWProductDelete tuoteObj={this.state.removeProduct} unmountMe={this.handleChildUnmountDelete} /> : null}
        </div>
      );
    }
    else if (this.state.visible === "help") {
      return (
        <div className="help">
          <h2 className='h2'>Products</h2>
          <p className='text' style={{marginLeft:'10px'}}>Browse, add, modify and delete products by using the appropriate buttons.</p>
          <button class="button" onClick={this.handleClickTable} style={{marginLeft:'10px'}}>Back to Products</button>
        </div>
      );      
    }
    else {
      return(
        <div>
        <h1>Application error! Reload page.</h1>
      </div>
      );
    }
  }
}
export default NWProductFetch;


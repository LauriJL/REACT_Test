import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import AnalogWatch from './AnalogWatch';
import NWCustomerFetch from './NWCustomerFetch';
import NWProductFetch from './NWProductFetch';
import NWUsersFetch from './NWUsersFetch';
import Login from './Login';

class Navigaatio extends Component {
  render() {
    return (
        <Router>
            <div>
              <br/>
              <h1 className='h1'>Northwind React Application 2020</h1>
              <p className='text' style={{marginLeft:'10px'}}>Welcome to the Northwind management application, where you can browse Northwind customers, products and users.</p> 
              <p className='text' style={{marginLeft:'10px'}}>Please note that the Users section is restricted: to view and edit user data you need to log in first.</p>
              <br/>
              <h4 className='h4'><Login /></h4>
              <nav className="navbar navbar-expand-lg navbar-light bg-light" >
              <ul className="navbar-nav mr-auto" >
                <li><Link to={'/'} className="navlink">Home</Link></li>
                <li><Link to={'/NWCustomerFetch'} className="navlink">Customers</Link></li>
                <li><Link to={'/NWProductFetch'} className="navlink">Products</Link></li>
                <li><Link to={'/NWUsersFetch'} className="navlink">Users</Link></li>
              </ul>
              </nav>
              <Switch>
                  <Route exact path='/' component={AnalogWatch} />
                  <Route path='/NWCustomerFetch' component={NWCustomerFetch} />
                  <Route path='/NWProductFetch' component={NWProductFetch} />
                  <Route path='/NWUsersFetch' component={NWUsersFetch}/>
              </Switch>
            </div>
          </Router>
        );
  }
}

export default Navigaatio;

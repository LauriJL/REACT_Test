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
              <br/>
              <h4 className='h4'><Login /></h4>
              <nav className="navbar navbar-expand-lg navbar-light bg-light" >
              <ul className="navbar-nav mr-auto" >
                <li><Link to={'/'} className="navlink">Home</Link></li>
                <li><Link to={'/NWCustomerFetch'} className="navlink">Customers</Link></li>
                <li><Link to={'/NWProductFetch'} className="navlink">Products</Link></li>
                <li><Link to={'/NWUsersFetch'} className="navlink">Users</Link></li>
                {/* <li><Link to={'/Helpit'} className="nav-link">Help</Link></li> */}
              </ul>
              </nav>
              <Switch>
                  <Route exact path='/' component={AnalogWatch} />
                  <Route path='/NWCustomerFetch' component={NWCustomerFetch} />
                  <Route path='/NWProductFetch' component={NWProductFetch} />
                  <Route path='/NWUsersFetch' component={NWUsersFetch}/>
                  {/* <Route path='/Helpit' component={Helpit}/> */}
              </Switch>
            </div>
          </Router>
        );
  }
}

export default Navigaatio;

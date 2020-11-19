import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
              <h1 style={{ marginLeft:'2%'}}>Northwind React Application 2020</h1>
              <h4 style={{ marginLeft:'2%'}}><Login /></h4>
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li><Link to={'/'} className="nav-link">Home</Link></li>
                <li><Link to={'/NWCustomerFetch'} className="nav-link">Customers</Link></li>
                <li><Link to={'/NWProductFetch'} className="nav-link">Products</Link></li>
                <li><Link to={'/NWUsersFetch'} className="nav-link">Users</Link></li>
                {/* <li><Link to={'/Helpit'} className="nav-link">Help</Link></li> */}
              </ul>
              </nav>
              <hr />
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

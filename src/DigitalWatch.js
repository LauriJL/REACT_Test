import React, {Component} from 'react';
import './App.css';
import Helpit from './Helpit';

class Kello extends Component {
    render() {
      return (
        <h4>Kello on nyt: {this.props.kellonaika}</h4>
      );
    }
  }
  

class DigitalWatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick() {
        this.setState({
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
        });
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    render() {
        return (
            <div className="digitaalikello">
                {/* <p>Kellonaika: {this.state.time} </p> */}
                {/* <p>Päivämäärä: {this.state.date} </p> */}
                <Helpit moduli="DigitalWatch" />
                <Kello kellonaika={this.state.time} />
            </div>
    );
  }
}

export default DigitalWatch;

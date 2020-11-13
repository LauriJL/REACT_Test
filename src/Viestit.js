import React, {Component} from 'react';
import './App.css';
import DigitalWatch from './DigitalWatch';
import Helpit from './Helpit';
// import Md5salaus from './Md5salaus';

class Viesti extends Component {
    render() {
        return(
            <p>
                Tässä on oma vakioviesti
            </p>            
        );
    }
}

class ViestiPrp extends Component {
    render() {
        //console.log(this.props.autonMalli);
        return(
            <>
                <p>{this.props.kukkaruukku}</p>
                <p>{this.props.viesti}</p>            
            </>
        );
        
    }
}

class Viestit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showhelp: "hide"
        };
    }

    handleClickHelp = (event) => {
        let status = this.state.showhelp;
        if (status === "show") 
        {
            status="hide"
        } else {
            status="show"
        }
        this.setState({
            showhelp: status
        })
    }
  
    render() {
        //console.log(this.state.showhelp);
        if (this.state.showhelp==="show") {
            return (
                <div>
                    <Helpit moduli="viestit"/>
                    <button onClick={this.handleClickHelp}>Piilota opaste</button>
                </div>)
        } else {
            return (
                <div>
                    <div className="Viestit">
                        <header className="Viestit-header">
                            <h3>Viestit-sovellusikkuna</h3>
                        </header>
                    </div>
                    <div>
                        <p>Tässä alapuolella luetellaan viestejä</p>
                        <button onClick={this.handleClickHelp}>Näytä opaste</button>
                        {/* <Md5salaus salattava="pas123!" /> */}
                        <Viesti />
                        <ViestiPrp viesti="Viesti nro 1" kukkaruukku="Belargonia" autonMalli="V90"/>
                        <DigitalWatch />
                    </div>     
                </div>
            );
        }
    }
}

export default Viestit;

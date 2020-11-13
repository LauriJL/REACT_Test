import React, {Component} from 'react';
import './App.css';
class Helpit extends Component {
    render() {
        if (this.props.moduli==="viestit") {
            return(
                <div>
                    <p>Minäpä kerron miten Viestit-ohjelmaa käytetään...</p>  
                </div>         
            );
        } else if (this.props.moduli==="AnalogWatch") {
            return(
                <div>
                    <p>Minäpä kerron miten AnalogWatch-ohjelmaa käytetään...</p>  
                </div>          
            );
        } else if (this.props.moduli==="NWCustomerFetch") {
            return(
                <div>
                    <p>Voit hakea asiakkaita ja lisätä sekä muokata näiden tietoja.</p>  
                </div>          
            );
        } else {
            return(
                <div>
                    <p>Helppiä ei löydy</p>  
                </div>          
            );
        }
    }
}
export default Helpit;

import React, { Component } from 'react';
import './App.css';
import Request from 'react-http-request';

class Md5salaus extends Component {
    render(){
        let url = 'http://md5.jsontest.com/?text=' + this.props.salattava;
        return(
            <Request url={url} method='get' accept='Application/json' verbose={true}>
                {
                    ({error,result,loading}) => {
                        if (loading){
                            return <div>Loading...</div>
                        } else if (error){
                            return <div><p>Virhe!</p></div>
                        } else{
                            return <div>{result.body.md5}</div>
                        }
                    }
                }
            </Request>
        );
    }
}
export default Md5salaus;
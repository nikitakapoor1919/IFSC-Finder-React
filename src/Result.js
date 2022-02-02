import React, { Component } from 'react';
import './App.css';

export class Result extends Component {

  render() {
        const {
          IFSC,BANK,ADDRESS,DISTRICT,STATE,CONTACT,BRANCH
        } = this.props.result;
        if(Object.keys(this.props.result).length === 0){
            return((()=>this.props.errorCallback(true))());
        }
    else{
        return (<div>
          <div className="navbar"></div>
            <div className="container" >
              <h2 id="bank-name-display">IFSC CODE FOR {BANK}</h2>
              <h3 id="state-district-display">{STATE } - { DISTRICT}</h3>
              <table className="table-content">
                  <tbody>
                      <tr>
                          <td style={{width:"20%"}}>
                              <p><strong>IFSC</strong></p>
                          </td>
                          <td>
                              <p id="ifsc">{IFSC}</p>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <strong>BANK</strong>
                          </td>
                          <td>
                              <p id="bank-name">{BANK}</p>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <strong>ADDRESS</strong>
                          </td>
                          <td>
                              <p id="address">{ADDRESS}</p>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <strong>DISTRICT</strong>
                          </td>
                          <td>
                              <p id="district-name">{DISTRICT}</p>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <strong>STATE</strong>
                          </td>
                          <td>
                              <p id="state-name">{STATE}</p>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <strong>BRANCH</strong>
                          </td>
                          <td>
                              <p id="branch-name">{BRANCH}</p>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <strong>PHONE</strong>
                          </td>
                          <td>
                              <p id="phone">{CONTACT}</p>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <button id="back" onClick={(e)=>this.props.parentCallback(false)}>Back</button>
          </div>
        </div>);
    }
  }

}

export default Result;

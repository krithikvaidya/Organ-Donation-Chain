import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {Navigation} from './Navbar';
import ParticleComponent from './ParticleComponent';

class Homepage extends Component{
    render() {
      return (
        <div>
          <div className="Nav">
            <Navigation/>
             
          </div>
        <div>
        <div 
        style={{
          position: "absolute",
          top: '40%',
          left: '30%',
          color: '#ccc',
          fontFamily: "Arial Black",
        }}
        >
        <h1>Blockchain based Secure Organ Donation</h1>
        </div>
      
        <div  style={{
          position: "absolute",
          top: "50%",
          left: "5%",
          color: '#ccc',
          fontFamily: "Palatino",
          textAlign: "center",
          textDecorationStyle : "wavy"
          
        }} >
       <div className="text">
       <h3 > 
            An open, transparent approach to the problem of ensuring fair organ donation. Uses
            a permissioned blockchain system, where hospitals are the only ones authorized to
            add donors and recipients, and perform organ transfers. All the activity is immutably
            recorded on the ledger and can be viewed by any member of the general public.
         </h3>
       </div>
         </div>
         </div>
        </div>

      )
    }
}

export default Homepage;
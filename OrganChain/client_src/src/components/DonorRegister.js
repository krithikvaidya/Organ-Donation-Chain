import React, {Component} from 'react';
import axios from 'axios';
import HospitalList from './HospitalList';
import {Navigation} from './Navbar';

class DonorRegister extends Component{

    constructor(props) {
        super(props);
        this.state = {
            "organName": {
                'EYE': false,
                'KIDNEY': false,
                'HEART': false,
                'LUNGS': false,
                'TISSUE': false
            },
            hospitals: []
        }
    }

    componentWillMount(){
        this.getHospitals();
    }

    generateRandomString() {
        return "     ".replaceAll(" ",()=>"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.random()*62)) + "@email.com";
    }
    
    getHospitals(){
        axios.get('http://localhost:3000/api/Hospital')
          .then(response => {
            this.setState({hospitals: response.data}, () => {
              //console.log(this.state);
            })
        })
        .catch(err => console.log(err));
      }

    addDonorOrgan(newDonorOrgan, newUser) {
        axios.request({
            method:'post',
            url:'http://localhost:3000/api/donorOrganRegister',
            data: newDonorOrgan
          }).then(response => {
              console.log("Response is: ");
              console.log(response);
            axios.request({
                method:'post',
                url:'http://localhost:3000/api/Users',
                data: newUser
              }).then(response => {
                 this.props.history.push('/hospital/organTestedReport');
              }).catch(err => console.log(err));
          }).catch(err => console.log(err));
    }

    addUser(newUser) {
        
    }

    onSubmit(e){
        var JSONObject = this.state.organName;
        const selectedOrgan = Object.keys(JSONObject);
        const arr=[];
        var i=0;
    
        Object.values(JSONObject).forEach(function(value) {
            if(value===true){
                arr.push(selectedOrgan[i]);
            }
            ++i;
        });

        const newDonorOrgan = {
            "$class": "org.organ.net.donorOrganRegister",
            donorId: "DONOR"+this.refs.donor_id.value,
            name: arr[0],
            hospital:this.refs.hospital.value
        }

        const newUser = {
            username: "DONOR"+this.refs.donor_id.value,
            email: this.generateRandomString(),
            password: this.refs.password.value
        }

        localStorage.setItem("organ", arr[0]); 
        localStorage.ptspotter_donorId = "DONOR" + this.refs.donor_id.value;

        this.addDonorOrgan(newDonorOrgan, newUser);
        this.addUser(newUser);        
        e.preventDefault();
    }

    onOrganChange(e) {
        const val = e.target.checked;
        const name = e.target.name;
        let updated = Object.assign({},this.state.organName, {[name]:val})
        this.setState({
            organName: updated
        })
    }

    render() {
        return (
            
            <div>
            <div className="Nav">
                 <Navigation/>
                </div>
                <div className="register-box">
               
                <div style={{ textAlign: "center" }}>
                    <h1>
                    Donor Registration
                    </h1>
                    <p>
                    Please enter the donor account details:
                    </p>
                </div>

               <form onSubmit={this.onSubmit.bind(this)} action="#">
                   <div className="input-field" >
                       <input type="text" name="donor_id" ref="donor_id"/>
                       <label htmlFor="donor_id">Unique Donor ID</label>
                   </div>
                   <div className="input-field">
                       <input type="password" name="password" ref="password" />
                       <label htmlFor="password">Password</label>
                   </div>
                   <label>
                           <input type="checkbox" name="EYE" 
                           checked={this.state.organName['EYE']}
                           onChange={this.onOrganChange.bind(this)}/>
                           <span>EYE &nbsp;</span>
                       </label><br />
                       <label>
                           <input type="checkbox" name="KIDNEY"
                           onChange={this.onOrganChange.bind(this)}
                           value={this.state.organName['KIDNEY']}/>
                           <span>KIDNEY</span>
                       </label><br />
                       <label>
                           <input type="checkbox" name="HEART" 
                           onChange={this.onOrganChange.bind(this)}
                           value={this.state.organName['HEART']}/>
                           <span>HEART</span>
                       </label><br />
                       <label>
                           <input type="checkbox" name="LUNGS"
                           onChange={this.onOrganChange.bind(this)}
                           value={this.state.organName['LUNGS']}/>
                           <span>LUNGS</span>
                       </label><br />
                       <label>
                           <input type="checkbox" name="TISSUE"
                           onChange={this.onOrganChange.bind(this)}
                           value={this.state.organName['TISSUE']}/>
                           <span>TISSUE</span>
                       </label><br />

                       <div className="input-field">
                        <input type="text" name="hospital" ref="hospital" value={localStorage.ptspotter_hospitalId} disabled/>
                        <label htmlFor="hospital">Hospital ID</label>
                       </div>

                       <br /><input type="submit" value="Register" className="btn" />
               </form>
               
       
           </div>
            </div>
        )
    }
}

export default DonorRegister;
import React, {Component} from 'react';
import axios from 'axios';
import HospitalList from './HospitalList';
import {Navigation} from './Navbar'

class RecipientRegister extends Component{

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

    getHospitals(){
        axios.get('http://localhost:3000/api/Hospital')
          .then(response => {
            this.setState({hospitals: response.data}, () => {
              //console.log(this.state);
            })
        })
        .catch(err => console.log(err));
      }

    addRecipientOrgan(newRecipientOrgan, newUser) {
        axios.request({
            method:'post',
            url:'http://localhost:3000/api/recipientRegister',
            data: newRecipientOrgan
          }).then(response => {

            console.log("response 1 is: ");
            console.log(response);
            axios.request({
                method:'post',
                url:'http://localhost:3000/api/Users',
                data: newUser
              }).then(response => {
                console.log("response 2 is: ");
                console.log(response);
                 this.props.history.push('/hospital/recipientreport');
              }).catch(err => console.log(err));

          }).catch(err => console.log(err));
    }

    generateRandomString() {
        return "     ".replaceAll(" ",()=>"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.random()*62)) + "@email.com";
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

        const newRecipientOrgan = {
            "$class": "org.organ.net.recipientRegister",
            recipientId:"RECIPIENT"+this.refs.recipient_id.value,
            organName: arr[0],
            hospital:this.refs.hospital.value
        }

        const newUser = {
            username: "RECIPIENT"+this.refs.recipient_id.value,
            email: this.generateRandomString(),
            password: this.refs.password.value
        }

        localStorage.setItem("organ", arr[0]); 
        localStorage.ptspotter_recipientId = "RECIPIENT" + this.refs.recipient_id.value;

        
        this.addRecipientOrgan(newRecipientOrgan, newUser);        
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
                    Recipient Registration
                    </h1>
                    <p>
                    Please enter the recipient account details:
                    </p>
                </div>

               <form onSubmit={this.onSubmit.bind(this)} action="#">
                   <div className="input-field">
                       <input type="text" name="recipient_id" ref="recipient_id"/>
                       <label htmlFor="recipient_id">Recipient ID</label>
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
                       <input type="text" name="hospital" ref="hospital" value={localStorage.ptspotter_hospitalId} disabled />
                       <label htmlFor="hospital">Hospital ID</label>
                       </div>

                   
                   <br /><input type="submit" value="Register" className="btn" />
               </form>
               
       
           </div>
            </div>
        )
    }
}

export default RecipientRegister;
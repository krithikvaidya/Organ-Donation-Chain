import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Navigation} from './NavHospital'

class RecipientReport extends Component{

    state = { selectedFile: null }

    fileChangedHandler = event => {
        this.setState({ selectedFile: event.target.value })
      }
    
    updateRecipient(updateRecipient) {
        axios.request({
            method:'post',
            url:'http://localhost:3000/api/recipientReportPrepared?access_token='+localStorage.ptspotter_accessToken,
            data: updateRecipient
          }).then(response => {
            console.log("done");
            this.props.history.push('/recipienthome');
          }).catch(err => console.log(err));
    }

    onSubmit(e){
        const updateRecipient = {
            "$class": "org.organ.net.recipientReportPrepared",
            hash: btoa(this.state.selectedFile),
            url: this.state.selectedFile,
            location: "loc",
            age: parseInt(this.refs.age.value),
            sex: this.refs.sex.value,
            bloodGroup: this.refs.bloodGroup.value,
            dimensions: this.refs.dimensions.value,
            dueDate: this.refs.dueDate.value,
            organName: localStorage.organ,
            got_organ: false,
            recipient: "resource:org.organ.net.Recipient#"+localStorage.ptspotter_recipientId,
        }

         this.updateRecipient(updateRecipient);      
            e.preventDefault();
    }

    render() {
        return (
            <div>
            <div className="Nav"   style={{ marginBottom: "-30px" }}>
               <Navigation/>
               </div>
               <div className="inlogin">
               <div>
                <h1>
                Recipient Report
                </h1>
                <p>
                Please enter recipient's medical and physiological details:
                </p>
            </div>

                <form onSubmit={this.onSubmit.bind(this)} action="#">
                   <div className="input-field">
                       <input type="text" name="age" ref="age" />
                       <label htmlFor="age">Age</label>
                   </div>
                   <div className="input-field">
                       <input type="text" name="bloodGroup" ref="bloodGroup" />
                       <label htmlFor="bloodGroup">Blood Group</label>
                   </div>
                   <div className="input-field">
                       <input type="text" name="sex" ref="sex" />
                       <label htmlFor="sex">Sex</label>
                   </div>
                   <div className="input-field">
                       <input type="text" name="dimensions" ref="dimensions" />
                       <label htmlFor="dimensions">Dimensions</label>
                   </div>
                   <div className="input-field">
                       <input type="text" name="dueDate" ref="dueDate" />
                       <label htmlFor="dueDate">Due Date</label>
                   </div>

                   <div className="input-field">
                      <input type="text" name="image" ref="image" onChange={this.fileChangedHandler.bind(this)} />
                      <label htmlFor="image">Recipient Report URL</label>
                    </div>

                    <br /> <div style={{marginTop: "5px" }}><input type="submit" value="Submit Recipient Report" className="btn" /></div>
                </form>
             </div>
            </div>
        )
    }
}

export default RecipientReport;
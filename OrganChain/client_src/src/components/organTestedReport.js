import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Navigation} from './NavHospital';
import image2base64 from 'image-to-base64';
import OrganList from './OrganList';

class organTestedReport extends Component{

    state = { selectedFile: null, organs: [] }

    fileChangedHandler = event => {
        this.setState({ selectedFile: event.target.value })
      }
    
    componentWillMount() {
      this.getOrgans();
    }

    updateOrgan(updateOrgan) {
      axios.request({
          method:'post',
          url:'http://localhost:3000/api/organTestedReportPrepared?access_token='+localStorage.ptspotter_accessToken,
          data: updateOrgan
        }).then(response => {
          console.log("done");
          this.props.history.push('/showProspectiveRecipients');
        }).catch(err => console.log(err));
  }

    onSubmit(e){

        const updateOrgan = {
            "$class": "org.organ.net.organTestedReportPrepared",
            hash: btoa(this.state.selectedFile),
            url: this.state.selectedFile,
            location: "loc",
            age: parseInt(this.refs.age.value),
            sex: this.refs.sex.value,
            bloodGroup: this.refs.bloodGroup.value,
            dimensions: this.refs.dimensions.value,
            transferred_organ: false,
            organ: "resource:org.organ.net.Organ#"+this.state.organs[0].organId,
            donor: "resource:org.organ.net.Donor#"+localStorage.ptspotter_donorId
        }

        localStorage.setItem("organId", this.state.organs[0].organId);

        console.log(this.state.organs[0])

        this.updateOrgan(updateOrgan);  
       // this.getOrgan();     
        e.preventDefault();
    }

    getOrgans(){
      axios.get('http://localhost:3000/api/Organ?access+token='+localStorage.ptspotter_accessToken)
        .then(response => {
          var organList = [];
          console.log("response: ")
          console.log(response)
          organList = response.data.filter((organ) => {
            return organ.donor === "resource:org.organ.net.Donor#" + localStorage.ptspotter_donorId;
          })

          this.setState({organs: organList}, () => {

          })
      })
      .catch(err => console.log(err));
    }



    render() {

        return (
            <div>
            <div className="Nav">
             
             <Navigation/>
            </div>
            <div>
            <div className="Nav">
                    <Navigation/>
            </div>
                      
            
                      
            </div>
            <div className="inlogin">

            <div>
                <h1>
                Donor Report
                </h1>
                <p>
                Please enter donor's medical and physiological details:
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
                      <input type="text" name="image" ref="image" onChange={this.fileChangedHandler.bind(this)} />
                      <label htmlFor="image">Donor Report URL</label>
                    </div>

                    <br /><input type="submit" value="Submit Donor Report" className="btn"/>
                </form>
              </div>
            </div>
        )
    }
}

export default organTestedReport;
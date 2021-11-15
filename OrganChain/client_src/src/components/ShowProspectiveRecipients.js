import React, {Component} from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Navigation} from './NavPatient'

class ShowProspectiveRecipients extends Component{

    state = { recipientReports: [], hospitals: [] }

    constructor() {
      super();
      this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
      this.getRecipientReports();
    }

    createTransferRecord(transferRecord) {
      axios.request({
        method:'post',
        url:'http://localhost:3000/api/Transferred?access_token='+localStorage.ptspotter_accessToken,
        data: transferRecord
      }).then(response => {
        console.log("done!!!!!!! response is: ");
        console.log(response);
        alert("Transfer successfully recorded on the Blockchain");
        this.props.history.push("/patients");
      }).catch(err => console.log(err));
    }

    handleClick(e, index) {
      e.preventDefault();
      console.log("In here" + index);
      let a = this.state.recipientReports[index].recipient;

      console.log("Reason is")
      console.log(this.refs.reason.value)
      
      const transferRecord = {
        "$class": "org.organ.net.Transferred",
        
        candidates: this.state.recipientReports.map((recipient) => {
          return recipient.recipient;
        }),
        Description: this.refs.reason.value,
        donorId: localStorage.ptspotter_donorId,
        recipientId: a.substring(a.indexOf('#') + 1),
        reportRecipientId: this.state.recipientReports[index].reportRecipientId,
        organ: "resource:org.organ.net.Organ#" + localStorage.organId,
      }

      console.log(a.substring(a.indexOf('#') + 1));
      this.createTransferRecord(transferRecord);

    }

    getRecipientReports() {
      let accessToken = localStorage.ptspotter_accessToken;
      axios.get('http://localhost:3000/api/reportRecipient?access_token='+accessToken).then((response) => {
        let recipientsList = [];
        console.log(response)
        recipientsList = response.data.filter((recipient) => {
          return (recipient.organName === localStorage.organ) && (recipient.got_organ === false);
        })
        this.setState({recipientReports: recipientsList}, () => {
          console.log(recipientsList)
        })

        axios.get('http://localhost:3000/api/Hospital')
          .then(response => {
            this.setState({hospitals: response.data}, () => {
              //console.log(this.state);
            })
        })
        .catch(err => console.log(err));

      })
      .catch(err => console.log(err));
    }
      
    render() {

      if (this.state.recipientReports.length === 0) {

        return (
          <>
          <div className="Nav">
            <Navigation/>
          </div>
          <div style={{ textAlign: "center", marginLeft: "400px" }}>
          <Card style={{ width: '18rem', marginTop: '120px'}}>
            <Card.Body>
            <Card.Title>There are no prospective recipients at this time</Card.Title>
            </Card.Body>
            
          </Card>
          </div>
          
          </>
        )

      }

      let i = 0;
      
      const rows = this.state.recipientReports.map((recipientReport) => {

        let hosp_name, hosp_addr;
        for (let hospital of this.state.hospitals) {

          if (recipientReport.hospital.split('#')[1] === hospital.hospitalId) {
            hosp_name = hospital.name;
            hosp_addr = hospital.address;
          }

        }

        const img_url = recipientReport.url;
        i++;
        return (
          <>
          <div className="Nav">
            <Navigation/>
          </div>
          <Card style={{ width: '18rem', marginTop: '120px', float: 'left', marginRight: '60px'}}>
            <Card.Link href={img_url}>
              <Card.Img variant="top" src={img_url} href={img_url} style={{ height: '15rem'}} /> 
            </Card.Link>
            
            <Card.Body>
            <Card.Title>Prospective Recipient {i}</Card.Title>
            <Card.Text>
              <ul>
                <li>
                  Age: {recipientReport.age}
                </li>
                <li>
                  Blood Group: {recipientReport.bloodGroup}
                </li>
                <li>
                  Dimensions: {recipientReport.dimensions}
                </li>
                <li>
                  Due Date: {recipientReport.dueDate}
                </li>
                <li>
                  Sex: {recipientReport.sex}
                </li>
                <li>
                  Hospital Name: {hosp_name}
                </li>
                <li>
                  Hospital Address: {hosp_addr}
                </li>

              </ul>
            </Card.Text>
            <form onSubmit={(e) => {this.handleClick(e, i - 1)}} action="#">
              <div className="input-field">
                  <input type="text" name="reason" ref="reason"/>
                  <label htmlFor="reason">Reason for Choice</label>
              </div>
              <br /><input type="submit" value="Perform Transfer" className="btn btn-primary" />
            </form>
            </Card.Body>
            
          </Card>
          </>
        )
      })
      return rows;
    }
}

export default ShowProspectiveRecipients;
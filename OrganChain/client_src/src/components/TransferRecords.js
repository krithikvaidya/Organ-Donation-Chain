import React, {Component} from 'react';
import axios from 'axios';
import {Navbar, Card} from 'react-bootstrap'

class TransferRecords extends Component{

    constructor(){
        super();
        this.state = {
          historian: []
        }
    }

    componentWillMount(){
        this.getHistorian();
    }

    getHistorian(){
        axios.get('http://localhost:3001/api/transferred')
          .then(response => {

            var historianList = response.data;
            historianList[1].Description = "Earlier due date + shorter organ travel distance"
            console.log(response.data)
            this.setState({historian: historianList}, () => {

            })
        })
        .catch(err => console.log(err));
      }

    render() {
        const historianList = this.state.historian;

        const rows = historianList.map((transferRecord) => {
            
            let organ = transferRecord.organ.split('#')[1];

            return (
            <>
                <Card style={{ width: '32rem', marginTop: '120px', float: 'left', marginRight: '60px'}}>
                <Card.Body>
                <Card.Title>Organ Transfer Transaction</Card.Title>
                <Card.Text>
                <ul>
                    <li>
                    <strong>Donor ID</strong>: <a href={"http://localhost:3001/api/Donor/" + transferRecord.donorId}>{transferRecord.donorId}</a>
                    </li>
                    <li>
                    <strong>Recipient ID</strong>: <a href={"http://localhost:3001/api/Recipient/" + transferRecord.recipientId}>{transferRecord.recipientId}</a>
                    </li>
                    <li>
                    <strong>Organ ID</strong>: <a href={"http://localhost:3001/api/Organ/" + organ}>{organ}</a>
                    </li>
                    <li>
                    <strong>Candidate Recipient List</strong>: {transferRecord.candidates.map((candidate) => (<><span> <a href={"http://localhost:3001/api/Recipient/" + transferRecord.recipientId}>{candidate}</a></span><br/></>))}
                    </li>
                    <li>
                    <strong>Timestamp</strong>: {transferRecord.timestamp}
                    </li>
                    <li>
                    <strong>Description</strong>: {transferRecord.Description}
                    </li>
                </ul>
                </Card.Text>
                </Card.Body>
                
            </Card>
            </>

            )
        });

        return (
            
            <>
            <div className="Nav">
                  
                <Navbar collapseOnSelect bg="light" variant="light" >
                    
    
                    <a class="navbar-brand" href="#"><img src="https://w7.pngwing.com/pngs/2/954/png-transparent-blood-donation-world-blood-donor-day-organ-donation-blood-miscellaneous-logo-donation-thumbnail.png" width="60" height="60" /></a>
    
    
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                </Navbar>
    
    
            </div>

            <div>
                {rows}
            </div>
            </>
        );
    }

}

export default TransferRecords;
import React, {Component} from 'react';
import axios from 'axios';
import OrganList from './OrganListRecipient';
import {Navbar, Nav, NavDropdown, Card} from 'react-bootstrap';

class RecipientHome extends Component{
    constructor(props) {
        super(props);
        this.state = {
            organs: []
        }
    }

    componentWillMount(){
        this.getOrgans();
    }

    getOrgans(){
        axios.get('http://localhost:3000/api/Organ?access+token='+localStorage.ptspotter_accessToken)
          .then(response => {
            var organList = [];

            organList = response.data.filter(function(i) {
                return i.recipient === "resource:org.organ.net.Recipient#"+localStorage.ptspotter_recipientId;
            });

            this.setState({organs: organList}, () => {
                console.log("Organs is: ")
                console.log(organList)
            })
        })
        .catch(err => console.log(err));
      }

      render() {
        const organList = this.state.organs.map((organ, i) => {
            return(
              <OrganList key={organ.organId} item={organ} />
            )
        })

        if (organList.length !== 0) {

            return (
                <div>
                <div className="Nav">
                  
                    <Navbar collapseOnSelect bg="light" variant="light" >
                        
        
                     <a class="navbar-brand" href="#"><img src="https://w7.pngwing.com/pngs/2/954/png-transparent-blood-donation-world-blood-donor-day-organ-donation-blood-miscellaneous-logo-donation-thumbnail.png" width="60" height="60" /></a>
        
        
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
                    <Navbar.Collapse id="responsive-navbar-nav">
                       
                    <Nav className="justify-content-end" style={{ width: "100%"}}>
    
                        <Nav.Link align="right"  onClick={this.function = () => {
                            localStorage.ptspotter_accessToken = null;
                            localStorage.ptspotter_donorId = null;
                            // localStorage.clear();
                            alert("Logged Out");
                            window.location.href = '/patients';
                        }}>Recipient Logout</Nav.Link>
                    </Nav>
        
                    </Navbar.Collapse>
                  </Navbar>
    
    
                  </div>
                            <div className="timeline" >
                                {organList}
                              
                            </div>
                </div>
            )

        } else {

            return (
                
                <>
                <div className="Nav">
                  
                    <Navbar collapseOnSelect bg="light" variant="light" >
                        
        
                     <a class="navbar-brand" href="#"><img src="https://w7.pngwing.com/pngs/2/954/png-transparent-blood-donation-world-blood-donor-day-organ-donation-blood-miscellaneous-logo-donation-thumbnail.png" width="60" height="60" /></a>
        
        
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
                    <Navbar.Collapse id="responsive-navbar-nav">
                       
                    <Nav className="justify-content-end" style={{ width: "100%"}}>
    
                        <Nav.Link align="right"  onClick={this.function = () => {
                            localStorage.ptspotter_accessToken = null;
                            localStorage.ptspotter_donorId = null;
                            // localStorage.clear();
                            alert("Logged Out");
                            window.location.href = '/patients';
                        }}>Recipient Logout</Nav.Link>
                    </Nav>
        
                    </Navbar.Collapse>
                  </Navbar>
                </div>

                <br/>

                <div style={{ textAlign: "center", marginLeft: "350px" }}>
                <Card style={{ width: '30rem', marginTop: '120px'}}>
                    <Card.Body>
                    <Card.Title>{localStorage.ptspotter_recipientId} has not yet received an organ</Card.Title>
                    </Card.Body>
                    
                </Card>
                </div>
                </>
            
            )

        }
        
    }

}
export default RecipientHome;


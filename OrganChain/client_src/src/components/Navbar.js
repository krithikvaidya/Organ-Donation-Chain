import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

export class Navigation extends Component{
    render(){

        if (localStorage.getItem("ptspotter_hospitalId") !== null) {

            return (
                <Navbar collapseOnSelect bg="light"  variant="light" >
                    
    
                 <a class="navbar-brand" href="#"><img src="https://w7.pngwing.com/pngs/2/954/png-transparent-blood-donation-world-blood-donor-day-organ-donation-blood-miscellaneous-logo-donation-thumbnail.png" width="60" height="60" /></a>
    
    
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    
                <Navbar.Collapse id="responsive-navbar-nav">
                   
                <Nav className="justify-content-end" style={{ width: "100%"}}>
                    
                <Nav.Link href="/transferRecords">Transfer Records</Nav.Link>

                     <NavDropdown title="Register" id="collasible-nav-dropdown">
                     <NavDropdown.Item href="/DonorRegister">Donor</NavDropdown.Item>
                     <NavDropdown.Item href="/Recipientregister">Recipient</NavDropdown.Item>
                     </NavDropdown>
    
                    <Nav.Link href="/login"><bold>Login</bold></Nav.Link>
                
                    <Nav.Link align="right"  onClick={this.function = () => {
                        localStorage.clear();
                        alert("Logged Out");
                        window.location.href = '/login';
                    }}>Hospital Logout</Nav.Link>
                </Nav>
    
                </Navbar.Collapse>
              </Navbar>
              
            );

        } else {

            return (
                <Navbar collapseOnSelect bg="light" variant="light" >
                        
        
                    <a class="navbar-brand" href="#"><img src="https://w7.pngwing.com/pngs/2/954/png-transparent-blood-donation-world-blood-donor-day-organ-donation-blood-miscellaneous-logo-donation-thumbnail.png" width="60" height="60" /></a>
        
        
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
                    <Navbar.Collapse id="responsive-navbar-nav">
                    
                    <Nav className="justify-content-end" style={{ width: "100%"}}>
                    <Nav.Link href="/transferRecords">Transfer Records</Nav.Link>
                        <Nav.Link href="/login"><bold>Hospital Login</bold></Nav.Link>
                    </Nav>
        
                    </Navbar.Collapse>
                </Navbar>
            )

        }
        
    }
}
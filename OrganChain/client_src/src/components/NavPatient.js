import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component{
    render(){
        return (
            <Navbar collapseOnSelect bg="light" variant="light" fixed="top">
                 <a class="navbar-brand" href="#"><img src="https://w7.pngwing.com/pngs/2/954/png-transparent-blood-donation-world-blood-donor-day-organ-donation-blood-miscellaneous-logo-donation-thumbnail.png" width="60" height="60" /></a>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="justify-content-end" style={{ width: "100%"}}>
            <Nav.Link href="/transferRecords">Transfer Records</Nav.Link>
            <Nav.Link  onClick={this.function = () => {
                localStorage.ptspotter_accessToken = null;
                localStorage.ptspotter_donorId = null;
                // localStorage.clear();
                alert("Logged Out");
                window.location.href = '/patients';
            }}>Logout</Nav.Link>
            </Nav>

            </Navbar.Collapse>
          </Navbar>
        );
    }
}
import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';


export class Navigation extends Component{
    render(){
        return (
            <Navbar collapseOnSelect bg="light" variant="light" fixed="top">
                 <a class="navbar-brand" href="#"><img src="https://w7.pngwing.com/pngs/2/954/png-transparent-blood-donation-world-blood-donor-day-organ-donation-blood-miscellaneous-logo-donation-thumbnail.png" width="60" height="60" /></a>
               <Navbar.Brand href="/">Home</Navbar.Brand>
            </Navbar>
        );
    }
}
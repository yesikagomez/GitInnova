import React, {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap';

function BarInfo ({nombrecliente}){
        return (
            <Navbar bg="dark" variant="dark" sticky="top" >  
                <Navbar.Brand href="/">RAS</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Navbar.Brand>{nombrecliente}</Navbar.Brand>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        
        )
};
export default BarInfo;
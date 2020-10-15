import React, {Component} from 'react';
import {Nav, Navbar} from 'react-bootstrap';

function BarInfo ({nombrecliente},{correo}){
        return (
            <Navbar bg="dark" variant="dark" sticky="top" >  
                <Navbar.Brand href="/">GitInnova</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link >{nombrecliente}</Nav.Link >
                        <Nav.Link >{correo}</Nav.Link >
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        
        )
};
export default BarInfo;
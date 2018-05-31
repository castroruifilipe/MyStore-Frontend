import React, { Component } from 'react';
import { Navbar, Nav, NavbarBrand, NavbarToggler, NavItem, Collapse, Col, Row, Container} from 'reactstrap';
import { Link } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import './style.css';


class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar className="myNavBar" dark expand="md">
                <NavbarBrand className="ml-5">
                    MyStore
                    {/* <Link /> */}
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Container>
                        <Row>
                            <Col md={{size: 8, offset: 2}}>
                                <SearchBar />
                            </Col>
                            <Col md="2"/>
                        </Row>
                    </Container>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavBar;
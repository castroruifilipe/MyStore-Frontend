import React, { Component } from 'react';
import { Form, Input, FormGroup, Label, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import MdSearch from 'react-icons/lib/md/search';


class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <form className="myNavBar-form pull-left" role="search" method="get" id="searchform" action="http://localhost:8080/test/">
                <div className="input-group">
                    <Form className="form-inline my-2 my-lg-0">
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle dropdownCategorias" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Dropdown button
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </div>
                        <Input className="form-control mr-sm-2 searchBar" type="search" placeholder="Search" aria-label="Search" />
                        <button type="submit" id="searchsubmit" value="Search" className="btn btn-warning searchButton">
                            <span><MdSearch/></span>
                        </button>
                    </Form>
                </div>
            </form>
        );
    }
}

export default SearchBar;
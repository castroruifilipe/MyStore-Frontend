import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';
import MdSearch from 'react-icons/lib/md/search';


class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            categoria: 'Todas',
        };
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    mudarCategoria = (categoria) => {
        this.setState({ categoria })
    }

    render() {
        return (
            <Form className="form-inline my-2 my-lg-0">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle dropdownCategorias" type="button"
                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.categoria}
                    </button>
                    <div className="dropdown-menu dropdownmenuCategorias" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" onClick={(e) => this.mudarCategoria("Alimentação e bebidas", e)}>Alimentação e bebidas</a>
                        <a className="dropdown-item" onClick={(e) => this.mudarCategoria("Beleza", e)}>Beleza</a>
                        <a className="dropdown-item" onClick={(e) => this.mudarCategoria("Livros", e)}>Livros</a>
                    </div>
                </div>
                <Input className="form-control mr-sm-2 searchBar" type="search" placeholder="Search" aria-label="Search" />
                <button type="submit" id="searchsubmit" value="Search" className="btn btn-warning searchButton">
                    <span><MdSearch size="25"/></span>
                </button>
            </Form>
        );
    }
}

export default SearchBar;
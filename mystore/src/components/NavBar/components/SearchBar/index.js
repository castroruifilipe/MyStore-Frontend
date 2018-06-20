import React, { Component } from 'react';
import { Form, Input } from 'reactstrap';
import MdSearch from 'react-icons/lib/md/search';
import { withRouter } from 'react-router-dom';

import * as routes from '../../../../constants/routes';
class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            categoria: 'Todas',
            string: "",
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

    makeCategorias = (rows) => {
        rows.push(<a key={0} className="dropdown-item" onClick={(e) => this.mudarCategoria('Todas', e)}>Todas</a>);
        this.props.categorias.forEach(categoria => {
            rows.push(
                <a key={categoria.id} className="dropdown-item" onClick={(e) => this.mudarCategoria(categoria.descricao, e)}>{categoria.descricao}</a>
            );
        })
    }

    procurar = (event) => {
        let string = this.state.string;
        let categoria = this.state.categoria;
        let link = routes.PROCURA;
        if (string === "") return;
        if (categoria === 'Todas') {
            link += string;
        } else {
            link += categoria + "/" + string
        }
		this.props.history.push(link);
	}


    render() {
        let rows = [];
        this.makeCategorias(rows);
        return (
            <Form className="form-inline my-2 my-lg-0">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle dropdownCategorias" type="button"
                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.categoria}
                    </button>
                    <div className="dropdown-menu dropdownmenuCategorias" aria-labelledby="dropdownMenuButton">
                        {rows}
                    </div>
                </div>
                <Input className="form-control mr-sm-2 searchBar" value={this.state.string} type="search" placeholder="Search"
                    onChange={event => this.setState({ 'string': event.target.value })} aria-label="Search" />
                <button type="submit" id="searchsubmit" value="Search" className="btn btn-warning searchButton"
                    onClick={this.procurar}>
                    <span><MdSearch size="25" /></span>
                </button>
            </Form>
        );
    }
}

export default withRouter(SearchBar);
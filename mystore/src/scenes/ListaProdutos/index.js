import React, { Component } from 'react';
import {
    Container, Row, Card, Button, CardImg, CardTitle, CardText,
    CardSubtitle, CardBody, CardColumns
} from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import * as services from '../../services/produtos';
import InfiniteScroll from 'react-infinite-scroller';
import qwest from 'qwest';
import withRouter from 'react-router-dom/withRouter';

import './style.css';

const api = {
    baseUrl: 'https://api.soundcloud.com',
    client_id: 'caf73ef1e709f839664ab82bef40fa96'
};

class ListaProdutos extends Component {
  constructor(props) {
    super(props);

    this.state = {
        produtos: [],
        existemProdutos: true,
        nrProdutos: 0,
        tamanhoPagina: 10,
        paginaAtual: 1,
        nextHref: null
    };
}

loadItems() {
  var self = this;
  services.getProdutosPorCategoria(this.props.sessionStore.accessToken, this.props.categoria, this.state.paginaAtual, this.state.tamanhoPagina)
    .then(resp => {
          if(resp) {
              var produtos = self.state.produtos;
              resp.collection.map((track) => {
                  if(track.artwork_url == null) {
                      track.artwork_url = track.user.avatar_url;
                  }
                  produtos.push(track);
              });

              if(resp.next_href) {
                  self.setState({
                      produtos: produtos,
                      nextHref: resp.next_href
                  });
              } else {
                  self.setState({
                    existemProdutos: false
                  });
              }
          }
      }).catch((e, xhr, resp) => {
        alert(e)
      });
}

loadItemsTest() {
    var self = this;

    var url = api.baseUrl + '/users/8665091/favorites';
    if(this.state.nextHref) {
        url = this.state.nextHref;
    }

    qwest.get(url, {
            client_id: api.client_id,
            linked_partitioning: 1,
            page_size: 10
        }, {
            cache: true
        }).then(function(xhr, resp) {
            if(resp) {
                var produtos = self.state.produtos;
                resp.collection.map((track) => {
                    if(track.artwork_url == null) {
                        track.artwork_url = track.user.avatar_url;
                    }
                    produtos.push(track);
                });

                if(resp.next_href) {
                    self.setState({
                        produtos: produtos,
                        nextHref: resp.next_href
                    });
                } else {
                    self.setState({
                      existemProdutos: false
                    });
                }
            }
        }).catch((e, xhr, resp) => {
          alert(e)
        });
}
    componentWillMount() {
    }

    render() {
      const loader = <div className="loader">Loading ...</div>;

        var items = [];
        this.state.produtos.map((produto, i) => {
            items.push(
              <Card>
                <CardImg top width="100%" src={produto.artwork_url} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{produto.title}</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>This is a wider card with supporting text below.</CardText>
                    <Button>Button</Button>
                </CardBody>
              </Card>
            );
        });
        return (
            <div>
                <Container fluid className="custom-container">
                    <Row className="mt-5">
                        <h4>Lista de Produtos</h4>
                    </Row>
                    <Row>
                          <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadItemsTest.bind(this)}
                            hasMore={this.state.existemProdutos}
                            loader={loader}>
                            <div>
                              <CardColumns>
                                {items}
                              </CardColumns>
                            </div>
                        </InfiniteScroll>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default compose(
	withRouter,
	inject('sessionStore'),
  observer
)(ListaProdutos);

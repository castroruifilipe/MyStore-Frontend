import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import {
    Container, Row, Card, Button, CardImg, CardTitle, CardText,
    CardSubtitle, CardBody, CardDeck
} from 'reactstrap';
 // eslint-disable-next-line
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

class Home extends Component {

    render() {
        return (
            <div>
                <Carousel transitionTime={1000} emulateTouch useKeyboardArrows infiniteLoop autoPlay showThumbs={false} showStatus={false}>
                    <img src="https://images-na.ssl-images-amazon.com/images/G/32/kindle/email/2018w22/RecomendadoLeitores/desktophero3000x600._CB478047443_.jpg" alt="Imagem" />
                    <img src="https://images-na.ssl-images-amazon.com/images/G/32/HomeandKitchen/2018/esp_decoracao/desktophero3000x600._CB495950061_.jpg" alt="Imagem" />
                    <img src="https://images-na.ssl-images-amazon.com/images/G/32/br-events/2018/diadosnamorados/gw/desktophero3000x600._CB477519975_.jpg" alt="Imagem" />
                </Carousel>
                <Container fluid className="custom-container">
                    <Row className="mt-5">
                        <h4>Novidades</h4>
                    </Row>
                    <Row>
                        <CardDeck>
                            <Card>
                                <CardImg top width="100%" src="https://i.imgur.com/IpEsYSH.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardImg top width="100%" src="https://i.imgur.com/t7DTziH.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardImg top width="100%" src="https://i.imgur.com/IpEsYSH.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardImg top width="100%" src="https://i.imgur.com/t7DTziH.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card><Card>
                                <CardImg top width="100%" src="https://i.imgur.com/IpEsYSH.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </Row>

                    <Row className="mt-5">
                        <h4>Mais vendidos</h4>
                    </Row>
                    <Row>
                        <CardDeck>
                            <Card>
                                <CardImg top width="100%" src="https://i.imgur.com/IpEsYSH.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardImg top width="100%" src="https://i.imgur.com/t7DTziH.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardImg top width="100%" src="https://i.imgur.com/IpEsYSH.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardImg top width="100%" src="https://i.imgur.com/t7DTziH.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card><Card>
                                <CardImg top width="100%" src="https://i.imgur.com/IpEsYSH.jpg" alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                        </CardDeck>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default (Home);
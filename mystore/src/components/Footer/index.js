import React, { Component } from 'react';


class Footer extends Component {

    render() {
        return (

            <footer className="page-footer font-small mdb-color pt-4 mt-4 text-white" style={{ backgroundColor: "#232f3e" }}>


                <div className="container text-center text-md-left ">

                    <div className="row d-flex align-items-center">
                        <div className="col-md-8 col-lg-8">
                            <h6 className="text-uppercase mb-4 font-weight-bold" >MyStore</h6>
                        </div>
                    </div>

                    <div className="row text-center text-md-left pb-3">


                        <div className="col-md-4 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Informações</h6>
                            <p><a href="#!">Métodos de pagamento</a></p>
                            <p><a href="#!">Envio de Encomendas e Portes</a></p>
                            <p><a href="#!">Ajuda</a></p>
                        </div>


                        <hr className="w-100 clearfix d-md-none" />


                        <div className="col-md-4 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Privacidade</h6>
                            <p><a href="#!">Termos de Uso</a></p>
                            <p><a href="#!">Politica de Privacidade</a></p>
                        </div>


                        <hr className="w-100 clearfix d-md-none" />

                        <div className="col-md-4 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">Contactos</h6>
                            <p><i className="fa fa-home mr-3"></i> Rua da Universidade, Braga</p>
                            <p><i className="fa fa-envelope mr-3"></i> mystore@email.com</p>
                            <p><i className="fa fa-phone mr-3"></i> + 912 345 678</p>
                        </div>

                    </div>

                    <hr />

                    <div className="row d-flex align-items-center">
                        <div className="col-md-8 col-lg-8">
                            <p className="text-center text-md-left">© 2018 Copyright: EA.com</p>
                        </div>
                    </div>


                </div>


            </footer>


        );
    }
}

export default Footer;

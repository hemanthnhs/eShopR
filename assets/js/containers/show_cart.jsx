import React from 'react';
import {Redirect} from 'react-router';
import {list_categories, get_product, list_cart_items, add_to_cart} from '../api/ajax';
import {connect} from 'react-redux';
import {Carousel, Row, Col, Container, Button, Form, Box, Table} from 'react-bootstrap';
import {submit_login} from '../api/ajax';
import {Link} from "react-router-dom";

function state2props(state, props) {
    let id = parseInt(props.id);

    return {id: props.id, cart: state.cart};
}

class ShowCart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }

        list_cart_items()

    }

    redirect(path) {
        this.setState({redirect: path});
    }

    renderCartItems(cart) {
        let renderElements = []
        console.log(cart)
        cart.forEach(function (val, key) {
            //renderElements.push(<div>{val.product_name} - {val.option_selected}</div>)
            renderElements.push(<div className= "display-cart-border"><Row><img
                height={300} width={225}
                src={val.images[Object.keys(val.images)[0]]}/>
                <span className="offset-1">
                <div className="product-name">{val.product_name} </div>
                    <div className="font-italic"><h5>brand: {val.brand}</h5></div>
                    <div><h5>Price: ${val.selling_price}</h5></div>
                    <div><h5>Size Selected: ${val.option_selected}</h5></div>
                </span>
            </Row></div>)
        })
        return renderElements
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }


        let {id, cart, dispatch} = this.props

        if (!cart) {
            return (<div>Getting Cart Details</div>)
        } else {
            return (<div>
                <Row className="offset-2 display-cart-border">

                    <Col md={8} className="headings-display"><Form.Label>Your Cart</Form.Label></Col>
                    <Col md={4} className="headings-display"><Form.Label>Price</Form.Label></Col>

                </Row>
                <div className="offset-2">{this.renderCartItems(cart)}</div>
                <Row className="offset-7 headings-display"> <Form.Label>Subtotal: $</Form.Label></Row>

            </div>)
        }
    }
}

export default connect(state2props)(ShowCart);
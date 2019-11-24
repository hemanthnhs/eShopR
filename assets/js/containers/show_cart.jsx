import React from 'react';
import {Redirect} from 'react-router';
import {list_categories, get_product, list_cart_items, place_order} from '../api/ajax';
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
        cart.forEach(function (val, key) {
            renderElements.push(<tr className= "display-cart-border"><td><Row><img
                height={200} width={150}
                src={val.images[Object.keys(val.images)[0]]}/>
                <span className="offset-1">
                <div className="product-name">{val.product_name} </div>
                    <div className="font-italic"><h5>Brand: {val.brand}</h5></div>
                    <div><h5>Option Selected: {val.option_selected}</h5></div>
                </span>
            </Row>
            </td>
                <td>${val.selling_price}</td>
            </tr>)
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
            return (<Table className={"offset-1 cart-container"}>
                <thead className="display-cart-border">
                    <tr>
                        <th md={10} className="headings-display">Your Cart</th>
                        <th md={2} className="headings-display">Price</th>
                    </tr>
                </thead>
                <tbody>{this.renderCartItems(cart)}
                <tr><td></td><td><h5>Subtotal: $</h5></td></tr>
                <tr><td></td><td><Button className={"place-order"} onClick={() => place_order()}>PLACE ORDER</Button></td></tr>
                </tbody>
            </Table>)
        }
    }
}

export default connect(state2props)(ShowCart);
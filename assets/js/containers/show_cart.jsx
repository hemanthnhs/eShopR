import React from 'react';
import {Redirect} from 'react-router';
import {update_quantity, delete_item, list_cart_items, place_order, list_products} from '../api/ajax';
import {connect} from 'react-redux';
import {Alert, Row, Container, Button, Table, Spinner} from 'react-bootstrap';
import store from "../store";

function state2props(state, props) {
    let id = parseInt(props.id);
    return {id: props.id, type: state.session ? state.session.type : null, cart: state.cart, total: state.forms.cart_total, errors: state.forms.cart_errors};
}

class ShowCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
        }

        if (props.type!=null) {
            list_cart_items()
        }
    }

    componentWillUnmount() {
        store.dispatch({
            type: 'CART_ERRORS',
            data: null,
        });
    }

    redirect(path) {
        this.setState({redirect: path});
    }

    renderCartItems(cart, id) {
        let renderElements = []
        cart.forEach(function (val, key) {
            renderElements.push(<tr className="display-cart-border">
                <td><Row><img
                    height={200} width={150}
                    src={val.images[Object.keys(val.images)[0]]}/>
                    <span className="offset-1">
                <div className="product-name">{val.product_name} </div>
                    <div className="font-italic"><h5>Brand: {val.brand}</h5></div>
                    <div><h5>Option Selected: {val.option_selected}</h5></div>
                </span>
                </Row>
                </td>
                {val.product_quantity[val.option_selected] > 0 ?
                    <td>
                    {val.quantity}
                    <Button variant={"btn btn-qty"} onClick={() => {
                        update_quantity(val.id, id, val.product_id, val.option_selected, val.quantity + 1)
                    }}>+</Button>
                    <Button variant={"btn btn-qty"} onClick={() => {
                        update_quantity(val.id, id, val.product_id, val.option_selected, val.quantity - 1)
                    }}>-</Button>
                </td>
                    : <td>Out of stock</td>}
                <td><img src={require("./../../static/images/clear_cart.svg")} onClick={() => {
                    delete_item(val.id, key)
                }}/></td>
                <td>${val.selling_price}</td>
            </tr>)
        })
        return renderElements
    }

    renderErrorList(items){
        let errors = []
        _.each(items, function(item){
            errors.push(<p>{item}</p>)
        })
        return errors
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {id, type, cart, total, errors, dispatch} = this.props
        if (type == null){
            return <Redirect to={"/"}/>;
        }
        if (!cart) {
            return (<div className={"loading"}>
                <Spinner animation="grow" role="status" size="md"/>
                Fetching your items....!!!
            </div>)
        } else {
            if(cart.size == 0){
                return (<Container className={"empty-cart"}> No items added to cart.. </Container>)
            }
            return (
                <Container>
                { errors ? <Alert variant="danger">
                        <p>{errors.error}</p>
                        <hr />
                        {this.renderErrorList(errors.items)}
                    </Alert>
                    : null}
                <Table>
                <thead className="display-cart-border">
                <tr>
                    <th md={8} className="sub-headings-display">Your Cart</th>
                    <th md={1}></th>
                    <th md={1}></th>
                    <th md={2} className="sub-headings-display">Price</th>
                </tr>
                </thead>
                <tbody>{this.renderCartItems(cart, id)}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><h5>Cart Value: ${total}</h5></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><Button className={"place-order"} onClick={() => this.setState({redirect: "/checkout"})}>Proceed to Checkout</Button></td>
                </tr>
                </tbody>
            </Table>
                </Container>)
        }
    }
}

export default connect(state2props)(ShowCart);
import React from 'react';
import {Redirect} from 'react-router';
import {list_categories, update_quantity, delete_item, list_cart_items, place_order, list_products} from '../api/ajax';
import {connect} from 'react-redux';
import {Alert, Row, Col, Container, Button, Form, Box, Table, Spinner} from 'react-bootstrap';
import {submit_login} from '../api/ajax';
import {Link} from "react-router-dom";

function state2props(state, props) {
    let id = parseInt(props.id);

    return {id: props.id, cart: state.cart, total: state.forms.cart_total};
}

class ShowCart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            errors: null
        }

        list_cart_items()
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
                <td>
                    {val.quantity}
                    <Button variant={"btn btn-qty"} onClick={() => {
                        update_quantity(val.id, id, val.product_id, val.option_selected, val.quantity + 1)
                    }}>+</Button>
                    <Button variant={"btn btn-qty"} onClick={() => {
                        update_quantity(val.id, id, val.product_id, val.option_selected, val.quantity - 1)
                    }}>-</Button>
                </td>
                <td><img src={require("./../../static/images/clear_cart.svg")} onClick={() => {
                    delete_item(val.id, key)
                }}/></td>
                <td>${val.sellinlg_price}</td>
            </tr>)
        })
        return renderElements
    }

    place_order(){
        var that = this
        var promise1 = new Promise(function(resolve, reject) {
            place_order(resolve,reject)
        })

        promise1.then( function(result){
            console.log('Fulfilled')
        }).catch( function(error) {
            that.setState({errors: error})
        })

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

//<td><Button className={"place-order"} onClick={() => place_order()}>Move to Checkout</Button></td>
        let {id, cart, total, dispatch} = this.props
        if (!cart) {
            return (<div className={"loading"}>
                <Spinner animation="grow" role="status" size="md"/>
                Fetching your items....!!!
            </div>)
        } else {
            if(cart.size == 0){
                return (<Container className={"empty-cart"}> No items added to cart.. </Container>)
            }
            return (<Container>
                { this.state.errors ? <Alert variant="danger">
                        <p>{this.state.errors.error}</p>
                        <hr />
                        {this.renderErrorList(this.state.errors.items)}
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
                    <td><Button className={"place-order"} onClick={() => this.setState({redirect: "/checkout"})}>Move to Checkout</Button></td>
                </tr>
                </tbody>
            </Table></Container>)
        }
    }
}

export default connect(state2props)(ShowCart);
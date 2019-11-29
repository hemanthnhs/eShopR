import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Card, Row, Col, Container, Button, Form, Table, Spinner, Badge} from 'react-bootstrap';
import {delete_item, list_address, list_cart_items, place_order, update_quantity} from '../api/ajax';
import {NavLink} from "react-router-dom";
import store from "../store";

function state2props(state, props) {
    return {address: state.forms.address, cart: state.cart, total: state.forms.cart_total};
}

class ProcessCheckout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            option_selected: 0,
        }

        list_address();
        list_cart_items()

    }

    redirect(path) {
        this.setState({redirect: path});
    }

    place_order(address_selected){
        var that = this
        var promise1 = new Promise(function(resolve, reject) {
            place_order(resolve,reject, address_selected)
        })

        promise1.then( function(result){
            console.log('Fulfilled')
        }).catch( function(errors) {
            store.dispatch({
                type: 'CART_ERRORS',
                data: errors,
            });
            that.setState({redirect: "/viewCart"})
        })

    }


    renderCartItems(cart) {
        let renderElements = []
        cart.forEach(function (val, key) {
            renderElements.push(
                <Row>
                    <Col md={6}>
                        {val.quantity} x {val.product_name}&nbsp;&nbsp;<Badge pill
                                                                              variant="secondary">{val.brand}</Badge>&nbsp;&nbsp;
                        <Badge pill variant="info">{val.option_selected}</Badge>
                        &nbsp;&nbsp;&nbsp;
                    </Col>
                    <Col md={3}>
                        ${val.quantity * val.selling_price}
                    </Col>
                </Row>
            )
        })
        return renderElements
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} errors={this.state.errors}/>;
        }

        let {address, cart, total, dispatch} = this.props
        let address_rows = []
        if (!cart) {
            return (<div className={"loading"}>
                <Spinner animation="grow" role="status" size="md"/>
                Fetching your items....!!!
            </div>)
        } else {
            if (cart.size == 0) {
                return (<Container className={"empty-cart"}> No items added to cart.. </Container>)
            } else {
                if (!address) {
                    address_rows.push(<Link to={"/addAddress"}><div className="display-add-address">No address
                        updated
                        click to update +</div></Link>)
                } else {
                    var that = this;
                    _.forEach(address, function (val, key) {
                        let eachAdress = val.full_name + " " + val.street
                        address_rows.push(<fieldset><Form.Group><Form.Check type="radio" label={eachAdress}
                                                                            name="formHorizontalRadios"
                                                                            id={val.id}
                                                                            onClick={(e) => (that.setState({option_selected: e.target.id}))}/></Form.Group>
                        </fieldset>)
                    })
                }

                return (
                    <Container>
                        <div>
                            <Form.Label><h4>Choose your shipping Address</h4></Form.Label>
                            <hr/>
                            {address_rows}
                        </div>
                        <br/>
                        <div>
                            <h4>Order Summary</h4>
                            <hr/>
                            {this.renderCartItems(cart)}
                        </div>
                        <hr/>
                        Cart Value: ${total}
                        <br/>
                        <br/>
                        <Button className={"place-order"} onClick={() => this.place_order(this.state.option_selected)}>Place
                            Order</Button>
                    </Container>
                )
            }
        }
    }
}

export default connect(state2props)(ProcessCheckout);
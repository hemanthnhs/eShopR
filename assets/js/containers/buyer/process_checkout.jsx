import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Row, Col, Alert, Container, Button, Form, Spinner, Badge} from 'react-bootstrap';
import {list_address, list_cart_items, place_order} from '../../api/ajax';
import {Link} from 'react-router-dom';

function state2props(state, props) {
    return {type: state.session ? state.session.type : null, address: state.address, cart: state.cart, total: state.forms.cart_total};
}

class ProcessCheckout extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            option_selected: 0,
            alert: null
        }

        if (props.type != null) {
            list_address();
            list_cart_items()
        }

    }

    redirect(path) {
        this.setState({redirect: path});
    }

    place_order(address_selected){
        if(!this.state.option_selected){
            this.setState({alert: "Please select atleast one address"})
            return;
        }
        var that = this
        var promise1 = new Promise(function(resolve, reject) {
            place_order(resolve,reject, address_selected)
        })

        promise1.then( function(success){
            that.props.dispatch({
                type: 'SUCCESS_REDIRECT',
                data: "Order(s) placed successfully",
            });
            that.setState({redirect: "/orders"})
                }).catch( function(errors) {
            that.props.dispatch({
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
                        {val.quantity} x ${val.selling_price}
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
        let {type, address, cart, total, dispatch} = this.props
        if (!type && type != 0){
            return <Redirect to={"/"}/>;
        }
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
                if (address.size == 0) {
                    address_rows.push(<div>
                        No address
                        updated
                        click to update
                        <Link to={"/addAddress"}><div className="display-add-address cart-new-address">+</div></Link></div>)
                } else {
                    var that = this;
                    address.forEach(function (val, key) {

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
                        { this.state.alert ? <Alert variant="danger">
                                <p>{this.state.alert}</p>
                            </Alert>
                            : null}
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
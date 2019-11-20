import React from 'react';
import {Redirect} from 'react-router';
import {list_categories, get_product, list_cart_items, add_to_cart} from '../api/ajax';
import {connect} from 'react-redux';
import {Carousel, Row, Col, Container, Button} from 'react-bootstrap';
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

    renderCartItems(cart){
        let renderElements=[]
        cart.forEach(function (val, key) {
            renderElements.push(<div>{val.product_name} - {val.option_selected}</div>)
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
                {this.renderCartItems(cart)}
            </div>)
        }
    }
}

export default connect(state2props)(ShowCart);
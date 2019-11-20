import React from 'react';
import {Redirect} from 'react-router';
import {list_categories, get_product, add_to_cart} from '../api/ajax';
import {connect} from 'react-redux';
import {Carousel, Row, Col, Container, Button} from 'react-bootstrap';
import {submit_login} from '../api/ajax';
import {Link} from "react-router-dom";

function state2props(state, props) {
    let id = parseInt(props.id);

    return {id: props.id, product: state.products[id]};
}

class ShowProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            option_selected: null,
        }

    }

    redirect(path) {
        this.setState({redirect: path});
    }

    renderOptions(options){
        let optionElements = []
        var that = this
        _.forEach(options, function (value, key) {
            optionElements.push(<Button className={"options " + (that.state.option_selected == key ? "option-active" : null)} onClick={() => that.setState({option_selected: key})}>{key}</Button>)
        })
        return(<div>{optionElements}</div>)
    }

    addToCart(product_id){
        add_to_cart({product_id: product_id, option_selected: this.state.option_selected, quantity: 1})
        // this.props.dispatch({
        //     type: 'ADD_TO_CART',
        //     data: {product_id: product_id, option_selected: this.state.option_selected, quantity: 1},
        // });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }


        let {id, product, dispatch} = this.props
        if (!product) {
            get_product(id)
        }

        if (!product) {
            return (<div>Getting Product Details</div>)
        } else {
            let images = []
            _.forEach(product.images, function (image, name) {
                images.push(<Carousel.Item><img className={"product-images"} src={image} /></Carousel.Item>)
            })
            return (<div className="product-container">
                <Row>
                    <Col xs={12} md={{ span: 3, offset: 1 }}>
                        <Carousel className="product-images" indicators={true}>
                            {images}
                        </Carousel>
                    </Col>
                    <Col md={{offset:2}}>
                        <Row><h2>{product.name}</h2></Row>
                        <hr />
                        <Row><h3>${product.selling_price}&nbsp;<del>{product.marked_price}</del></h3></Row>
                        <Row>
                            {this.renderOptions(product.options)}
                        </Row>
                        <Row>
                            <Button className="add-btn" onClick={() => this.addToCart(product.id)}>Add to Cart</Button>
                            <Button className="wishlist-btn">Wishlist item</Button>
                        </Row>
                    </Col>
                </Row>

                <Row>
                    Here attributes
                </Row>

            </div>)
        }
    }
}

export default connect(state2props)(ShowProduct);
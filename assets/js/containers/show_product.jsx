import React from 'react';
import {Redirect} from 'react-router';
import {get_product, add_to_cart} from '../api/ajax';
import {connect} from 'react-redux';
import {Carousel, Row, Col, Alert, Button, Table, Form, Spinner, Badge, Container} from 'react-bootstrap';
import store from "../store";

function state2props(state, props) {
    let id = parseInt(props.id);

    return {id: props.id, product: state.products[id], type: state.session ? state.session.type : null};
}

class ShowProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            option_selected: null,
            alert: null,
        }

    }

    redirect(path) {
        this.setState({redirect: path});
    }

    renderOptions(options) {
        let optionElements = []
        var that = this
        _.forEach(options, function (value, key) {
            if (value != 0) {
                optionElements.push(<Button
                    className={"options " + (that.state.option_selected == key ? "option-active" : null)}
                    onClick={() => that.setState({option_selected: key})}>{key}</Button>)
            }
        })
        return (optionElements)
    }

    renderAttributes(attributes) {
        let attributeElements = []
        _.each(attributes, function (attribute) {
            attributeElements.push(
                <tr>
                    <td>{attribute.attribute_name}</td>
                    <td> {attribute.attribute_description}</td>
                </tr>
            )
        })
        return (<Table bordered className="attributes-table">{attributeElements}</Table>);
    }

    addToCart(product_id) {
        if(this.state.option_selected==null){
            this.setState({alert: <Alert variant="danger">Select a option to add the item</Alert>})
            return;
        }
        var that = this
        var promise1 = new Promise(function (resolve, reject) {
            add_to_cart({product_id: product_id, option_selected: that.state.option_selected, quantity: 1}, resolve)
        });

        promise1.then(function (resp) {
            if (resp.data) {
                that.setState({alert: <Alert variant="success">Item added to cart</Alert>}, function () {
                    store.dispatch({
                        type: 'ADD_TO_CART',
                        data: [resp.data],
                    });
                })
            } else if (resp.warning) {
                that.setState({alert: <Alert variant="warning">{resp.warning}</Alert>})
            }
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }


        let {id, product, type, dispatch} = this.props

        if (!product) {
            get_product(id)
        }

        if (!product) {
            return (<div className={"loading"}>
                <Spinner animation="grow" role="status" size="md"/>
                Fetching product information...
            </div>)
        } else {
            let images = []
            let optionsRendered = this.renderOptions(product.options)
            _.forEach(product.images, function (image, name) {
                images.push(<Carousel.Item><img className={"product-images"} src={image}/></Carousel.Item>)
            })
            return (<Container>
                <Row>
                    <Col xs={12} md={{span: 3, offset: 1}}>
                        <Carousel className="product-images" indicators={true}>
                            {images}
                        </Carousel>
                    </Col>
                    <Col md={{offset: 2}}>
                        <Row><h2>{product.name}</h2></Row>
                        <Row className="font-italic"><Badge variant="warning"><h6
                            className={"header-bottom-none"}>{product.brand}</h6></Badge></Row>
                        <hr/>
                        <Form.Group controlId="price">
                            <Row>
                                <h5><Form.Label>List Price:</Form.Label>&nbsp;
                                    <del>${product.marked_price}</del>
                                </h5>
                            </Row>
                            <Row><h5><Form.Label>Price:</Form.Label>&nbsp;</h5>
                                <h5>${product.selling_price}&nbsp;</h5></Row>
                        </Form.Group>
                        <Form.Group controlId="highlights">
                            <Row>
                                <h5><Form.Label>Highlights:</Form.Label>&nbsp;
                                </h5>
                            </Row>
                            <h6>{product.highlights}&nbsp;</h6>
                        </Form.Group>
                        <Row>
                            <Form.Group controlId="attributes">
                                <h5><Form.Label>Attributes:</Form.Label></h5>
                                {this.renderAttributes(product.attributes)}
                            </Form.Group>
                        </Row>
                        { optionsRendered.length!=0 ?
                            <div>
                        <Row>
                            <Form.Group controlId="options">
                                <h5><Form.Label>Select a size:</Form.Label></h5>
                                {optionsRendered}
                            </Form.Group>
                        </Row>
                        {type == 0 ?
                            <Form.Group controlId="actions">
                                <Row>
                                    {this.state.alert}
                                </Row>
                                <Row>
                                    <Button className="add-btn" onClick={() => this.addToCart(product.id)}>Add to
                                        Cart</Button>
                                </Row>
                            </Form.Group> : (type == 1) ? <div>Viewing as seller</div> :
                                <div>Log in to add to your cart</div>}
                            </div> : "Out of stock"}
                    </Col>
                </Row>
                <hr/>
                <Row>
                    {product.description}
                </Row>

            </Container>)
        }
    }
}

export default connect(state2props)(ShowProduct);
import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Card, Row, Col, Spinner, Table, Container, Alert} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {seller_products} from '../../api/ajax';
import store from "../../store";

function state2props(state, props) {
    return {products: state.seller_products, success: state.forms.success_redirect};
}

class ShowSellerProducts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        }

        seller_products();

    }

    componentWillUnmount() {
        store.dispatch({
            type: 'PRODUCT_SUCCESS',
            data: null,
        });
    }

    redirect(path) {
        this.setState({redirect: path});
    }

    printOptions(options){
        let res = []
        _.forEach(options,function(value, option){
            res.push(<div>{option} - {value}</div>)
        })
        return res;
    }

    renderProducts(products){
        let renderElements = []
        var that = this;
        products.forEach(function (val, key) {
            renderElements.push(<tr>
                <td>{val.name}</td>
                <td>{val.brand}</td>
                <td>{that.printOptions(val.options)}</td>
                <td>{val.marked_price}</td>
                <td>{val.selling_price}</td>
                <td>{val.inserted_at.split("T")[0]}</td>
                <td><Link to={"/product/"+val.id}>Visit Listing</Link></td>
            </tr>)
        })
        return renderElements;
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let {products, success, dispatch} = this.props;
        if(!products){
            return (<div className={"loading"}>
                <Spinner animation="grow" role="status" size="md"/>
                Fetching your store list....!!!
            </div>)
        }
        if(products.size == 0){
            return (<Container className={"empty-cart"}> No Items in your store yet.. </Container>)
        }
        return (<Container>
            {success ? <Alert variant="success">
                    <p>{success}</p>
                </Alert>
                : null}
            <Table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Current Availability</th>
                    <th>Marked Price</th>
                    <th>Selling Price</th>
                    <th>Created On</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {this.renderProducts(products)}
                </tbody>
            </Table>
        </Container>)
    }
}

export default connect(state2props)(ShowSellerProducts);
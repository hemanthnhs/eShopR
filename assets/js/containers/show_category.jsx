import React from 'react';
import {Redirect} from 'react-router';
import {list_products} from '../api/ajax';
import {connect} from 'react-redux';
import {Row, Spinner} from 'react-bootstrap';
import ProductListing from "./../components/product_listing"

function state2props(state, props) {
    let id = parseInt(props.id);

    return {id: props.id, product: state.products[id]};
}

class ShowCategory extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            products: null,
        }

    }

    redirect(path) {
        this.setState({redirect: path});
    }

    componentDidMount() {
        var that = this
        var promise1 = new Promise(function(resolve, reject) {
            list_products(that.props.id, resolve)
        })

        promise1.then(function(data) {
            that.setState({products: data})
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }

        if(!this.state.products){
            return (
                <div className={"loading"}>
                    <Spinner animation="grow" role="status" size="md"/>
                    Fetching products from our catalogue
                </div>
            );
        }else {
            let products = this.state.products
            let display=[]
            _.each(products,function (product) {
                display.push(<ProductListing product={product} />)
            })
            return (<div><Row className={"offset-1"}>{display}</Row></div>)
        }

    }
}

export default connect(state2props)(ShowCategory);
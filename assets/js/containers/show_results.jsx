import React from 'react';
import {Redirect} from 'react-router';
import {list_products, get_product, search} from '../api/ajax';
import {connect} from 'react-redux';
import {Carousel, Row, Col, Container, Button} from 'react-bootstrap';
import {submit_login} from '../api/ajax';
import {Link} from "react-router-dom";
import ProductListing from "./../components/product_listing"

function state2props(state, props) {
    let id = parseInt(props.id);

    return {id: props.id, product: state.products[id]};
}

class ShowSearchResults extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            products: null,
            searched_for: this.props.query
        }
    }

    redirect(path) {
        this.setState({redirect: path});
    }

    componentDidMount() {
        console.log("CHECKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
        var that = this
        var promise1 = new Promise(function(resolve, reject) {
            search(that.props.query, resolve)
        })

        promise1.then(function(data) {
            that.setState({products: data, searched_for: that.props.query})
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }

        console.log("came in...", this.props.query,".................", this.state.searched_for)
        if(this.state.searched_for != this.props.query){
            this.componentDidMount()
        }

        if(!this.state.products){
            return <div>Getting your search results...</div>
        }else {
            let products = this.state.products
            let display=[]
            _.each(products,function (product) {
                console.log("Came in")
                display.push(<ProductListing product={product} />)
            })
            return (<div>{display}</div>)
        }

    }
}

export default connect(state2props)(ShowSearchResults);
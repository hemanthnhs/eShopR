import React from 'react';
import {Redirect} from 'react-router';
import {list_products, get_product, search} from '../api/ajax';
import {connect} from 'react-redux';
import {Carousel, Row, Col, Container, Button, Spinner} from 'react-bootstrap';
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
            searched_for: this.props.query,
            error: null
        }
    }

    redirect(path) {
        this.setState({redirect: path});
    }

    componentDidMount() {
        var that = this
        that.setState({error: null})
        var promise1 = new Promise(function(resolve, reject) {
            search(that.props.query, resolve, reject)
        })

        promise1.then(function(data) {
            that.setState({products: data, searched_for: that.props.query})
        }).catch(function(){
            that.setState({error: "Something went wrong try again"})
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }

        if(this.state.searched_for != this.props.query){
            this.componentDidMount()
        }
        if(this.state.error){
            return (<Container className={"empty-cart"}>{this.state.error}...</Container>)
        }

        if(!this.state.products){
            return (
                <div className={"loading"}>
                <Spinner animation="grow" role="status" size="md"/>
                Fetching search results...
            </div>
            )
        }else {
            let products = this.state.products
            let display=[]
            if(products.length == 0) {
                return (<Container className={"empty-cart"}>Could not find any products for the search</Container>)
            }
            _.each(products,function (product) {
                display.push(<ProductListing product={product} />)
            })
            return (<div><Row className={"offset-1"}>{display}</Row></div>)
        }

    }
}

export default connect(state2props)(ShowSearchResults);
import React from 'react';
import {Redirect} from 'react-router';
import {list_products} from '../../api/ajax';
import {connect} from 'react-redux';
import {Row, Spinner,Container} from 'react-bootstrap';
import ProductListing from "../../components/product_listing"

function state2props(state, props) {
    let id = parseInt(props.id);

    return {id: props.id};
}

class ShowCategory extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            products: null,
            for_category: null
        }
    }

    redirect(path) {
        this.setState({redirect: path});
    }

    fetchItems(){
        var that = this
        var promise1 = new Promise(function(resolve, reject) {
            list_products(that.props.id, resolve)
        })

        promise1.then(function(data) {
            that.setState({products: data, for_category: that.props.id})
        })
    }

    componentDidMount() {
        this.fetchItems();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }

        let {id, dispatch} = this.props
        if(id != this.state.for_category){
            this.fetchItems();
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
            if(products.length == 0) {
                return (<Container className={"empty-cart"}> We are adding items...Please check back later. </Container>)
            }
            _.each(products,function (product) {
                display.push(<ProductListing product={product} />)
            })
            return (<div><Row className={"offset-1"}>{display}</Row></div>)
        }

    }
}

export default connect(state2props)(ShowCategory);
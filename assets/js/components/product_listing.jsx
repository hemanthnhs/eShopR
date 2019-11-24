import React from 'react';
import {Carousel, Row, Col, Container, Button} from 'react-bootstrap';
import {NavLink} from "react-router-dom";

export default function ProductListing(data) {
    let product = data.product
    let discountPercentage = ((product.marked_price - product.selling_price) / (product.marked_price)*100).toFixed(2)
    console.log(product)
    return (<span className={"product-listing"}>
        <NavLink to={"/product/" + product.id}>
            <div className={"display-brand"}>{product.brand}</div>
            <div>
            <img
                height={300} width={225}
                src={product.images[Object.keys(product.images)[0]]}/>
            </div>
        <div className={"product-name"}>{product.name}</div>
            <span className="display-price">
                ${product.selling_price}&nbsp;
                <del className="display-markedprice">${product.marked_price}</del>&nbsp;
                <div className="display-discount">
                {discountPercentage}% off
                </div>
    </span>
    </NavLink>
    </span>)
}
import React from 'react';
import {Carousel, Row, Col, Container, Button} from 'react-bootstrap';

export default function ProductListing(data) {
    let product = data.product
    console.log(product)
    return (<Col height={500} width={300} className={"product-listing"}><Row><img height={300} width={225}
                                                          src={product.images[Object.keys(product.images)[0]]} /></Row>

        <Row>{product.name}</Row><Row>{product.selling_price}<del>{product.marked_price}</del></Row></Col>)
}
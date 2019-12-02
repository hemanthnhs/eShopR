import React from 'react';
import {Redirect} from 'react-router';
import {list_categories, submit_create_product} from '../../api/ajax';
import {connect} from 'react-redux';
import {Form, Button, Container, Alert, Table} from 'react-bootstrap';
import store from "../../store";

function state2props(state) {
    return {
        categories: state.categories,
        imagesUploaded: state.forms.new_product.files,
        main_category: state.forms.new_product.main_category,
        num_of_tasks: state.forms.new_product.num_of_tasks,
        num_of_attributes: state.forms.new_product.num_of_attributes
    };
}

class CreateProduct extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            alert: null
        }
        list_categories()
    }

    redirect(path) {
        this.setState({redirect: path});
    }

    fileChangedHandler(event) {
        const file = event.target.files[0]
    }

    changed(data) {
        this.props.dispatch({
            type: 'CREATE_PRODUCT',
            data: data,
        });
    }

    file_changed(ev) {
        let input = ev.target;
        let file = null;
        if (input.files.length > 0) {
            file = input.files[0];
        }
        this.props.dispatch({
            type: 'ADD_IMAGE',
            data: file,
        });
    }

    displayUploadedImages(imagesUploaded) {
        let imagesDisplay = []
        _.forEach(imagesUploaded, function (image) {
            imagesDisplay.push(<div>{image.name}</div>)
        })
        return (<div>{imagesDisplay}</div>)
    }

    number_changed(number, action) {
        if (number < 1) {
            return;
        }
        this.props.dispatch({
            type: action
        });

    }

    change_map_data(ev, type, updated_key) {
        this.props.dispatch({
            type: type,
            id: ev.target.id,
            data: ev.target.value,
            updated_key: updated_key
        });
    }

    submit_create_product() {
        var that = this
        var promise2 = new Promise(function (resolve2, reject2) {
            submit_create_product(resolve2, reject2)
        })

        promise2.then(function (result) {
            store.dispatch({
                type: 'SUCCESS_REDIRECT',
                data: "Product created successfully",
            });
            that.setState({redirect: "/sellerProducts"})
        }).catch(function (error) {
            that.setState({alert: error})
        })

    }

    render() {
        let {categories, imagesUploaded, main_category, num_of_tasks, num_of_attributes, brand, dispatch} = this.props
        let displayHelper = new Map()
        let displayCategories = [<option key={-1} value={-1} disabled hidden>Select Main Category</option>]
        _.forEach(categories, function (val, key) {
            displayHelper.set(val.id, val.sub)
            displayCategories.push(<option key={val.id} value={val.id}>{key}</option>)
        });
        let displaySubCategories = [<option key={-1} value={-1} disabled hidden>Select Sub Category</option>]
        if (main_category) {
            _.forEach(displayHelper.get(parseInt(main_category)), function (val2, key2) {
                displaySubCategories.push(<option key={val2[0]} value={val2[0]}>{val2[1]}</option>)
            });
        }
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        let options_elements = []
        for (var i = 1; i <= num_of_tasks; i++) {
            options_elements.push(
                <div>
                    <Form.Control type="text" id={i} className="display-create-product" placeholder="Option Name"
                                  onChange={(ev) => this.change_map_data(ev, "CHANGE_OPTIONS_DATA", "option_name")}
                                  required/>
                    <Form.Control type="number" id={i} className="display-create-product" min={0} step={1}
                                  placeholder="Quantity Available"
                                  onChange={(ev) => this.change_map_data(ev, "CHANGE_OPTIONS_DATA", "quantity")}
                                  required/>
                </div>
            )
        }
        let attributes_elements = []
        for (var i = 1; i <= num_of_attributes; i++) {
            attributes_elements.push(<div>
                <Form.Control type="text" id={i} className="display-create-product" placeholder="Attribute Title"
                              onChange={(ev) => this.change_map_data(ev, "CHANGE_ATTRIBUTES_DATA", "attribute_name")}
                              required/>
                <Form.Control type="text" id={i} className="display-create-product" placeholder="Description"
                              onChange={(ev) => this.change_map_data(ev, "CHANGE_ATTRIBUTES_DATA", "attribute_description")}
                              required/>
            </div>)
        }
        return (
            <Container>
                {this.state.alert ? <Alert variant="danger">{this.state.alert}</Alert> : null}
                <Form onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <Table>
                        <tr>
                            <td><Form.Label>Product Details</Form.Label></td>
                            <td>
                                <Form.Group controlId="productName">
                                    <Form.Control className="display-create-product" type="text"
                                                  placeholder="Product name" onChange={
                                        (ev) => this.changed({name: ev.target.value})} required/>

                                    <Form.Control className="display-create-product" type="text" placeholder={"Brand"}
                                                  onChange={
                                                      (ev) => this.changed({brand: ev.target.value})} required/>

                                </Form.Group>
                                <Form.Group controlId="productCategory">
                                    <Form.Control as="select" className="display-create-product" defaultValue={-1}
                                                  onChange={
                                                      (ev) => this.changed({main_category: ev.target.value})}
                                                  required> {displayCategories} </Form.Control>

                                    <Form.Control as="select" className="display-create-product" defaultValue={-1}
                                                  onChange={
                                                      (ev) => this.changed({sub_category: ev.target.value})}
                                                  required> {displaySubCategories} </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="description">
                            <textarea className="form-control display-create-product"
                                      placeholder={"Few Highlights of the Product"} rows="3" onChange={
                                (ev) => this.changed({highlights: ev.target.value})} required></textarea>

                                    <textarea className="form-control display-create-product"
                                              placeholder={"Product Description"} rows="3" onChange={
                                        (ev) => this.changed({description: ev.target.value})} required></textarea>
                                </Form.Group>

                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>Pricing Details</Form.Label></td>
                            <td>
                                <Form.Group controlId="price">
                                    <Form.Control type="number" className="display-create-product" step={.01} min={0}
                                                  placeholder={"Marked Price (eg:1000.0)"}
                                                  onChange={
                                                      (ev) => this.changed({marked_price: ev.target.value})} required/>

                                    <Form.Control type="number" className="display-create-product" step={.01} min={0}
                                                  placeholder={"Selling Price (eg:780.76)"}
                                                  onChange={
                                                      (ev) => this.changed({selling_price: ev.target.value})} required/>
                                </Form.Group></td>
                        </tr>
                        <tr>
                            <td><Form.Label>Product Image(s)</Form.Label></td>
                            <td><Form.Group controlId="imageInput">
                                {this.displayUploadedImages(imagesUploaded)}
                                <Form.Control id="uploadImage" type="file" className="display-create-product"
                                              onChange={(ev) => this.file_changed(ev)} required/>
                                {(imagesUploaded.length == 0) ? <label htmlFor="uploadImage">Upload Image</label> :
                                    <label htmlFor="uploadImage">Add Another Image</label>}
                            </Form.Group>
                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>Product Options</Form.Label></td>
                            <td><Form.Group controlId="options">
                                <Form.Label>Add/Remove</Form.Label>
                                <Button className={"add-rem-btn"} variant="info"
                                        onClick={() => this.number_changed(num_of_tasks + 1, "ADD_OPTION")}>+</Button>
                                <Button variant="warning"
                                        onClick={() => this.number_changed(num_of_tasks - 1, "REMOVE_OPTION")}>-</Button>
                            </Form.Group>
                                {options_elements}

                            </td>
                        </tr>
                        <tr>
                            <td><Form.Label>Product Attributes</Form.Label></td>
                            <td><Form.Group controlId="attributes">
                                <Form.Label>Add/Remove</Form.Label>
                                <Button className={"add-rem-btn"} variant="info"
                                        onClick={() => this.number_changed(num_of_attributes + 1, "ADD_ATTRIBUTE")}>+</Button>
                                <Button variant="warning"
                                        onClick={() => this.number_changed(num_of_attributes - 1, "REMOVE_ATTRIBUTE")}>-</Button>

                            </Form.Group>
                                {attributes_elements}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button type="submit" variant="primary"
                                        onClick={() => this.submit_create_product()}>Submit</Button></td>
                        </tr>
                    </Table>
                </Form>
            </Container>
        )
    }
}

export default connect(state2props)(CreateProduct);
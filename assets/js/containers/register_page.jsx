import React from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import {Form, Button, Col, Alert, Container, Table} from 'react-bootstrap';
import {submit_new_registration} from '../api/ajax';

function state2props(state) {
    return {form: state.forms.new_registration};
}

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
            alert: null
        }

    }

    redirect(path) {
        this.setState({redirect: path});
    }

    changed(data) {
        this.props.dispatch({
            type: 'CHANGE_NEW_REGISTRATION',
            data: data,
        });
    }

    submit_new_registration() {
        console.log("props", this.props.form)
        if (!this.props.form.firstname || this.props.form.firstname == "") {
            this.setState({alert: "First Name cannot be empty"})
            return;
        }
        if (!this.props.form.lastname || this.props.form.lastname == "") {
            this.setState({alert: "Last Name cannot be empty"})
            return;
        }
        if (!this.props.form.email || this.props.form.email == "") {
            this.setState({alert: "Email cannot be empty"})
            return;
        }
        if (!this.props.form.password || this.props.form.password == "") {
            this.setState({alert: "Password cannot be empty"})
            return;
        }
        if (this.props.form.password && this.props.form.password.length < 8) {
            this.setState({alert: "Please choose a password with atleast 8 characters"})
            return;
        }
        var that = this
        var promise2 = new Promise(function (resolve2, reject2) {
            submit_new_registration(resolve2, reject2)
        })

        promise2.then(function () {
            that.props.dispatch({
                type: 'SUCCESS_REDIRECT',
                data: "Registered successfully",
            });
            that.setState({redirect: "/"})
        }).catch(function (error) {
            if (error && error.errors && error.errors.email) {
                that.setState({alert: "Email already exists. Login instead"})
                return;
            } else {
                that.setState({alert: "Unable to create your account. Please try again"})
                return;
            }
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>;
        }
        return (
            <Container>
                <h3>New User Registration</h3>
                <hr/>
                {this.state.alert ? <Alert variant="danger">
                        <p>{this.state.alert}</p>
                    </Alert>
                    : null}
                <Table borderless>
                    <tr>
                        <td><Form.Label>First Name</Form.Label></td>
                        <td><Form.Control className="display-create-product" type="text"
                                          placeholder="Enter your First Name"
                                          onChange={
                                              (ev) => this.changed({firstname: ev.target.value})}/></td>
                    </tr>
                    <tr>
                        <td><Form.Label>Last Name</Form.Label></td>
                        <td><Form.Control className="display-create-product" type="text"
                                          placeholder="Enter your Last Name"
                                          onChange={
                                              (ev) => this.changed({lastname: ev.target.value})}/></td>
                    </tr>
                    <tr>
                        <td><Form.Label>Email</Form.Label></td>
                        <td><Form.Control className="display-create-product" type="text" placeholder="abc@example.com"
                                          onChange={
                                              (ev) => this.changed({email: ev.target.value})}/></td>
                    </tr>
                    <tr>
                        <td><Form.Label>Password</Form.Label></td>
                        <td><Form.Control className="display-create-product" type="password"
                                          placeholder="Enter a secure password"
                                          onChange={
                                              (ev) => this.changed({password: ev.target.value})}/></td>
                    </tr>
                    <tr>
                        <td><Form.Label>Registering as</Form.Label></td>
                        <td>
                            <fieldset>
                                <Form.Group>
                                    <Form.Check type="radio" label={"Buyer"}
                                                name="formHorizontalRadios"
                                                id={0}
                                                onClick={(ev) => this.changed({type: 0})} defaultChecked/>
                                </Form.Group>
                            </fieldset>
                            <fieldset>
                                <Form.Group>
                                    <Form.Check type="radio" label={"Seller"}
                                                name="formHorizontalRadios"
                                                id={1}
                                                onClick={(ev) => this.changed({type: 1})}/>
                                </Form.Group>
                            </fieldset>
                        </td>
                    </tr>
                </Table>
                <Button variant="primary" type="submit"
                        onClick={() => this.submit_new_registration()}>Submit</Button>
            </Container>)

    }
}

export default connect(state2props)(RegisterPage);
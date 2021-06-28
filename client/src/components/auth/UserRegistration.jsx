import React, { useState, Fragment } from 'react';
import { Button, FormGroup, Label, Input, Col, Container, Row, FormFeedback, Form } from 'reactstrap';
import { Redirect } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';



const UserRegistration = ({ setAlert, register, isAuthenticated }) => {

    const [enteredFormData, setEnteredFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: ""
    });

    const {
        firstName,
        lastName,
        email,
        password,
        gender,
    } = enteredFormData;

    const handleDataChange = e => setEnteredFormData({
        ...enteredFormData,
        [e.target.name]: e.target.value
    })
    console.log(enteredFormData);

    const handleSubmitForm = async e => {
        e.preventDefault();

        if (enteredFormData.firstName.trim().length === 0) {
            setAlert('First name is required', 'danger')
        }
        if (enteredFormData.lastName.trim().length === 0) {
            setAlert('Last name is required', 'danger')
        }
        if (enteredFormData.email.trim().length === 0) {
            setAlert('Email name is required', 'danger')
        }
        if (enteredFormData.password.trim().length === 0) {
            setAlert('Password name is required', 'danger')
        }
      

        register({
            firstName,
            lastName,
            email,
            password,
            gender,
        })
    }

    const handleValidateForm = () => {
        if (enteredFormData.password.length < 6) {
            setAlert('Password is too short, please try again', 'danger')
        }
        if (!(email.includes('@'))) {
            setAlert('Email is invalid', 'danger')
        }
    }

    //Redirect if user registered
    if (isAuthenticated) {
        return <Redirect to="/userDashboard" />;
    }
    return (
        <Fragment>
            <Container  >
                <Form onSubmit={e => handleSubmitForm(e)}>
                    <Row>
                        <FormGroup >
                            <Label
                                sm={12}
                            >* First Name  </Label>
                            <Col sm={10}>
                                <Input
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={firstName}
                                    onChange={e => handleDataChange(e)}
                                />
                                <FormFeedback
                                >
                                </FormFeedback>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup >
                            <Label
                                sm={12}
                            >* Last Name</Label>
                            <Col sm={10}>
                                <Input
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={lastName}
                                    onChange={e => handleDataChange(e)}
                                />
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row>
                        <FormGroup >
                            <Label
                                sm={12}
                            >* Email</Label>
                            <Col sm={10}>
                                <Input
                                    type="text"
                                    placeholder="with a placeholder"
                                    name="email"
                                    value={email}
                                    onChange={e => handleDataChange(e)}
                                    onBlur={handleValidateForm}
                                />
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row>
                        <FormGroup row>
                            <Label
                                sm={12}
                            >* Password</Label>
                            <Col sm={10}>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="password placeholder"
                                    value={password}
                                    onChange={e => handleDataChange(e)}
                                    onBlur={handleValidateForm}
                                />
                            </Col>
                        </FormGroup>
                    </Row>



                    <FormGroup tag="fieldset" row>
                        <legend className="col-1 pt-5 mt-6">Gender</legend>
                        <Col sm={10}>

                            <FormGroup check>
                                <Label className="col-1 pt-5 mt-6" check sm={10}>
                                    <Input
                                        type="radio"
                                        name="gender"
                                        value={'female'}
                                        onChange={e => handleDataChange(e)}
                                    />
                                      Female
                                 </Label>
                            </FormGroup>

                            <FormGroup check >
                                <Label check sm={10}>
                                    <Input
                                        type="radio"
                                        name="gender"
                                        value={'male'}
                                        onChange={e => handleDataChange(e)}
                                    />
                                       Male
                                    </Label>
                            </FormGroup>

                        </Col>
                    </FormGroup>

                    {/* <Link to="/userDashboard"> */}
                    <Button
                        color="success"
                        type="submit"
                    >
                        Submit
                    </Button>
                    {/* </Link> */}

                </Form>
            </Container>
        </Fragment>
    );
};

UserRegistration.prototype = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, register })(UserRegistration);
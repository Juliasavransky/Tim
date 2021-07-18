import React, { useState } from 'react';
import { Button, FormGroup, Label, Input, Container, Row, Form } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import './userRegistration.css'
//redux
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';



const UserRegistration = ({
    setAlert,
    register,
    isAuthenticated
}) => {

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
        <Container className="userRegistration">
        <Form
            className="userRegistration--conp"
            onSubmit={e => handleSubmitForm(e)}>
            <Row>
                <FormGroup
                    className="userRegistration--input"
                >
                    <Label
                        sm={12}
                    >* First Name  </Label>

                    <Input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={e => handleDataChange(e)}
                    />
                </FormGroup>
            </Row>
            <Row>
                <FormGroup className="userRegistration--input">
                    <Label
                        sm={12}
                    >* Last Name</Label>

                    <Input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={e => handleDataChange(e)}
                    />
                </FormGroup>
            </Row>

            <Row>
                <FormGroup className="userRegistration--input">
                    <Label
                        sm={12}
                    >* Email</Label>
                    <Input
                        type="text"
                        placeholder="with a placeholder"
                        name="email"
                        value={email}
                        onChange={e => handleDataChange(e)}
                        onBlur={handleValidateForm}
                    />
                </FormGroup>
            </Row>

            <Row>
                <FormGroup className="userRegistration--input">
                    <Label
                        sm={12}
                    >* Password</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="password placeholder"
                        value={password}
                        onChange={e => handleDataChange(e)}
                        onBlur={handleValidateForm}
                    />
                </FormGroup>
            </Row>


            <div className="userRegistration-radioBtn">
                <FormGroup tag="fieldset" >
                    <legend className=" pt-3 ">Gender</legend>

                    <FormGroup check>
                        <Label check sm={10}>
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

                </FormGroup>

                <Button
                    className="userRegistration-btn"
                    size="lg"
                    color="warning"
                    type="submit"
                >
                    Submit
                </Button>

            </div>
            <div className="fieldsMark"
            >Fields marked with an * are required</div>


        </Form>
        </Container>
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
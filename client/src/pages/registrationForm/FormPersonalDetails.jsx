import React, { useState, useEffect } from 'react';
import { Col, Row, Button, FormGroup, Label, Input, Container, Form } from 'reactstrap';
import Stepper from './Stepper';
import { setAlert } from '../../actions/alert';
import './formPersonalDetails.css';



//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile, getCurrentProfile } from '../../actions/profile'



const FormPersonalDetails = ({
    profile: { profile, loading },
    createProfile,
    history,
    getCurrentProfile,

    nextStep,
    step,
    onSavePersonalData,
    setAlert
}) => {
    const [formDataPersonal, setFormDataPersonal] = useState({
        city: "",
        street: "",
        phone: "",
        dob: ""
    });

    const {
        city,
        street,
        phone,
        dob
    } = formDataPersonal

    const handleChangeFormDataPersonal = e => setFormDataPersonal({
        ...formDataPersonal,
        [e.target.name]: e.target.value
    });

    const handleValidateForm = () => {
        if (formDataPersonal.city.trim().length === 0) {
            setAlert('City is required', 'danger')

        }
        if (formDataPersonal.street.trim().length === 0) {
            setAlert('Street and number is required', 'danger')
        }
    }

    const saveAndContinue = (e) => {

        e.preventDefault()
        onSavePersonalData(formDataPersonal)
        let isValid = true;

        if (formDataPersonal.city.trim().length === 0) {
            isValid = false;
        }
        if (formDataPersonal.street.trim().length === 0) {
            isValid = false;
        }
        if (isValid) {
            nextStep()
        }


    }

    useEffect(() => {
        getCurrentProfile();

        setFormDataPersonal({
            city: loading || !profile || !profile.city ? "" : profile.city.charAt(0).toUpperCase() + profile.city.slice(1),
            street: loading || !profile || !profile.street ? "" : profile.street.charAt(0).toUpperCase() + profile.street.slice(1),
            phone: loading || !profile || !profile.phone ? "" : profile.phone,
            dob: loading || !profile || !profile.dob ? "" : profile.dob
        });

    }, [loading, getCurrentProfile,]);


    return (
        <Container
            className="formPersonalDetails_container"
        >
                <div className="formPersonalDetails_stepper">
                    <Stepper
                        step={step}
                    />
                </div>
            <Form
                className="formPersonalDetails_form"
            >
                <Row>
                    <FormGroup
                        className="formPersonalDetails_formGroup"

                    >

                        <Label
                            for="exampleCity"
                        >* City</Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                placeholder="Enter a city"
                                name="city"
                                value={city}
                                onChange={e => handleChangeFormDataPersonal(e)}
                                onBlur={handleValidateForm}
                            />
                        </Col>
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup className="formPersonalDetails_formGroup"
                    >
                        <Label
                            for="exampleAddress"
                        >* Address</Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                placeholder="Street and number"
                                name="street"
                                value={street}
                                onChange={e => handleChangeFormDataPersonal(e)}
                                onBlur={handleValidateForm}
                            />
                        </Col>
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup className="formPersonalDetails_formGroup"
                    >
                        <Label
                            for="phoneNumber"
                        >Phone Number</Label>
                        <Col sm={10}>
                            <Input
                                type="number"
                                placeholder="Enter a Phone number"
                                name="phone"
                                value={phone}
                                onChange={e => handleChangeFormDataPersonal(e)}
                            />
                        </Col>
                    </FormGroup>
                </Row>

                <Row>
                    <FormGroup className="formPersonalDetails_formGroup"
                    >
                        <Label
                            for="exampleDate"
                        >Date of Birth</Label>
                        <Col sm={10}>
                            <Input
                                type="date"
                                placeholder="Enter Date of birth"
                                name="dob"
                                value={dob}
                                onChange={e => handleChangeFormDataPersonal(e)}
                            />
                            <FormGroup>
                                <Button
                                className="formPersonalDetails_button"
                                color="warning"
                                    onClick={saveAndContinue}
                                    type="submit">
                                    Next Step
                                </Button>
                            </FormGroup>
                        </Col>
                    </FormGroup>
                </Row>

            </Form>
        </Container>
    );
};
FormPersonalDetails.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { createProfile, getCurrentProfile, setAlert })(FormPersonalDetails);
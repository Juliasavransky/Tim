import React, { useState } from 'react';
import FormPersonalDetails from './FormPersonalDetails';
import FormProfessionalDetails from './FormProfessionalDetails.jsx';
import Success from './Success';
import Confirm from './Confirm';
import { withRouter } from 'react-router-dom';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile, getCurrentProfile } from '../../actions/profile'

const Registration = ({
    profile: { profile, loading },
    file,
    tagValue,
    createProfile,
    history,
    getCurrentProfile,
}) => {

    const [step, setStep] = useState(1);

    const [enteredPersonalForm, setEnteredPersonalForm] = useState({});

    const [bioData, setBioData] = useState('');
    const [enteredCategories, setEnteredCategories] = useState([]);

    const [enteredSubCategories, setEnteredSubCategories] = useState([]);
    const [enteredFile, setEnteredFile] = useState(file);


    const nextStep = () => {
        setStep(step + 1);
    }
    const prevStep = () => {
        setStep(step - 1);
    }


    //adding user Personal Data
    const addPersonalDataHandler = (personalForm) => {
        setEnteredPersonalForm(personalForm);

    }

    //adding user file
    const addFileData =  (file) => {
        // console.log('file from registration1', file);
        setEnteredFile(file);
        console.log('enteredFile after', enteredFile);

    }
  
    //adding subCategories
    const addTagsData = (tagValue) => {
        setEnteredSubCategories(tagValue);
    }

    //adding user bio information
    const addBioDataHandler = (bioData) => {
        setBioData(bioData);
    }

    const addSubCategoryDataHandler = (enteredCategories) => {
        setEnteredCategories(enteredCategories);
    }

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleSubmit = () => {
        const formData = {

            ...enteredPersonalForm,
            categories: enteredCategories,
            bio: bioData,
            subCategories: enteredSubCategories,
            avatar: enteredFile,

        };
        console.log('formData', formData);
        console.log('enteredFile', enteredFile);


        sleep(7000).then(() => { createProfile(formData, history); });

    }

    switch (step) {

        case 1:
            return <FormPersonalDetails
                prevStep={prevStep}
                nextStep={nextStep}
                onSavePersonalData={addPersonalDataHandler}
                step={step}
            />
        case 2:
            return <FormProfessionalDetails
                prevStep={prevStep}
                nextStep={nextStep}
                step={step}
                onSaveBioData={addBioDataHandler}
                onAddFile={addFileData}
                onAddTags={addTagsData}
                onAddSubCategories={addSubCategoryDataHandler}
            />
        case 3:
            return <Confirm
                prevStep={prevStep}
                nextStep={nextStep}
                handleSubmit={handleSubmit}
                enteredPersonalForm={enteredPersonalForm}
                bioData={bioData}
                step={step}
                enteredSubCategories={enteredSubCategories}
                enteredFile={enteredFile}
                enteredCategories={enteredCategories}
            />
        case 4:
            return <Success

            />
    }
};

Registration.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(Registration));

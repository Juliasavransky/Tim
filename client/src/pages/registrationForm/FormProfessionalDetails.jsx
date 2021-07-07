import React, { useState } from 'react';
import { Col, Row, Button, FormGroup, Label, Input, Container } from 'reactstrap';
import MultipleSelectionCategories from './MultipleSelectionCategories';
import Stepper from './Stepper';
import SubCategoryInput from './subCategoryForm/SubCategoryInput';
import { setAlert } from '../../actions/alert';
import './formProfessionalDetails.css'


//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile, getCurrentProfile } from '../../actions/profile'
import ImageUpload from './ImageUpload/ImageUpload';


const FormProfessionalDetails = ({
    profile: { profile, loading },
    createProfile,
    history,
    getCurrentProfile,
    setAlert,

    prevStep,
    nextStep,
    step,
    invalidFiled,

    onAddFile,
    onAddTags,
    onSaveBioData,
    onAddSubCategories

}) => {

    const saveAndContinue = (e) => {
        e.preventDefault()
        nextStep()
        onSaveBioData(bio)
        onAddSubCategories(categories)

    }
    const back = (e) => {
        e.preventDefault();
        prevStep();
    }


    const [bio, setBio] = useState('');

    const handleChangeBio = e => {
        setBio(e.target.value)
    }

    const [categories, setCategories] = useState(null);

    const handleChangeCategory = (e, select) => {
        setCategories(select.value);
    }



    //user file passing to Registration component
    const seveFileHandler = (file) => {
        const fileData = {
            ...file
        }
        onAddFile(file);
    }


    const [enteredTags, setEnteredTags] = useState([]);
    //user sub category passing to Registration component
    const saveTagsHandler = (tagValue) => {
        const tagsData = {
            ...tagValue
        }
        onAddTags(tagValue);
    }

    return (
        <Container >
            <div className="formProfessionalDetails-comp" >
                <Stepper step={step} />

                <div className="formProfessionalDetails--inputs">

                    <div className="formProfessionalDetails-row">

                        <div className="formProfessionalDetails-item">
                            <MultipleSelectionCategories
                                handleChangeCategory={handleChangeCategory}
                            />
                        </div>

                        <div className="formProfessionalDetails-item subInput">
                            <SubCategoryInput
                                onSaveTags={saveTagsHandler}
                            />
                        </div>

                        <div className="formProfessionalDetails-item ">
                            <Input
                                className="textArea"
                                type="textarea"
                                placeholder='Tell us more about you...'
                                name="enteredBio"
                                value={bio.bio}
                                onChange={handleChangeBio}
                            />
                        </div>

                        <div className="formProfessionalDetails--buttons">

                            <Button
                                onClick={back}
                                color="warning"
                                type="submit">
                                Previous Step
                            </Button>

                            <Button
                                onClick={saveAndContinue}
                                color="warning"
                                type="submit">
                                Next Step
                            </Button>

                        </div>
                    </div>

                    <div className="formProfessionalDetails-ImageUpload">
                        <div>
                            <ImageUpload
                                onSaveFile={seveFileHandler}
                            />
                        </div>
                    </div>

                </div>




            </div>

        </Container >
    );
};
FormProfessionalDetails.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,

};
const mapStateToProps = state => ({
    profile: state.profile
});


export default connect(mapStateToProps, { createProfile, getCurrentProfile, setAlert })(FormProfessionalDetails);

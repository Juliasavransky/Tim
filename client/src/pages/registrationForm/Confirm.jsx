import React, { useState, useEffect } from 'react';
import { Button, FormGroup } from 'reactstrap';
import { Accordion, Icon, List, Image } from 'semantic-ui-react';
import Stepper from './Stepper';
import Moment from 'react-moment';
import man from '../../components/man.jpg';
import woman from '../../components/woman.jpg'


import './confirm.css';
//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile, getCurrentProfile } from '../../actions/profile'


const Confirm = ({
    profile: { profile, loading },
    auth: { user },


    createProfile,
    history,
    getCurrentProfile,

    prevStep,
    nextStep,
    handleSubmit,
    step,

    enteredPersonalForm,
    enteredCategories,
    bioData,
    enteredFile,
    enteredSubCategories
}) => {

    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile]);


    const saveAndContinue = (e) => {
        e.preventDefault()
        nextStep()
        handleSubmit()

    }
    const back = (e) => {
        e.preventDefault();
        prevStep();
    }

    const [activeIndex, setActiveIndex] = useState(0);
    const [image, setImage] = useState(enteredFile);
    const [tags, setTags] = useState(enteredSubCategories);

    //accordion open and close
    const handleClick = (e, titleProps) => {
        const { index } = titleProps
        const newIndex = activeIndex === index ? -1 : index

        setActiveIndex(newIndex)
    }

    const avatar = user && user.gender === 'female' ? woman : man;

    //img style
    const imgStyle = {
        width: '250px',
        objectFit: 'cover',
        borderRadius: '19% 81% 40% 60% / 73% 83% 17% 27%',
        zIndex: "1",
        padding: "1em"
    };

    return (
        <div className="confirm--comp">
            <Stepper step={step} />
            <div className="confirm--content">
                <Accordion
                    className="confirm--container"
                    styled>

                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={handleClick}
                        style={{ fontSize: "1.3rem", color: "var(--blue)" }}
                    >
                        <Icon name='dropdown' />
                        User Professional Information
                    </Accordion.Title>

                    <Accordion.Content active={activeIndex === 0} >
                        <List >
                            <List.Item key='0'>
                                <List.Icon
                                    size='big'
                                    color='yellow'
                                    name='user'
                                />
                                <List.Content className="confirm--content_title">First Name:
                                    <span>{" "}{user && user.firstName}</span>
                                </List.Content>
                            </List.Item>
                            <List.Item key='1'>
                                <List.Icon
                                    name='users'
                                    size='big'
                                    color='yellow'
                                />
                                <List.Content className="confirm--content_title">Last Name:
                                    <span>{" "}{user && user.lastName}</span>
                                </List.Content>
                            </List.Item>
                            <List.Item key='2'>
                                <List.Icon
                                    name='mail'
                                    size='big'
                                    color='yellow'
                                />
                                <List.Content className="confirm--content_title">Email:
                                    <span>{" "}{user && user.email} </span>
                                </List.Content>
                            </List.Item>
                            <List.Item key="3">
                                <List.Icon
                                    name='eye slash'
                                    size='big'
                                    color='yellow'
                                />
                                <List.Content className="confirm--content_title">
                                    Password:
                                    <span>{" "}
                                        {/* {user && user.gender} */}
                                        ********
                                    </span>
                                    I will never tell
                                </List.Content>
                            </List.Item>
                        </List>
                    </Accordion.Content>



                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={handleClick}
                        style={{ fontSize: "1.3rem", color: "var(--blue)" }}
                    >
                        <Icon name='dropdown' />
                        User Professional Information
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <List>
                            <List.Item key="4">
                                <List.Icon
                                    name='marker'
                                    size='big'
                                    color='yellow'
                                />
                                <List.Content className="confirm--content_title">Your City: <span>{" "}{enteredPersonalForm.city}</span> </List.Content>
                            </List.Item>
                            <List.Item key="5">
                                <List.Icon
                                    name='map outline'
                                    size='big'
                                    color='yellow'
                                />
                                <List.Content
                                    className="confirm--content_title"
                                >Your Street:
                                    <span>{" "}{enteredPersonalForm.street}</span>
                                </List.Content>
                            </List.Item>
                            <List.Item key="6">
                                <List.Icon
                                    name='phone'
                                    size='big'
                                    color='yellow'
                                />
                                <List.Content className="confirm--content_title">
                                    Phone number:
                                    <span>
                                        {" "}{enteredPersonalForm.phone}
                                    </span>
                                </List.Content>
                            </List.Item>
                            <List.Item key="7">
                                <List.Icon
                                    size='big'
                                    color='yellow'
                                    name='birthday cake' />
                                <List.Content className="confirm--content_title">
                                    <span>Day of Birth:
                                        <Moment format='DD/MM/YYYY'>
                                            {enteredPersonalForm.dob}
                                        </Moment></span>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Accordion.Content>



                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={handleClick}
                        style={{ fontSize: "1.3rem", color: "var(--blue)" }}
                    >
                        <Icon name='dropdown' />
                        Confirm Details
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2} >
                        <List>
                            <List.Item key="8">
                                <List.Icon
                                    name='edit'
                                    size='big'
                                    color='yellow'
                                />
                                <List.Content className="confirm--content_title">Categories:{" "} {enteredCategories && enteredCategories.map(cat => (
                                    <li key={cat.id}><i className="fas fa-star-of-life"></i>{" "} {cat}</li>))}
                                </List.Content>
                            </List.Item>
                            <List.Item key="9">
                                <List.Icon
                                    name='tags'
                                    size='big'
                                    color='yellow'
                                />
                                <List.Content className="confirm--content_title">Sub Categories:
                                    <span>{tags ?
                                        tags.map(item => (
                                            <li key={item.value}><i className="fas fa-star-of-life"></i>{item.label}</li>
                                        )) : " "
                                    }

                                    </span>

                                </List.Content>
                            </List.Item>
                            <List.Item key="10">
                                <List.Icon
                                    name='rocket'
                                    size='big'
                                    color='yellow'
                                />
                                <List.Content className="confirm--content_title">
                                    Something about yourself:<span>{" "}{bioData}</span>
                                </List.Content>
                            </List.Item>
                            <List.Item key="11">
                                <List.Icon
                                    name='camera retro'
                                    size='big'
                                    color='yellow'
                                />
                                <List.Content className="confirm--content_title">
                                    your photo:
                                    <div className='confirm--border_1'>
                                        <div className='confirm--border_2'>
                                            <div className='confirm--border_3'>
                                                {image
                                                    ? <img
                                                        alt="profile"
                                                        src={image}
                                                        style={imgStyle} />
                                                    : <img
                                                        alt="avatar"
                                                        style={imgStyle}
                                                        src={avatar}
                                                    />}
                                            </div>
                                        </div>
                                    </div>
                                </List.Content>
                            </List.Item>
                        </List>

                    </Accordion.Content>
                </Accordion>
            </div>


            <FormGroup  >
                <Button
                    className="confirm--buttons"
                    onClick={back}
                    color="warning"
                    type="submit">
                    Previous Step
                </Button>
                <Button
                    className="confirm--buttons"

                    onClick={saveAndContinue}
                    color="warning"
                    type="submit">
                    Submit the form
                </Button>
            </FormGroup>

        </div>
    );
};

Confirm.propTypes = {
    createProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,

})
export default connect(mapStateToProps, { createProfile, getCurrentProfile })(Confirm);

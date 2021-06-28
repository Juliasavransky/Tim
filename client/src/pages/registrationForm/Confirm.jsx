import React, { useState, useEffect } from 'react';
import { Button, FormGroup, Container } from 'reactstrap';
import { Accordion, Icon, List, Image } from 'semantic-ui-react'

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

    enteredPersonalForm,
    enteredCategories,
    bioData,
    enteredFile,
    enteredSubCategories
}) => {

    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile]);



    console.log('enteredFile---from confirm', enteredFile && enteredFile);

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

//    // user img preview
//     useEffect(() => {
//         if (enteredFile[0]) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 if (reader.readyState === 2) {
//                     setImage(reader.result)
//                 }
//             }
//             reader.readAsDataURL(enteredFile[0])
            
//         } else {
//             <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
//         }


//     }, [enteredFile]);

    //img style
    const imgStyle = {
        display: 'block',
        width: '250px',
        objectFit: 'cover',
        borderRadius: '19% 81% 40% 60% / 73% 83% 17% 27%',
    };

    return (
        <div>
            <Container >
                <h2>Confirm your Details</h2>
                <Accordion styled>

                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={handleClick}
                    >
                        <Icon name='dropdown' />
                        Details Part 1
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0} >
                        <List>
                            <List.Item key='0'>
                                <List.Icon name='user' />
                                <List.Content>First Name:
                                    <span>{user && user.firstName}</span> 
                                    </List.Content>
                            </List.Item>
                            <List.Item key='1'>
                                <List.Icon name='users' />
                                <List.Content>Last Name: 
                                    <span>{user && user.lastName}</span>
                                    </List.Content>
                            </List.Item>
                            <List.Item key='2'>
                                <List.Icon name='mail' />
                                <List.Content>Email: 
                                    <span>{user && user.email} </span>
                                </List.Content>
                            </List.Item>
                            <List.Item key="3">
                                <List.Icon name='eye slash' />
                                <List.Content>
                                    Password:
                                    <span>{user && user.gender}</span> 
                                     I will never tell
                                </List.Content>
                            </List.Item>
                        </List>
                    </Accordion.Content>



                    <Accordion.Title
                        active={activeIndex === 1}
                        index={1}
                        onClick={handleClick}
                    >
                        <Icon name='dropdown' />
                        Details Part 2
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <List>
                            <List.Item key="4">
                                <List.Icon name='marker' />
                                <List.Content>Your City: <span>{enteredPersonalForm.city}</span> </List.Content>
                            </List.Item>
                            <List.Item key="5">
                                <List.Icon name='map outline' />
                                <List.Content>Your Street:<span>{enteredPersonalForm.street}</span>  </List.Content>
                            </List.Item>
                            <List.Item key="6">
                                <List.Icon name='phone' />
                                <List.Content>
                                    Phone number:<span>{enteredPersonalForm.phone}</span>
                                </List.Content>
                            </List.Item>
                            <List.Item key="7">
                                <List.Icon name='birthday cake' />
                                <List.Content>
                                    Day of Birth:<span>{enteredPersonalForm.dob}</span>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Accordion.Content>



                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={handleClick}
                    >
                        <Icon name='dropdown' />
                        Details Part 3
                     </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2} >
                        <List>
                            <List.Item key="8">
                                <List.Icon name='edit' />
                                <List.Content>Categories: {enteredCategories && enteredCategories.map(cat => (
                                    <li key={cat.id}>{<span>&#10024;</span>} {cat}</li>))}
                                </List.Content>
                            </List.Item>
                            <List.Item key="9">
                                <List.Icon name='tags' />
                                <List.Content>Sub Categories:
                                    <h3>{tags ?
                                        tags.map(item => (
                                            <li key={item.value}>{item.label}</li>
                                        )) : <span>&#10024;</span>
                                    }

                                    </h3>

                                </List.Content>
                            </List.Item>
                            <List.Item key="10">
                                <List.Icon name='rocket' />
                                <List.Content>
                                    Something about yourself:<p>{bioData.bio}</p>
                                </List.Content>
                            </List.Item>
                            <List.Item key="11">
                                <List.Icon name='camera retro' />
                                <List.Content>
                                    your photo:
                                  {image
                                        ? <img
                                            alt="profile"
                                            src={image}
                                            style={imgStyle} />
                                        : <Image
                                            alt="avatar"
                                            rounded
                                            style={imgStyle}
                                            src='https://react.semantic-ui.com/images/avatar/large/jenny.jpg'
                                        />}
                                </List.Content>
                            </List.Item>
                        </List>

                    </Accordion.Content>
                </Accordion>


                <FormGroup >
                    <Button
                        onClick={back}
                        color="success"
                        type="submit">
                        Previous Step
                </Button>
                    <Button
                        onClick={saveAndContinue}
                        color="success"
                        type="submit">
                        Submit the form
                </Button>

                </FormGroup>
            </Container>

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

import React from 'react';
import PropTypes from 'prop-types';
import { Rating, Container, Header, Image, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment'



const UserProfileData = ({
    profile: { city, dob, categories, subCategories, avatar, bio,
        user: { firstName, lastName, gender, email }
    } 
}) => {

    const userProfileAvatar = gender === 'female' ? 'ade' : 'elliot';
    const userProfileImg = avatar;
    const fName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const lName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

    return (
        <Container text >
            <Header as='h1'> {fName}{' '}{lName}</Header>


            <Image rounded size='small'
                src={userProfileImg
                    ? userProfileImg
                    : `https://react.semantic-ui.com/images/avatar/large/${userProfileAvatar}.jpg`} />

            <Header as='h2'>about me</Header>
            <p>{bio && bio}</p>

            <Header as='h2'>What I can do for you...</Header>
            {categories.map((cat, index) => (<li key={index}>{cat}</li>))}
            <br />
            <br />
            {subCategories.map(sub => (<li key={sub.value}>{sub.label.charAt(0).toUpperCase() + sub.label.slice(1)}</li>))}
            {city && city}
            <br />
            <br />
            <div>Birthday at :<Moment format='DD/MM/YYYY'>{dob}</Moment></div>
            <br />
            <br />

            <div>
                send email to user
                <Icon aria-hidden="true" link name='mail' size='huge' />
            </div>



            <Link to="/usersList">
                <Button>
                    Back to profiles List
             </Button>
            </Link>


            <Link to="/ordersForm">
                <Button>
                    Order one of the Services
             </Button>
            </Link>


        </Container>
    );
};

UserProfileData.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default UserProfileData;
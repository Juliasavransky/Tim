import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List, Container, Label } from 'semantic-ui-react';
import man from '../../components/man.jpg';
import woman from '../../components/woman.jpg';
import './profileItem.css';

//redux
import PropTypes from 'prop-types';

const ProfileItem = (
    { profile:
        {
            user: { _id, firstName, lastName, gender },
            avatar,
            subCategories,
            city
        }
    }) => {

    const userProfileAvatar = gender && gender === 'female' ? woman : man;
    const userProfileImg = avatar && avatar && avatar.length > 0 ? avatar : userProfileAvatar;

    return (
        <Container >
            <List relaxed='very'>
                <List.Item>

                    <List.Content className="profileItem--content">
                        <Link
                            to={`/userProfile/${_id}`}
                        >
                            <div className='profileItem--border_1'>
                                <div className='profileItem--border_2'>
                                    <div className='profileItem--border_3'>
                                        <img className='profileItem--img'
                                            src={userProfileImg
                                                ? userProfileImg
                                                : userProfileAvatar}
                                        />
                                    </div>
                                </div>
                            </div>



                            <List.Header >
                                {firstName.charAt(0).toUpperCase() + firstName.slice(1)}
                                {" "}
                                {lastName.charAt(0).toUpperCase() + lastName.slice(1)}


                            </List.Header>

                            <List.Description>
                                <List.Icon name='map outline' />{' '}
                                {city && city.charAt(0).toUpperCase() + city.slice(1)}


                            </List.Description>

                            <List.Description>
                                {subCategories.map(tag => (
                                    <Label key={tag._id} tag>
                                        {tag.label.charAt(0).toUpperCase() + tag.label.slice(1)}
                                    </Label>
                                ))}
                            </List.Description>
                        </Link>
                    </List.Content>
                </List.Item>
            </List>
        </Container>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;
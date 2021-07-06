import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List, Container, Label } from 'semantic-ui-react';

//redux
import PropTypes from 'prop-types';

const UsersListBySearchItem = (
    { profile: {
        user: { _id, firstName, lastName, gender },
        avatar,
        subCategories,
        city
    } }) => {

    // const avatar = user && user.gender === 'female' ? woman : man;
    // const userProfileImg = profile && profile.avatar && profile.avatar.length > 0 ? profile.avatar : avatar;

    return (
        <Container>
            <List relaxed='very'>
                <List.Item>

                    <List.Content>
                        <Link
                            to={`/userProfile/${_id}`}
                        >

                            {/* <Image
                                rounded
                                size='small'
                                src={userProfileImg
                                    ? userProfileImg
                                    : `https://react.semantic-ui.com/images/avatar/large/${userProfileAvatar}.jpg`} /> */}

                            <br />
                            <br />

                            <List.Header >
                                {firstName.charAt(0).toUpperCase() + firstName.slice(1)}
                                {" "}
                                {lastName.charAt(0).toUpperCase() + lastName.slice(1)}
                                <br />
                                <br />

                            </List.Header>

                            <List.Description>
                                <List.Icon name='map outline' />{' '}
                                {city && city.charAt(0).toUpperCase() + city.slice(1)}
                                <br />
                                <br />

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

UsersListBySearchItem.propTypes = {
    profile: PropTypes.object.isRequired

};

export default UsersListBySearchItem;
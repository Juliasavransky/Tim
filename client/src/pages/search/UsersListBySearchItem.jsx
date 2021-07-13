import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Label } from 'semantic-ui-react';
import man from '../../components/man.jpg';
import woman from '../../components/woman.jpg';
import './usersListBySearchItem.css';

//redux
import PropTypes from 'prop-types';

const UsersListBySearchItem = (
    { profile: {
        user: { _id, firstName, lastName, gender },
        avatar,
        subCategories,
        city
    } }) => {

    const userProfileAvatar = gender && gender === 'female' ? woman : man;
    const userProfileImg = avatar && avatar.length > 0 ? avatar : userProfileAvatar;

    return (


        <div className="usersListBySearchItem--comp">
            <div className="usersListBySearchItem--content">
            <Link
                to={`/userProfile/${_id}`}
                style={{ textDecoration: 'none' }}
            >
                <div className="usersListBySearchItem--borders">
                    <div className="usersListBySearchItem--imgborder1">
                        <div className="usersListBySearchItem--imgborder2">
                            <div className="usersListBySearchItem--imgborder3">
                                <Image
                                    size="medium"
                                    className="usersListBySearchItem--img"
                                    src={userProfileImg
                                        ? userProfileImg
                                        : userProfileAvatar} />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="usersListBySearchItem--text">
                    <h3 >
                        {firstName.charAt(0).toUpperCase() + firstName.slice(1)}
                        {" "}
                        {lastName.charAt(0).toUpperCase() + lastName.slice(1)}
                    </h3>

                    <h4>
                        <i className="far fa-map"></i>
                        {city && city.charAt(0).toUpperCase() + city.slice(1)}
                    </h4>

                    <div>
                        {subCategories.map(tag => (
                            <Label key={tag._id} tag>
                                {tag.label.charAt(0).toUpperCase() + tag.label.slice(1)}
                            </Label>
                        ))}
                    </div>
                </div>
            </Link>
            </div>
        </div>

    );
};

UsersListBySearchItem.propTypes = {
    profile: PropTypes.object.isRequired

};

export default UsersListBySearchItem;
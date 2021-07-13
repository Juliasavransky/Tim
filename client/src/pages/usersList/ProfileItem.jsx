import React from 'react';
import { Link } from 'react-router-dom';
import { Label } from 'semantic-ui-react';
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


        <div
            className="profileItem--content">
            <Link
                to={`/userProfile/${_id}`}
                style={{ textDecoration: 'none' }}
            >
                <div className="profileItem--imgItem">
                    <div className='profileItem--border_1'>
                        <div className='profileItem--border_2'>
                            <div className='profileItem--border_3'>
                                <img 
                                className='profileItem--img'
                                    src={userProfileImg
                                        ? userProfileImg
                                        : userProfileAvatar}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='profileItem--text'>
                    <h1 className="name">
                        {firstName.charAt(0).toUpperCase() + firstName.slice(1)}
                        {" "}
                        {lastName.charAt(0).toUpperCase() + lastName.slice(1)}


                    </h1>

                    <h2>
                        <i className="far fa-map"></i>
                        {city && city.charAt(0).toUpperCase() + city.slice(1)}


                    </h2>

                    <h2 >
                        {subCategories.map(tag => (
                            <Label className="profileItem--tags" key={tag._id} tag>
                                {tag.label.charAt(0).toUpperCase() + tag.label.slice(1)}
                            </Label>
                        ))}
                    </h2>
                </div>


            </Link>
        </div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileItem;
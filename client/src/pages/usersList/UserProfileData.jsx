import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Image, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './userProfileData.css';
import man from '../../components/man.jpg';
import woman from '../../components/woman.jpg';



const UserProfileData = ({
    profile: { city, dob, categories, subCategories, avatar, bio,
        user: { firstName, lastName, gender, email, _id }
    }
}) => {

    const userProfileAvatar = gender === 'female' ? woman : man;
    const userProfileImg = avatar && avatar.length > 0 ? avatar : userProfileAvatar;
    const fName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const lName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

    return (
        <div className="userProfileData--comp">

            <div className="userProfileData--contentUp">
                <div>
                    <h5> {fName}{' '}{lName}</h5>
                    <div className="userProfileData--borderRadius1">
                        <div className="userProfileData--borderRadius2">
                            <div className="userProfileData--borderRadius3">
                                <img className="userProfile-img"
                                  
                                    src={userProfileImg} />
                            </div>
                        </div>
                    </div>
                    <h5>lives in - {city && city}</h5>
                </div>

                <div className="userProfileData--categories">
                    <h2 >What I can do for you...
                        {categories
                            .map((cat, index) => (
                                <li key={index}><i className="fas fa-splotch">{cat}</i>
                                </li>))}
                    </h2>


                    <h2>More ditels about the categories
                        {subCategories.map(sub => (
                            <li key={sub.value}>
                                <i className="fas fa-splotch">
                                    {sub.label
                                        .charAt(0)
                                        .toUpperCase()
                                        + sub.label.slice(1)
                                    }</i>
                            </li>))}</h2>


                </div>
            </div>


            <div className="userProfileData--about">
                <h2 >About me</h2>
                <p>{bio && bio}</p>
            </div>

            <div className="userProfile--links">
                <div>
                    <i className="fas fa-birthday-cake">
                    </i> Send congrats at :
                    <Moment format='DD/MM'>{dob}
                    </Moment>
                </div>

                <div >
                    <a href={
                        `mailto:${email && email}?subject=Hello,%20this%20is%20${fName}%20${lName}%20from%20the%20Time%20bank`}>
                    <i className="far fa-paper-plane"></i>
                  {" "} Contact me
                    </a>
                </div>
            </div>


            <div className="userProfile--btn">
                <Link className="userProfileData--buttons" to="/usersList">
                    <div><i class="fas fa-arrow-left"></i>
                       {" "} Back to profiles List
                    </div>
                </Link>


                <Link className="userProfileData--buttons" to={`/ordersForm/userProfile/${_id}`}>
                    <div>
                        Order one of the Services
                    </div>

                </Link>
         
            </div>


        </div>
                );
};

                UserProfileData.propTypes = {
                    profile: PropTypes.object.isRequired,
};

                export default UserProfileData;
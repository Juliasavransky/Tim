import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import './userDashboard.css';
import man from '../../components/man.jpg';
import woman from '../../components/woman.jpg';

//redux
import { connect } from 'react-redux';
import { getCurrentProfile } from './../../actions/profile';

import PropTypes from 'prop-types';

const UserDashboard = ({
    getCurrentProfile,
    match,
    auth: { user },
    profile: { profile, loading },
}) => {

    useEffect(() => {
        getCurrentProfile()
    }, []);

    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile]);

    const avatar = user && user.gender === 'female' ? woman : man;
    const userProfileImg = profile && profile.avatar && profile.avatar.length > 0 ? profile.avatar : avatar;



    const city = profile && profile.city
    const bio = profile && profile.bio;
    const balance = user && user.balance;

    const categories = profile?.categories
        .map((cat, index) => (
            <li key={index}
                className="category--li">
                <i className="fas fa-splotch">{" "}{cat}
                </i>
            </li>
        ));

    const subCategories = profile?.subCategories
        .map((sub) => (
            <li
                className="category--li"
                key={sub.value}>
                <i className="fas fa-splotch">
                    {" "}{sub.label
                        .charAt(0)
                        .toUpperCase()
                        + sub.label.slice(1)}
                </i> </li>
        ));


    return loading && profile === null
        ? <Spinner />
        : <Fragment>
            <div className="userDashboard--comp">
                <div className="userDashboard--contentUp" >

                    <div className="userDashboard--contentUp_name">
                        <h1 className="userDashboard--header"> Welcome
                            {" "} {user?.firstName.charAt(0).toUpperCase() + user?.firstName.slice(1)}
                            {' '}
                            {user?.lastName.charAt(0).toUpperCase() + user?.lastName.slice(1)}
                        </h1>

                        <div className='userDashboard--contentDown_buttons'>

                            <Link to={`/orders/user/${user?._id}`}>
                                <div className='handshake'>
                                    <i className="far fa-handshake"></i>
                                    {" "} My activities
                                </div>
                            </Link>
                        </div>

                    </div>

                    <div className="userDashboard--contentUp_avatar" >
                        <div>
                            <div className='userDashboard--border_1'>
                                <div className='userDashboard--border_2'>
                                    <div className='userDashboard--border_3'>
                                        <img
                                            className="UserDashboard--avatar"
                                            src={userProfileImg
                                                ? userProfileImg
                                                : avatar}
                                            style={{
                                                'borderRadius': '53% 47% 47% 53% / 28% 27% 73% 72% ',
                                                border: "3px solid var(--red)"
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='userDashboard--categories'>
                            <h3>Main Categories  {categories}</h3>
                            <h3>More ditels about the categories  {subCategories}</h3>
                        </div>
                    </div>

                    <h1 className="userDashboard--city">City -
                        {city && city.charAt(0).toUpperCase() + city.slice(1)}
                    </h1>

                </div>

                <div className="userDashboard--contentDown">
                    <h3 className="userDashboard--about">
                        <div>About me</div>
                        {bio && bio}
                    </h3>

                    {profile !== null
                        ? (<div className='userDashboard--update'>
                            <Link to="userProfileRegistration">
                                <div className="handshake" ><i className="far fa-edit"></i>{" "}Updating the profile</div>
                            </Link>
                        </div>)

                        : (<div className='userDashboard--update'>
                            <Link to="userProfileRegistration">
                                <div className="handshake" >
                                    <i className="far fa-edit">
                                    </i>{" "}Tell us more info about yourself
                                </div>
                            </Link>
                        </div>)
                    }

                </div>
            </div>

        </Fragment>;


};

UserDashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile })(UserDashboard);
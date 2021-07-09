import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Rating, Container, Header, Image, Button } from 'semantic-ui-react';
import Spinner from '../../components/Spinner';
import Moment from 'react-moment';
import './userDashboard.css';
import man from '../../components/man.jpg';
import woman from '../../components/woman.jpg'

//redux
import { connect } from 'react-redux';
import { getCurrentProfile } from './../../actions/profile';
import { getOrdersByUserId } from './../../actions/orders';

import PropTypes from 'prop-types';

const UserDashboard = ({
    getCurrentProfile,
    getOrdersByUserId,
    match,
    auth: { user },
    profile: { profile, loading },
}) => {

    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile]);

    useEffect(() => {
        getOrdersByUserId(match.params.id);
    }, [getOrdersByUserId, match.params.id]);


    const avatar = user && user.gender === 'female' ? woman : man;
    const userProfileImg = profile && profile.avatar && profile.avatar.length > 0 ? profile.avatar : avatar;

  

    const city = profile && profile.city
    const street = profile && profile.street
    const phone = profile && profile.phone;
    const bio = profile && profile.bio;
    const balance = user && user.balance;

    const dob = profile && profile.dob;


    const categories = profile && profile.categories.map((cat, index) => (<li key={index}>{cat}</li>));
    const subCategories = profile && profile.subCategories.map((sub) => (<li key={sub.value}>{sub.label.charAt(0).toUpperCase() + sub.label.slice(1)}</li>));


    return loading && profile === null
        ? <Spinner />
        : <Fragment>

            <Container text >


                <h1 className="userDashboard--header"> Welcome {user && user.firstName}{' '}{user && user.lastName}</h1>
                <div className="userDashboard--avatar_container">
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
                                        border:"3px solid var(--red)"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </Container>

            <Container>

                {profile !== null
                    ? (<Container>
                        <Link to="userProfileRegistration">
                            <Button content='updating the profile' size='big' />
                        </Link>
                    </Container>)

                    : (<Container>
                        <Link to="userProfileRegistration">
                            <Button content='Tell us more info about yourself' size='big' />
                        </Link>
                    </Container>)
                }

                <h3>city -{city && city.charAt(0).toUpperCase() + city.slice(1)}</h3><br />
                <h3>street -{street && street.charAt(0).toUpperCase() + street.slice(1)}</h3><br />
                <h3>phone- {phone && phone}</h3><br />

                <h3>Birthday at:<Moment format='DD/MM/YYYY'>{dob}</Moment></h3>


                <h3>bio -{bio && bio}</h3><br />
                <h3>categories- {categories}</h3><br />
                <h3>subCategories- {subCategories}</h3><br />

                <h2>
                    My Balances:
                    <span style={{ fontSize: '2em', color: 'orange' }}>
                        <i className="fas fa-piggy-bank"> = {balance}</i>
                    </span>
                </h2>

                <Link to={`/orders/user/${user?._id}`}>
                    <Button content='My activities' size='big' />
                </Link>


            </Container>
        </Fragment>;


};

UserDashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    getOrdersByUserId: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})
export default connect(mapStateToProps, { getCurrentProfile, getOrdersByUserId })(UserDashboard);
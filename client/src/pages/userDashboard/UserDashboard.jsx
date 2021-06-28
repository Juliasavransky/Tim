import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Rating, Container, Header, Image, Button } from 'semantic-ui-react';
import Spinner from '../../components/Spinner';
import Moment from 'react-moment'


//redux
import { connect } from 'react-redux';
import { getCurrentProfile } from './../../actions/profile';
import PropTypes from 'prop-types';

const UserDashboard = ({
    getCurrentProfile,
    auth: { user },
    profile: { profile, loading },
}) => {

    useEffect(() => {
        getCurrentProfile()
    }, [getCurrentProfile]);

    const avatar = user && user.gender === 'female' ? 'ade' : 'elliot';

    const city = profile && profile.city
    const street = profile && profile.street
    const phone = profile && profile.phone;
    const bio = profile && profile.bio;
    const userProfileImg = profile && profile.avatar;
    const balance = user && user.balance;

    const dob = profile && profile.dob;


    const categories = profile && profile.categories.map((cat, index) => (<li key={index}>{cat}</li>));
    const subCategories = profile && profile.subCategories.map((sub) => (<li key={sub.value}>{sub.label.charAt(0).toUpperCase() + sub.label.slice(1)}</li>));


    return loading && profile === null
        ? (<Spinner />)
        : (<Fragment>
            <Container text >
                <Header as='h1'> Welcome {user && user.firstName}{' '}{user && user.lastName}</Header>

                <Image rounded size='small'
                    src={userProfileImg
                        ? userProfileImg
                        : `https://react.semantic-ui.com/images/avatar/large/${avatar}.jpg`} />

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


                <div>
                    My Rating
                <Rating maxRating={5} defaultRating={1} icon='star' size='massive' />
                </div>

                <h2>
                    My Balances: 
                    <span style={{ fontSize: '2em', color: 'orange' }}>
                        <i className="fas fa-piggy-bank"> = {balance}</i>
                    </span>
                </h2>

            </Container>
        </Fragment>);


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
import React, { Fragment, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import UserProfileData from '../../pages/usersList/UserProfileData';

//redux
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import PropTypes from 'prop-types'



const UserProfile = ({
    getProfileById,
    profile: { profile, loading },
    auth, match
}) => {

    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (<Fragment>
        {profile === null || loading
            ? <Spinner />
            : <Fragment>
                <UserProfileData
                    key={profile._id}
                    profile={profile}
                />

            </Fragment>
        }
    </Fragment>


    );
};
UserProfile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})
export default connect(mapStateToProps, { getProfileById })(UserProfile);

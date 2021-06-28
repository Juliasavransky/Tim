import React, { Fragment, useEffect } from 'react';
import {  Container } from 'semantic-ui-react';
import Spinner from '../../components/Spinner';
import ProfileItem from './ProfileItem';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';


const UsersList = ({ getProfiles, profile: { profiles, loading } }) => {

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return <Fragment>

    {loading ? <Spinner /> : <Fragment>
      <Container  >
        {profiles.length > 0 ? (
          profiles.map(profile => (
            <ProfileItem  key={profile._id} profile={profile}/>
          ))
        ):<div>no profiles</div>}
      </Container>
    </Fragment>}

  </Fragment>;


};
UsersList.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(UsersList);
import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import Spinner from '../../components/Spinner';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileByCategories } from '../../actions/profile';
import UsersListBySearchItem from './UsersListBySearchItem';

const UsersListBySearchResults = ({
    getProfileByCategories,
    profile: { profiles, loading },
    auth, match
}) => {
    useEffect(() => {
        getProfileByCategories(match.params.categories);
    }, [getProfileByCategories, match.params.categories]);

    return <Fragment>

        {loading
            ? <Spinner />
            : <Fragment>
                <Container  >
                    {profiles.length > 0 
                    ? (
                        profiles.map(profile => (
                            <UsersListBySearchItem 
                            key={profile._id} 
                            profile={profile} />
                        ))
                    ) 
                    : <div>no profiles </div>}
                </Container>
            </Fragment>}

    </Fragment>;
};

UsersListBySearchResults.propTypes = {
    getProfileByCategories: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfileByCategories })(UsersListBySearchResults);
import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import SearchBar from './SearchBar';
import Spinner from '../../components/Spinner';
import { getCategories } from '../../utils/categoriesOptions'


//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';
import SearchByCategories from './SearchByCategories';



const SearchPage = ({
    getProfiles, profile: { profiles, loading }
}) => {

    useEffect(() => {
        getProfiles();

    }, [getProfiles]);

    const categoriesToRender = getCategories();

    return <Fragment>
        {loading
            ? <Spinner />
            : <Fragment>
                <Container textAlign='center' >


                    <SearchBar 
                    profile={profiles} 
                    />

                    <SearchByCategories profile={profiles}
                        categoriesToRender={categoriesToRender} 
                        />

                

                </Container>
            </Fragment>}
    </Fragment>;

};

SearchPage.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(SearchPage);



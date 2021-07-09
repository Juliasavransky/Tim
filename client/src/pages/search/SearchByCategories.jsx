import React, { Fragment, useEffect } from 'react';
import SearchItem from './SearchItem'
import Spinner from '../../components/Spinner';
import { getCategories } from '../../utils/categoriesOptions';


//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';

const SearchByCategories = ({ getProfiles, profile: { profiles, loading } }) => {

    useEffect(() => {
        getProfiles();

    }, [getProfiles]);

    const categoriesToRender = getCategories();
    return <Fragment>
        {loading
            ? <Spinner />
            : <Fragment>
                <div
                    className="searchByCategories--comp" >

                    {profiles.length > 0 ? (
                        <SearchItem
                            className="searchByCategories"
                            profile={profiles}
                            categoriesToRender={categoriesToRender}

                        />
                    ) : <div>No profiles found</div>}

                </div>
            </Fragment>}
    </Fragment>;

};

SearchByCategories.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfiles })(SearchByCategories);
import React, { Fragment, useEffect } from 'react';
import SearchItem from './SearchItem'
import Spinner from '../../components/Spinner';
import { getCategories } from '../../utils/categoriesOptions';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileByCategories } from '../../actions/profile';


const SearchByCategories = ({
    getProfileByCategories,
    profile: { profiles, loading }
}) => {

    useEffect(() => {
        getProfileByCategories();
    }, [getProfileByCategories,]);



    const categoriesToRender = getCategories();
    return <Fragment>
        {loading
            ? <Spinner />
            : <Fragment>
                <div className="searchByCategories">

                    {categoriesToRender.length > 0 ? (
                        categoriesToRender.map((category => (
                            <SearchItem
                                key={category.id}
                                category={category}
                            />
                        )))
                    ) : <div>no categories</div>}

                </div>
            </Fragment>}
    </Fragment>;

};

SearchByCategories.propTypes = {
    getProfileByCategories: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfileByCategories })(SearchByCategories);
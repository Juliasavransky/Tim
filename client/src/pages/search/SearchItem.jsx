import React, { Fragment, useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './searchItem.css';


//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileByCategories } from '../../actions/profile';



const SearchItem = ({
    categoriesToRender,
    getProfileByCategories,
    profile: { profiles, loading },
    auth, match
}) => {

    const [categorySelected, setCategorySelected] = useState("");

    // useEffect(() => {
    //     getProfileByCategories(categorySelected);
    // }, [getProfileByCategories]);

    useEffect(() => {
        (async () => {
            await getProfileByCategories(categorySelected)
        })()
        console.log(categorySelected)
    }, [getProfileByCategories, categorySelected]);

    return (
        <div className="searchByCategories"  >
            <div className="searchItem--comp">

                <Link
                    className="searchItem--comp"
                    to={`/userProfile/categories/${categorySelected}`}
                >
                    {categoriesToRender !== null &&
                        categoriesToRender.length > 0 &&
                        categoriesToRender.map((cat, index) => (
                            <div
                                onClick={() => { setCategorySelected( cat.key )}}
                                key={index}
                                className="searchItem--item"
                            >
                                <div >
                                    <Icon
                                        name={cat.content.props.icon}
                                        size='huge' />
                                    <h3 >{cat.key}</h3>
                                    <h5 >{cat.text}</h5>
                                </div>

                            </div>
                        ))}
                </Link>
            </div>
        </div >

    );
};

SearchItem.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByCategories: PropTypes.func.isRequired,

}
const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfileByCategories })(SearchItem);
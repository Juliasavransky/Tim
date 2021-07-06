import React, { Fragment, useEffect, useState } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import './searchBarHomePage.css';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles, getProfileByCategories } from '../../actions/profile';


const SearchBarHomePage = ({
    getProfiles,
    getProfileByCategories,
    profile: { profiles, loading }
}) => {

    const [categorySelected, setCategorySelected] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    useEffect(() => {
        getProfileByCategories();
    }, [getProfileByCategories]);

    useEffect(() => {
        handleFilter(categorySelected);
    }, [categorySelected]);

    const handleFilter = (searchCat) => {
        setCategorySelected(searchCat);

        if (categorySelected) {
            const newFilter = profiles?.filter((profile) => {
                return Object.values(profile.categories)
                    .includes(searchCat)
            });
            setSearchResults(newFilter);
            console.log("newFilter",categorySelected,newFilter);
        } else {
            setSearchResults([]);
        }

        console.log("searchResults", searchResults, categorySelected)
    }

    return (
        <Fragment >
            {loading
                ? <Spinner />
                : <Fragment>
                    <Menu
                        //  secondary
                        borderless
                        stackable
                        icon='labeled'
                        size="huge"
                        className="searchBarHomePage"
                    >

                        <Menu.Item
                            onClick={() => handleFilter("pets")} >
                            <Link to={`/userProfile/categories/${categorySelected}`} >
                                <Icon
                                    className="searchBarHomePage--item"
                                    name='paw' />
                                Pets
                            </Link>
                        </Menu.Item>

                        <Menu.Item onClick={() => { handleFilter("Education and Lessons") }}>
                            <Link to={`/userProfile/categories/${categorySelected}`}>
                                <Icon
                                    className="searchBarHomePage--item"
                                    name='graduation cap' />
                                Education and Lessons
                            </Link>
                        </Menu.Item>


                        <Menu.Item onClick={() => handleFilter("Sport and Activities")}>
                            <Icon
                                className="searchBarHomePage--item"
                                name='volleyball ball' />
                            Sport and Activities
                        </Menu.Item>

                        <Menu.Item onClick={() => handleFilter("Art and music")}>
                            <Icon
                                className="searchBarHomePage--item"
                                name='music' />
                            Art and music
                        </Menu.Item>

                        <Menu.Item onClick={() => handleFilter("Alternative Medicine")}  >
                            <Icon
                                name='heartbeat'
                                className="searchBarHomePage--item"
                            />
                            Alternative Medicine
                        </Menu.Item>

                        <Menu.Item onClick={() => handleFilter("Toddlers and Children")}>
                            <Link to={`/userProfile/categories/${categorySelected}`}>
                                <Icon
                                    className="searchBarHomePage--item"
                                    name='child' />
                                Toddlers and Children
                            </Link>
                        </Menu.Item>


                        <Menu.Item onClick={() => handleFilter("Technical support")} >
                            <Icon
                                name='cogs'
                                className="searchBarHomePage--item"
                            />
                            Technical support
                        </Menu.Item>

                        <Menu.Item onClick={() => handleFilter("Care and beauty")}>
                            <Icon
                                name='lab'
                                className="searchBarHomePage--item"
                            />
                            Care and beauty
                        </Menu.Item>

                        <Menu.Item onClick={() => handleFilter("Counseling and guidance")}>
                            <Icon
                                name='law'
                                className="searchBarHomePage--item"
                            />
                            Counseling and guidance
                        </Menu.Item>

                        <Menu.Item onClick={() => handleFilter("Other")}>
                            <Icon
                                name='beer'
                                className="searchBarHomePage--item"
                            />
                            Other
                        </Menu.Item>

                    </Menu>
                </Fragment>}
        </Fragment >
    );
};

SearchBarHomePage.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    getProfileByCategories: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfiles, getProfileByCategories })(SearchBarHomePage);

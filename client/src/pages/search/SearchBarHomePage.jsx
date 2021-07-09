import React, { Fragment, useEffect, useState } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import './searchBarHomePage.css';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';

//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileByCategories } from '../../actions/profile';


const SearchBarHomePage = ({
    getProfileByCategories,
    profile: { profiles, loading },
    auth, match
}) => {

    const [categorySelected, setCategorySelected] = useState("");

    // useEffect(() => {
    //     getProfileByCategories(categorySelected);
        
    // }, [getProfileByCategories]);
    
    // console.log("categorySelected",categorySelected)
    useEffect(() => {
        (async () => {
            await getProfileByCategories(categorySelected)
        })()
        console.log('categorySelected',categorySelected)
    }, [getProfileByCategories,categorySelected]);


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
                            onClick={() => setCategorySelected("pets")} >
                            <Link to={`/userProfile/categories/${categorySelected}`} >
                                <Icon
                                    className="searchBarHomePage--item"
                                    name='paw' />
                                Pets
                            </Link>
                        </Menu.Item>

                        <Menu.Item onClick={() => { setCategorySelected("Education and Lessons") }}>
                            <Link to={`/userProfile/categories/${categorySelected}`}>
                                <Icon
                                    className="searchBarHomePage--item"
                                    name='graduation cap' />
                                Education and Lessons
                            </Link>
                        </Menu.Item>


                        <Menu.Item onClick={() => setCategorySelected("Sport and Activities")}>
                            <Icon
                                className="searchBarHomePage--item"
                                name='volleyball ball' />
                            Sport and Activities
                        </Menu.Item>

                        <Menu.Item onClick={() => setCategorySelected("Art and music")}>
                            <Icon
                                className="searchBarHomePage--item"
                                name='music' />
                            Art and music
                        </Menu.Item>

                        <Menu.Item onClick={() => setCategorySelected("Alternative Medicine")}  >
                            <Icon
                                name='heartbeat'
                                className="searchBarHomePage--item"
                            />
                            Alternative Medicine
                        </Menu.Item>

                        <Menu.Item onClick={() => setCategorySelected("Toddlers and Children")}>
                            <Link to={`/userProfile/categories/${categorySelected}`}>
                                <Icon
                                    className="searchBarHomePage--item"
                                    name='child' />
                                Toddlers and Children
                            </Link>
                        </Menu.Item>


                        <Menu.Item onClick={() => setCategorySelected("Technical support")} >
                            <Icon
                                name='cogs'
                                className="searchBarHomePage--item"
                            />
                            Technical support
                        </Menu.Item>

                        <Menu.Item onClick={() => setCategorySelected("Care and beauty")}>
                            <Icon
                                name='lab'
                                className="searchBarHomePage--item"
                            />
                            Care and beauty
                        </Menu.Item>

                        <Menu.Item onClick={() => setCategorySelected("Counseling and guidance")}>
                            <Icon
                                name='law'
                                className="searchBarHomePage--item"
                            />
                            Counseling and guidance
                        </Menu.Item>

                        <Menu.Item onClick={() => setCategorySelected("Other")}>
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
    getProfileByCategories: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfileByCategories })(SearchBarHomePage);

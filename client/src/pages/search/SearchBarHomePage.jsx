import React, { Fragment, useEffect } from 'react';
import { Icon, Menu } from 'semantic-ui-react';
import './searchBarHomePage.css';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';



//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';



const SearchBarHomePage = ({
    getProfiles,
    profile: { profiles, loading }
}) => {
    useEffect(() => {
        getProfiles();
        console.log(profiles[4]);
    }, [getProfiles]);

      // check witch category the user select 

    // const handleSelectedCategory = (categorySelected) => {
    //     const filteredCategory = profiles.categories.filter(category => category === categorySelected);
    //     console.log('filteredCategory', categorySelected)
    // }
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

                        <Menu.Item  >
                            <Icon
                                className="searchBarHomePage--item"
                                name='paw' />
                            Pets
                        </Menu.Item>

                        <Menu.Item >
                            <Icon
                                className="searchBarHomePage--item"
                                name='graduation cap' />
                            Education and Lessons
                        </Menu.Item>

                        <Menu.Item >
                            <Icon
                                className="searchBarHomePage--item"
                                name='volleyball ball' />
                            Sport and Activities
                        </Menu.Item>

                        <Menu.Item >
                            <Icon
                                className="searchBarHomePage--item"
                                name='music' />
                            Art and music
                        </Menu.Item>

                        <Menu.Item      >
                            <Icon
                                name='heartbeat'
                                className="searchBarHomePage--item"
                            />
                            Alternative Medicine
                        </Menu.Item>

                        <Menu.Item >
                            <Icon
                                className="searchBarHomePage--item"
                                name='child' />
                            Toddlers and Children
                        </Menu.Item>

                        <Menu.Item   >
                            <Icon
                                name='cogs'
                                className="searchBarHomePage--item"
                            />
                            Technical support
                        </Menu.Item>

                        <Menu.Item >
                            <Icon
                                name='lab'
                                className="searchBarHomePage--item"
                            />
                            Care and beauty
                        </Menu.Item>

                        <Menu.Item  >
                            <Icon
                                name='law'
                                className="searchBarHomePage--item"
                            />
                            Counseling and guidance
                        </Menu.Item>

                        <Menu.Item >
                            <Icon
                                name='beer'
                                className="searchBarHomePage--item"
                            />
                            Other
                        </Menu.Item>

                    </Menu>
                </Fragment>}
        </Fragment>
    );
};

SearchBarHomePage.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})
export default connect(mapStateToProps, { getProfiles })(SearchBarHomePage);
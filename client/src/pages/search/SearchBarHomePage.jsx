import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu } from 'semantic-ui-react';
import './searchBarHomePage.css';



const SearchBarHomePage = props => {
    return (
        <Fragment >
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
        </Fragment>
    );
};

SearchBarHomePage.propTypes = {

};

export default SearchBarHomePage;
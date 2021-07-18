import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image } from 'semantic-ui-react';
import tim from './tim.svg';
import SearchBar from '../../pages/search/SearchBar';
import  './navBar.css';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const NavBar = ({
    auth: { isAuthenticated, loading, user, },
    logout,
    profile: { profile }
}) => {

    const authLinks = (
        <Menu
            stackable
            tabular={'right'}
            size={'large'}
        >
            <Menu.Menu position='left'>
                <Menu.Item  >
                    <Link to="/">
                        <Image
                            avatar
                            src={tim}
                            style={{
                                width: "5em",
                                height: "5em"
                            }}
                        /></Link>
                </Menu.Item>
            </Menu.Menu>

            <Menu.Menu position='right'>

                <Menu.Item className="navBarItem">
                    <Link to="/searchPage">Search</Link>
                </Menu.Item>

                <Menu.Item className="navBarItem">
                    <Link to="/userDashboard"> My profile </Link>
                </Menu.Item>

                <Menu.Item className="navBarItem"
                    onClick={logout}
                >
                   <span className="navBarItem"> Log-out</span>
                </Menu.Item>

                <Menu.Item
                    className="navBarItem"
                >
                    <SearchBar />
                </Menu.Item>

            </Menu.Menu>


        </Menu>

    );
    const guestLinks = (
        <Menu
            stackable
            tabular={'right'}
            size={'large'}
        >
            <Menu.Menu position='left'>
                <Menu.Item  >
                    <Link to="/">
                        <Image
                            avatar
                            src={tim}
                            style={{
                                width: "5em",
                                height: "5em"
                            }}
                        /></Link>
                </Menu.Item>
            </Menu.Menu>

            <Menu.Menu position='right'>
                <Menu.Item
                    className="navBarItem"
                >
                    <Link to="/logIn">LogIn</Link>
                </Menu.Item>

                <Menu.Item
                    className="navBarItem"
                >
                    <Link to="/userRegistration">Registration</Link>
                </Menu.Item>

                <Menu.Item
                    className="navBarItem"
                >
                    <Link to="/searchPage">Search</Link>
                </Menu.Item>

                <Menu.Item
                    className="navBarItem"
                >
                    <SearchBar />
                </Menu.Item>

            </Menu.Menu>
        </Menu>
    );

    return (
        <Fragment >
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </Fragment>

    );
};

NavBar.prototype = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,

})

export default connect(mapStateToProps, { logout })(NavBar);
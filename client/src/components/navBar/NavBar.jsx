import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Icon, Input } from 'semantic-ui-react';
import tim from './tim.svg';
import SearchBar from '../../pages/search/SearchBar'

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const NavBar = ({
    auth: { isAuthenticated, loading, user, },
    logout,
    profile: { profile }
}) => {

    const userProfileAvatar = user && user.gender === 'female' ? 'ade' : 'elliot';
    const userProfileImg = profile && profile.avatar;

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
                <Menu.Item >
                    <Link to="/userRegistration">Registration</Link>
                </Menu.Item>

                <Menu.Item >
                    <Link to="/searchPage">search</Link>
                </Menu.Item>

                <Menu.Item >
                    <Link to="/orders">Orders</Link>
                </Menu.Item>

                <Menu.Item >
                    {/* <Image
                        avatar
                        src={userProfileImg
                            ? userProfileImg
                            : `https://react.semantic-ui.com/images/avatar/large/${userProfileAvatar}.jpg`} /> */}

                    <Link to="/userDashboard"> My profile </Link>
                    {/* {profile && profile.user.firstName}{" "}{profile && profile.user.lastName} */}

                </Menu.Item>

                <Menu.Item
                    onClick={logout}
                >
                    Log-out
                </Menu.Item>

                <Menu.Item>
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
                <Menu.Item >
                    <Icon
                    ><Link to="/logIn">LogIn</Link></Icon>
                </Menu.Item>

                <Menu.Item >
                    <Link to="/userRegistration">Registration</Link>
                </Menu.Item>

                <Menu.Item >
                    <Link to="//searchPage">search</Link>
                </Menu.Item>

                <Menu.Item>
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
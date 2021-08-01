import React, { useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './homePage.css';
import { Container } from 'reactstrap';



//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';
import SearchByCategories from './../search/SearchByCategories';


const Home = ({
    isAuthenticated,
    getProfiles,
    profile: { profiles, loading },

}) => {

    useEffect(() => {
        getProfiles();

    }, [getProfiles]);

    // if (isAuthenticated) {
    //   return  <Redirect to='/searchPage' />;
    // }

    return (
        <Container>

            <div className="homePage" >
                <div className="homePage-container">
                    <div className="homePage--hero">
                        <div className="homePage--hero_content">

                            <div className="homePage--hero_icons">
                                <i className="fab fa-instagram"></i>
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-facebook-f"></i>
                                <i className="fab fa-linkedin-in"></i>
                            </div>

                            <div className="homePage--hero_text">
                                <div className="homePage--hero_heder">
                                    <h2 >Welcome to </h2>
                                    <h1>T.I.M.</h1>
                                    <h2>Time Is Money</h2>
                                </div>

                                <div className="homePage--hero_btn">
                                    <Link
                                        style={{ color: 'var(--red)' }}
                                        to="/logIn">
                                        Login / Sign-up
                                    </Link>
                                </div>

                            </div>

                        </div>

                        <div className="homePage--hero_img">
                            <div className="homePage--borderRadius-1">
                                <div className="homePage--borderRadius-2">
                                    <div className="homePage--borderRadius-3">
                                        <div className="homePage--img_content">
                                            <img src='https://images.unsplash.com/photo-1569437061238-3cf61084f487?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80'
                                                style={{
                                                    'borderRadius': '53% 47% 47% 53% / 28% 27% 73% 72% ',
                                                }}

                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="homePage--hero">
                        <div className="homePage--hero_about">
                            <div >About T.I.M.</div>
                        </div>
                        <p className="homePage--hero_aboutText">
                            <div>T.I.M. - Time Bank</div>
                            <div>
                                Social Network for Exchanging knowledge, abilities, creativity, and skills between members .
                                Sign up and let us know what you can offer and  do for others.
                            </div>
                            <div>
                                For each hour of service you provide, you will receive a service of your choice from another member of the community.
                            </div>

                            <div>
                                Guitar lessons in exchange for dog training
                            </div>
                            <div>
                                A stunning shirt you designed in exchange for a massage
                            </div>
                            <div>
                                Arranging a closet in exchange for carpentry lessons
                            </div>
                            <div>  And more ...
                            </div>
                            <div>
                                Let's celebrate our abundance
                            </div>
                            <div>
                                Sign up now and get your first two hours for free
                            </div>


                        </p>
                    </div>
                </div>


            </div>
            <div className="homePage--searchByCategories">
                <SearchByCategories />
            </div>
        </Container>
    );
};

Home.propTypes = {
    isAuthenticated: PropTypes.bool,
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.profile

});

export default connect(mapStateToProps, { getProfiles })(Home);
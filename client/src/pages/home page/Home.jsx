import React, { useEffect } from 'react';
// import { Container, Button } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import Artboard from './art.svg';


//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profile';
import SearchByCategories from '../search/SearchByCategories';


const Home = ({
    isAuthenticated,
    getProfiles,
    profile: { profiles, loading },
    categoriesToRender
}) => {

    useEffect(() => {
        getProfiles();

    }, [getProfiles]);

    // if (isAuthenticated) {
    //   return  <Redirect to='/searchPage' />;
    // }

    return (
        <div >
            <div className="homePage">
                <div className="homePage--hero">
                    <div className="homePage--hero_text">
                        <h2 >Welcome to </h2>
                        <h1>T.I.M.</h1>
                        {/* <h2>Time Is Money</h2> */}
                    </div>


                    <Link to="logIn">
                        <button className="homePage--btn"  >log IN</button>
                    </Link>
                </div>

                <div className="homePage-img">
                    <img src={Artboard}
                        style={{ border: '1px solid red' }}

                    />
                </div>
                <div className="homePage">
                    <div className="homePage--about">About T.I.M.</div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
                        ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
                        magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
                        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
                        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
                        Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
                        dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                        Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
                        Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
                        viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
                        Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
                    </p>
                </div>
            </div>


            {/* <SearchByCategories /> */}

        </div>
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
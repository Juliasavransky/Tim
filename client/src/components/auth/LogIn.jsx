import React, { useState } from 'react';
import { Button, Divider, Form, Grid, Segment, Message } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import loginPage from './loginPage.css';

//redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth'


const LogIn = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",

    });

    const [error, setError] = useState();

    const {
        email,
        password,
    } = formData;

    const handleLogInChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })


    const logInSubmit = e => {
        e.preventDefault();

        login(formData);
    }

    //Redirect if user login
    if (isAuthenticated) {
        return <Redirect to="/userDashboard" />
    }
    return (
        <Segment basic>
            <Grid
                className="login-container"
                columns={2}
                stackable
            >
                <Grid.Column>
                    {error && <Message negative>
                        <Message.Header>{error.title}</Message.Header>
                        <p>{error.message}</p>
                    </Message>}
                    <Form onClick={e => logInSubmit(e)}>
                        <Form.Input
                            className="login--input"
                            onChange={e => handleLogInChange(e)}
                            type="text"
                            icon='user'
                            iconPosition='left'
                            label='Email'
                            placeholder='email'
                            name="email"
                            value={email}
                        />
                        <Form.Input
                            className="login--input"
                            onChange={e => handleLogInChange(e)}
                            icon='lock'
                            iconPosition='left'
                            label='Password'
                            type='password'
                            name="password"
                            value={password}

                        />
                        <Button 
                        fluid 
                        content='Login'
                         primary 
                         />
                    </Form>
                </Grid.Column>

                <Grid.Column 
                
                verticalAlign='middle'
                >
                    <Link to="/userRegistration">
                        <Button
                            content='Sign-up'
                            icon='signup'
                            size='big' 
                            className="login--button"
                            color='yellow'
                            />
                    </Link>
                </Grid.Column>
            </Grid>

            <Divider
                vertical
                hidden
                className="login--divider"
            >Or</Divider>
        </Segment>
    );
};

LogIn.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(LogIn);


import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import './App.css';
import Home from './pages/home page/Home';
import LogIn from './components/auth/LogIn';
import Error404 from './pages/Error404';
import UserProfile from './pages/usersList/UserProfile';
import NavBar from './components/navBar/NavBar';
import SearchPage from './pages/search/SearchPage';
import UsersList from './pages/usersList/UsersList.jsx';
import Registration from './pages/registrationForm/Registration';
import UserRegistration from './components/auth/UserRegistration';
import UserDashboard from './pages/userDashboard/UserDashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Order from './components/orders/Order';
import OrdersForm from './components/orders/OrdersForm';
import UserOrders from './pages/userDashboard/UserOrders';
import UsersListBySearchResults from './pages/search/UsersListBySearchResults';


//redux
import { Provider } from 'react-redux';
import store from './store';
import AlertComp from './components/AlertComp';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';


if (localStorage.token) {
    setAuthToken(localStorage.token)
}
const App = () => {

    useEffect(() => {
        store.dispatch(loadUser());
    }, [])

    return (
        < Provider store={store} >
            <  Router >
                <  Fragment >
                    <  NavBar />
                    < Container >
                        <AlertComp />

                        < Switch >
                            < Route exact path="/"
                                component={Home}
                            />

                            < Route path="/logIn"
                                exact component={LogIn}
                            />

                            <  Route path="/userRegistration"
                                exact component={UserRegistration}
                            />

                            <   PrivateRoute path="/userDashboard"
                                exact component={UserDashboard}
                            />

                            <   Route path="/userProfile/:id"
                                exact component={UserProfile}
                            />

                            <  PrivateRoute path="/orders/user/:id"
                                exact component={UserOrders}
                            />

                            <   PrivateRoute path="/userProfileRegistration"
                                exact component={Registration}
                            />

                            <   PrivateRoute exact path="/ordersForm/userProfile/:id"
                                component={OrdersForm}
                            />

                            <   PrivateRoute exact path="/orders/:id"
                                component={Order}
                            />

                            <  Route path="/searchPage"
                                exact component={SearchPage}
                            />

                            <  Route path="/usersList"
                                exact component={UsersList}
                            />

                            <  Route path="/userProfile/categories/:categories"
                                exact component={UsersListBySearchResults}
                            />

                            <Route
                                component={Error404}
                            />

                        </Switch>
                    </Container >
                </Fragment>
            </Router >
        </Provider>
    );
}

export default App;
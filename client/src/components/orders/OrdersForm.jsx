import React, { useState } from 'react';
import { FormGroup, Label, Input, Form } from 'reactstrap';
import { Message } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import './ordersForm.css';


//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addOrder } from '../../actions/orders';



const OrdersForm = ({
    addOrder,
    auth,
    match,
    profile,
}) => {

    const [formData, setFormData] = useState({
        text: "",
        title: "",
        dateOfServes: ""
    });


    const {
        text,
        title,
        dateOfServes,
    } = formData;

    const handleOrderChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    const [toUserDashboard, setToUserDashboard] = useState(false);
    const [error, setError] = useState();

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const orderFormSubmit = e => {
        e.preventDefault();

        let url = window.location.href;
        let urlArray = url.split("/");
        let userId = urlArray[urlArray.length - 1];
        formData['userProvider'] = userId;

        if (auth.user.balance <= 0) {
            return setError({
                title: 'Sory, you canot make order',
                message: 'The balance is 0. Please try again after providing service to another user.'
            });
        }

        sleep(2000).then(() => { setToUserDashboard(true) });

        addOrder(formData);
        setFormData({
            text: "",
            title: "",
            dateOfServes: "",
        })


    }
    //Redirect if form submited 
    if (toUserDashboard) {
        return <Redirect to="/userDashboard" />
    }

    return (

        <Form
            className="ordersForm--comp"

        >
            <h1 className="ordersForm--header" >Make an order</h1>

            {error && <Message negative>
                <Message.Header>{error.title}</Message.Header>
                <p>{error.message}</p>
            </Message>}

            <FormGroup>
                <Label
                    for="exampleEmail">
                    Which service are you looking for?
                </Label>
                <Input
                    onChange={e => handleOrderChange(e)}
                    type="text"
                    name="title"
                    value={title}
                />
            </FormGroup>

            <FormGroup>
                <Label
                    for="exampleText">
                    Tell us more about it
                </Label>
                <Input
                    onChange={e => handleOrderChange(e)}
                    type="textarea"
                    name="text"
                    value={text}
                />
            </FormGroup>

            <FormGroup>
                <Label>
                    When would you like to get the service?
                </Label>
                <Input
                    type="date"
                    name="dateOfServes"
                    placeholder="choose a date"
                    value={dateOfServes}
                    onChange={e => handleOrderChange(e)}
                />
            </FormGroup>

            <a
                onClick={e => orderFormSubmit(e)}
                className="ordersForm--btn">
                Submit
            </a>
        </Form>

    );
};

OrdersForm.propTypes = {
    addOrder: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,

};
const mapStateToProps = state => ({
    orders: state.orders,
    profile: state.profile,
    auth: state.auth
});


export default connect(mapStateToProps, { addOrder })(OrdersForm);
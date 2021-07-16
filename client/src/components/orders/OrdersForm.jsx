import React, { useState, Fragment, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './ordersForm.css';


//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addOrder } from '../../actions/orders';
import { getProfileById } from '../../actions/profile';



const OrdersForm = ({
    addOrder,
    getProfileById,
    auth,
    match,
    profile: {
        city,
        dob,
        categories,
        subCategories,
        avatar,
        bio,
        _id,
        user
    }


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

    const orderFormSubmit = e => {
        e.preventDefault();


        let url = window.location.href;
        let urlArray = url.split("/");
        let userId = urlArray[urlArray.length - 1];
        formData['userProvider'] = userId;

        addOrder(formData);
        setFormData({
            text: "",
            title: "",
            dateOfServes: ""
        })
    }

    return (

        <div
            className="ordersForm--comp"

        >
            <h1 className="ordersForm--header" >Make an order</h1>
            <FormGroup>
                <Label
                    for="exampleEmail">
                    Which service you want to receive
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
                    Tell us more about
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
                    On what day would you like to receive the service
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
        </div>

    );
};

OrdersForm.propTypes = {
    addOrder: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,


};
const mapStateToProps = state => ({
    orders: state.orders,
    profile: state.profile,
    auth: state.auth


});


export default connect(mapStateToProps, { addOrder, getProfileById })(OrdersForm);
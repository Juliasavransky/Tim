import React, { useState, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';


//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addOrder } from '../../actions/orders'


const OrdersForm = ({
    addOrder,

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

        addOrder(formData);
        setFormData({
            text: "",
            title: "",
            dateOfServes: ""
        })
    }

    return (
        <Fragment>
            <Form onSubmit={e => orderFormSubmit(e)}>
                <h1>Form for Orders!!!</h1>
                {/* <div>order from: {firstName && firstName}{' '}{lastName && lastName}</div> */}
                {/* <div>order to: {firstName && firstName}{' '}{lastName && lastName}</div> */}

                <FormGroup>
                    <Label
                        for="exampleEmail">
                        title
                        </Label>
                    <Input
                        onChange={e => handleOrderChange(e)}
                        type="text"
                        name="title"
                        placeholder="what service you want to ask for"
                        value={title}
                    />
                </FormGroup>

                <FormGroup>
                    <Label
                        for="exampleText">
                        Text Area
                         </Label>
                    <Input
                        onChange={e => handleOrderChange(e)}
                        type="textarea"
                        name="text"
                        value={text}
                        placeholder="Tell us more about the service"
                    />
                </FormGroup>

                <FormGroup>
                    <Label
                        for="exampleEmail">
                        date
                        </Label>
                    <Input
                        type="date"
                        name="dateOfServes"
                        placeholder="choose a date"
                        value={dateOfServes}
                        onChange={e => handleOrderChange(e)}
                    />
                </FormGroup>

                <Button>Submit</Button>

                {/* <Link to={`/orders/${_id}`}>
                    <Button>to order1</Button>

                </Link> */}


            </Form>
        </Fragment>
    );
};

OrdersForm.propTypes = {
    addOrder: PropTypes.func.isRequired,
    orders: PropTypes.object.isRequired,

};



export default connect(null, { addOrder })(OrdersForm);
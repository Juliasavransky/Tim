import React, { useState ,Fragment} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


//redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addConfirmation } from '../../actions/orders';


const ConfirmationForm = ({ addConfirmation ,orderId}) => {

    const [formData, setFormData] = useState({
        text: "",
        title: "",
        
    });

    const {
        text,
        title,
    } = formData;

    const handleOrderChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    const orderFormSubmit = e => {
        e.preventDefault();

        addConfirmation(orderId,(formData));
        setFormData({
            text: "",
            title: "",
        })
    }
    return (
        <Fragment>
        <Form onSubmit={e => orderFormSubmit(e)}>
            <h1>Leave a Confirmation!!!</h1>
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

            <Button>Submit</Button>

            {/* <Link to={`/orders/${_id}`}>
                <Button>to order1</Button>

            </Link> */}


        </Form>
    </Fragment>
    )
}

ConfirmationForm.propTypes = {
    addConfirmation: PropTypes.func.isRequired
}

export default connect(null,{ addConfirmation })(ConfirmationForm)

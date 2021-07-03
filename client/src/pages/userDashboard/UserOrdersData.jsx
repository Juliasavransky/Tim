import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react'

//redux
import PropTypes from 'prop-types';


const UserOrdersData = ({
    order: { text, title, dateOfServes, firstName, lastName,
        user: { gender }
    },
    profile: { avatar, city, street, }
}) => {
    return (
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src={avatar}
                />
                <Card.Header>{firstName}{" "}{lastName}</Card.Header>
                <Card.Header>title: {title}</Card.Header>

                <Card.Description> {text} </Card.Description>
            </Card.Content>

            <Card.Content >
                <div className='ui two buttons'>
                    <Button basic color='green'>
                        Approve
                    </Button>
                    <Button basic color='red'>
                        Decline
                    </Button>
                </div>
            </Card.Content>
        </Card>
    );
};

UserOrdersData.propTypes = {
    profile: PropTypes.object.isRequired,
    orders: PropTypes.object.isRequired,

};

export default UserOrdersData;
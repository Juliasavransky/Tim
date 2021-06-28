import React from 'react';
import { Step, Icon,Segment } from 'semantic-ui-react'



const Stepper = ({ step }) => {

    return (
        <Segment basic widths={4}>
        <Step.Group>

            <Step
                active={step === 1 ? true : false}
            >
                <Icon name='talk' />
                <Step.Content>
                    <Step.Title>User personal Information</Step.Title>
                </Step.Content>
            </Step>

            <Step
                active={step === 2 ? true : false}
            >
                <Icon name='briefcase' />
                <Step.Content>
                    <Step.Title>User Professional Information</Step.Title>
                </Step.Content>
            </Step>

            <Step
                active={step === 3 ? true: false}
            >
                <Icon name='thumbs up' />
                <Step.Content>
                    <Step.Title>Confirm Details</Step.Title>
                </Step.Content>
            </Step>

        </Step.Group>
        </Segment>
    );
};

export default Stepper;
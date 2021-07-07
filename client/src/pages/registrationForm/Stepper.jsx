import React from 'react';
import { Step, Icon, Segment } from 'semantic-ui-react';
import "./stepper.css";



const Stepper = ({ step }) => {

    return (
        <Segment
            basic
className="stepper"
        >
            <Step.Group
                className="stepper-comp"
            >

                <Step
                    className="stepper-step"
                    active={step === 1 ? true : false}
                >
                    <Icon
                        name='talk'
                    />
                    <Step.Content
                        className="stepper-content"
                    >
                        <Step.Title>User personal Information</Step.Title>
                    </Step.Content>
                </Step>

                <Step
                    active={step === 2 ? true : false}
                >
                    <Icon name='briefcase'

                    />
                    <Step.Content className="stepper-content">
                        <Step.Title>User Professional Information</Step.Title>
                    </Step.Content>
                </Step>

                <Step
                    active={step === 3 ? true : false}
                >
                    <Icon name='thumbs up' />
                    <Step.Content className="stepper-content">
                        <Step.Title>Confirm Details</Step.Title>
                    </Step.Content>
                </Step>

            </Step.Group>
        </Segment>
    );
};

export default Stepper;
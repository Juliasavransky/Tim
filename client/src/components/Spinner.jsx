import React from 'react';
import { Dimmer, Loader, Image, Container } from 'semantic-ui-react'


const Spinner = () => {
    return (
        <Container>
        <Dimmer active inverted>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
  
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Container>
    );
};

export default Spinner;
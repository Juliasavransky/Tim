import React, { useState ,} from 'react';
import { Dropdown, Segment,Container } from 'semantic-ui-react';
import { getCategories } from '../../utils/categoriesOptions';


const options= getCategories();
const MultipleSelectionCategories = ({ handleChangeCategory }) => {
    const [categoriesName, setCategoriesName] = useState(options)

    return (
        <Container  >
            <Dropdown
                text='Select Categories (as many as you want)'
                multiple
                selection
                require='true'
                options={options}
                onChange={handleChangeCategory}
            />
        </Container>
    );
};

export default MultipleSelectionCategories;


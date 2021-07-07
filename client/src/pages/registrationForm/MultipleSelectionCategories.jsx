import React, { useState, } from 'react';
import { Dropdown, Segment, Container } from 'semantic-ui-react';
import { getCategories } from '../../utils/categoriesOptions';


const options = getCategories();
const MultipleSelectionCategories = ({ handleChangeCategory }) => {
    const [categoriesName, setCategoriesName] = useState(options)

    return (
        <Dropdown
            style={{
                width: "100%",
                border: "2px solid black",
                borderRadius: "10px",
                fontSize: "1.2rem",
                fontWeight: "500",
                fontFamily: "var(--headings-font-family)"
            }}
            text='Select Categories (as many as you want)'
            multiple
            selection
            require='true'
            options={options}
            onChange={handleChangeCategory}
        />
    );
};

export default MultipleSelectionCategories;


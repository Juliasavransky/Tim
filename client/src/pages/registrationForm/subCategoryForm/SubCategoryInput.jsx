import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Label } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';



const customStyles = {
    options: (provided, state) => ({
        ...provided,
        border: '1px solid var(--black)',

        padding: 60,
    })
}

const SubCategoryInput = ({ onSaveTags }) => {

    const [taginputValue, setTaginputValue] = useState('');
    const [tagValue, setTagValue] = useState([]);

    const handleChange = (value, action) => {
        setTagValue(value);
    };

    const handleKeyDown = (event) => {
        if (!taginputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':

                setTagValue([...tagValue, createOption(taginputValue)]);
                setTaginputValue('')

                event.preventDefault()

                break

            default:
                break
        }
    };

    const createOption = (label) => ({
        label,
        value: uuidv4(),
    });

    useEffect(() => {
        onSaveTags(tagValue)
    }, [taginputValue])

    const handleInputChange = (value) => {
        setTaginputValue(value);
    };

    return (
        <React.Fragment>

            <CreatableSelect
                styles={customStyles}
                components={{ DropdownIndicator: null }}
                inputValue={taginputValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={handleChange}
                onInputChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type some sub-categories and press enter..."
                value={tagValue}

            />
        </React.Fragment>
    );
};

export default SubCategoryInput;
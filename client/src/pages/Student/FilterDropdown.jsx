import React from 'react'
import { Link } from 'react-router-dom';

const FilterDropdown = ({ options, selectedValue, onValueChange }) => {
    const handleItemClick = (value) => {
        onValueChange(value);
    };
    const url = "data:image/jpeg;base64,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";

    return (
        <div id="dropdownDivider" class="z-10 absolute top-40 right-1/3 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
            <ul class="py-2 text-lg text-gray-700 " aria-labelledby="dropdownDividerButton">
                {options.map((option, index) => (
                    <li key={index} class="block px-4 py-2 hover:bg-gray-100 " onClick={() => handleItemClick(option.value)}>
                        {option.label}
                    </li>
                ))}

            </ul>
        </div>
    )
}

export default FilterDropdown
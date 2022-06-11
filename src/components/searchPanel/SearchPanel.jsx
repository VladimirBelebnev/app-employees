import { useState, useEffect } from 'react';
import './searchPanel.css';

const SearchPanel = ({ onUpdateSearch }) => {
    const [term, setTerm] = useState('');

    const onUpdateSearchFunc = (event) => {
        const termValue = event.target.value;
        setTerm(termValue);
    };

    useEffect(() => {
        onUpdateSearch(term);
    });
    
    return (
        <input 
            type="text"
            className="form-control search-input"
            placeholder="Найти сотрудника" 
            value={term}
            onChange={onUpdateSearchFunc}/>
    );
};

export default SearchPanel;
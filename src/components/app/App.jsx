import { useState } from 'react';

import AppInfo from '../appInfo/AppInfo';
import SearchPanel from '../searchPanel/SearchPanel';
import AppFilter from '../appFilter/AppFilter';
import EmployeesList from '../employeesList/EmployeesList';
import EmployeesAddForm from '../employeesAddForm/EmployeesAddForm';

import './app.css';

const App = () => {
    const [data, setData] = useState(localStorage.getItem('employees') 
                            ? JSON.parse(localStorage.getItem('employees')) : []);
    const [term, setTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const setDataFunc = (arr) => {
        setData(arr);
        localStorage.setItem('employees', JSON.stringify(arr));
    };

    const deleteItem = (id) => {
        setDataFunc([...data.filter(item => item.id !== id)]);
    };

    const addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            rise: false,
            id: Math.random().toString(36).substr(2, 5),
        };
        setDataFunc([...data, newItem]);
    };

    const onToggleProp = (id, prop) => {
        setDataFunc([...data.map(item => {
                if (item.id === id) {
                    return { ...item, [prop]: !item[prop] }
                }
                return item;
            })
        ]);
    };

    const searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.join().toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    const onUpdateSearch = (term) => {
        setTerm(term);
    };

    const filterPost = (items, filter) => {
        switch(filter) {
            case 'rise': 
                return items.filter(item => item.rise);
            case 'moreThen1000':
                return items.filter(item => item.salary.join() > 1000);
            default:
                return items;
        }
    };

    const onFilterSelect = (filter) => {
        setFilter(filter);
    };

    const employees = data.length;
    const increased = data.filter(item => item.increase).length;
    const visibleData = filterPost(searchEmp(data, term), filter);

    return (
        <div className="app">
            <AppInfo 
                employees={employees} 
                increased={increased}/>
            <div className="search-panel">
                <SearchPanel 
                    onUpdateSearch={onUpdateSearch}/>
                <AppFilter 
                    filter={filter}
                    onFilterSelect={onFilterSelect}/>
            </div>
            <EmployeesList
                data={visibleData}
                onDelete={deleteItem} 
                onToggleProp={onToggleProp} />
            <EmployeesAddForm 
                onAdd={addItem}/>
        </div>
    );
};

export default App;
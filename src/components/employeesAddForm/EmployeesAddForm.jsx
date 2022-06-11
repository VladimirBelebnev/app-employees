import { useState } from 'react';
import './employeesAddForm.scss';

const EmployeesAddForm = ({onAdd}) => {
    const [name, setName] = useState('');
    const [salary, setSalary] = useState('');
    const [error, setError] = useState(false);

    const onValueChangeName = (event) => {
        setName([event.target.value]);
    };

    const onValueChangeSalary = (event) => {
        setSalary([event.target.value]);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (name[0].length >= 3 && salary) {
            onAdd(name, salary);
            setName('');
            setSalary('');
            setError(false);
        } else {
            setError(true);
        }
    };

    let classNames = 'form-control new-post-label';

    if (error) {
        classNames += ' red';
    };

    return (
        <div className="app-add-form">
            <h3>Добавьте нового сотрудника</h3>
            <form 
                className="add-form d-flex"
                onSubmit={onSubmit} >
                <input 
                    type="text"
                    className={classNames}
                    placeholder="Как его зовут?"
                    name="name" 
                    value={name}
                    onChange={onValueChangeName}/>
                <input 
                    type="number"
                    className={classNames}
                    placeholder="З/П в $?" 
                    name="salary"
                    value={salary}
                    onChange={onValueChangeSalary}/>
                <button 
                    type="submit"
                    className="btn btn-outline-light">Добавить</button>
            </form>
        </div>
    );
};

export default EmployeesAddForm;
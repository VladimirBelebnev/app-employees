import EmployeesListItem from "../employeesListItem/EmployeesListItem";
import './employeesList.css';

const EmployeesList = ({ data, onDeleteItem, onToggleProp, onChangeSalary }) => {
    
    const elements = data.map(item => {
        const { id, ...itemProps } = item;
        return (
            <EmployeesListItem 
                key={id} 
                {...itemProps} 
                onDeleteItem={() => onDeleteItem(id)} 
                onChangeSalary={(event) => onChangeSalary(id, event.target.value)}
                onToggleProp={(event) => onToggleProp(id, event.currentTarget.getAttribute('data-toggle'))} />
        );
    });
 
    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
};

export default EmployeesList;
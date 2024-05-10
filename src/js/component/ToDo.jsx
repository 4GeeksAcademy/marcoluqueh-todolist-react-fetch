import React, { useState } from "react";

export const ToDo = () => {

    const [task, setTask] = useState('')
    const [list, setList] = useState(['Hacer comida', 'Pasear al perro', 'Ir al gimnasio'])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (task.trim() !== ''){
            setList([...list, task]);
            setTask('');
        }
        else {setTask('')}
    }

    const deleteTask = (item) => {
        setList(list.filter((element) => element !== item))
    }

    return (
        <div className="container">
            <h1 className="text-center">To-Do List</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="exampleInputEmail1" className="form-label">Introducir tareas:</label>
                    <input
                        type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        value={task} onChange={(event) => { setTask(event.target.value) }} />
                </div>
            </form>
            <ul className="list-group text-center">
                {list.map((item, id) => <li key={id} className="list-group-item d-flex justify-content-between hidden-icon">{item} 
                <span onClick={() => deleteTask(item)}>
                <i className="fas fa-trash-alt text-danger"></i>
                </span>
                </li>)}
                <li className="list-group-item text-end bg-light fw-light fst-italic">
                    {list.length} items
                </li>
            </ul>
        </div>
    )
}

import React, { useEffect, useState } from "react";

export const ToDoFetch = () => {
    const [task, setTask] = useState('');
    const [list, setList] = useState('');
    const [edit, setEdit] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({})
    const host = 'https://playground.4geeks.com/todo';
    const [user, setUser] = useState('');

    const handleUser = (event) => {
        event.preventDefault();
        if (user.trim() !== '') {
           
            handleUserSubmit()
            return
        }
        else {
            
        }
    };

    const handleUserSubmit = async () => {
        const uri = host + '/users/' + user;
        const options = {
            method: 'POST'
        };
        const response = await fetch(uri, options);
        console.log(response);
        if (!response.ok) {
            if (response.status == 400) {
                getTodos();
                return;
            }
            console.log(response.status)
        }
        getTodos();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (task.trim() !== '') {
            const newTodo = {
                label: task,
                is_done: false
            }
            console.log(newTodo);
            // llamar a la funcion que postea en la API
            postTask(newTodo);
            return
        }
        else { setTask('') }
    };

    const postTask = async (todo) => {
        const uri = host + '/todos/' + user;
        const options = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(todo)
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return;
        }
        const data = await response.json()
        console.log(data);
        setTask('');
        getTodos();
    };

    const deleteTask = async (item) => {
        const uri = host + '/todos/' + item.id;
        const options = { method: 'DELETE' };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return;
        }
        getTodos();
        console.log(item)
    };

    const handleEditTask = (item) => {
        setCurrentTodo(item)
        setEdit(true)
        console.log(item.id);
    };

    const submitChange = async (event) => {
        event.preventDefault();

        const dataToSend = {
            label: currentTodo.label,
            is_done: currentTodo.is_done
        }
        console.log(dataToSend);
        const uri = host + '/todos/' + currentTodo.id;
        const options = {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(dataToSend)
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return;
        }
        const data = await response.json;
        console.log(data);
        setEdit(0);
        getTodos();
    }

    const getTodos = async () => {
        const uri = host + '/users/' + user;
        const options = {};
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('Error: ', response.status, response.statusText);
            return;
        }
        const data = await response.json()
        console.log('Name:', data.name);
        console.log('ToDos:', data.todos);
        setList(data.todos)
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div className="container-fluid">
            <div className="modal" id='loginModal' tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleUser}>
                            <div className="modal-body">
                                <div className="">
                                    <label htmlFor="inputUser" className="form-label">Nombre de usuario:</label>
                                    <input
                                        type="text" className="form-control" id="inputUser" aria-describedby="emailHelp"
                                        value={user} onChange={(event) => { setUser(event.target.value) }} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Entrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3">
                <div className="container-fluid">
                    <a className="navbar-brand display-1" href="#"><i className="far fa-sticky-note"></i> Tasker!</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                            <a className="nav-link" data-bs-toggle="modal" data-bs-target="#loginModal" href="#">Login</a>
                        </div>
                    </div>
                </div>
            </nav>

            <h1 className="text-center">To-Do List with Fetch</h1>
            {!list ?

                <div className="container text-center mt-4">
                    <div className="alert alert-warning" role="alert">
                        <p className="m-0">
                            No existe el usuario.
                        </p>
                        <p className="m-0">
                            ¡Accede o crea uno nuevo en la pestaña de Login!
                        </p>
                    </div>
                </div>
                :
                <div className="container">
                    {edit ?
                        <form onSubmit={handleEditTask}>
                            <div className="">
                                <label htmlFor="editarTarea" className="form-label">Editar tarea:</label>
                                <input
                                    type="text" className="form-control" id="editarTarea" aria-describedby="emailHelp"
                                    value={currentTodo.label}
                                    onChange={(event) => { setCurrentTodo({ ...currentTodo, label: event.target.value }) }} />
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                        checked={currentTodo.is_done}
                                        onChange={(event) => setCurrentTodo({ ...currentTodo, is_done: event.target.checked })}
                                    />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        ¿Completada?
                                    </label>
                                </div><button type="button" className="btn btn-secondary pt-0 pb-0" onClick={(item) => submitChange(item)}>Submit</button>
                            </div>
                        </form>
                        :
                        <form onSubmit={handleSubmit}>
                            <div className="">
                                <label htmlFor="inputTarea" className="form-label">Introducir tareas:</label>
                                <input
                                    type="text" className="form-control" id="inputTarea" aria-describedby="emailHelp"
                                    value={task} onChange={(event) => { setTask(event.target.value) }} />
                            </div>
                        </form>
                    }
                    <ul className="list-group text-center mt-2">
                        {list.map((item, id) => <li key={id} className="list-group-item d-flex justify-content-between hidden-icon">
                            {item.is_done ? <i className="fas fa-check text-success me-3 mt-1"></i> : <i className="fas fa-times text-danger fs-5 me-3 mt-1"></i>}
                            {item.label}
                            <span className="fs-6">
                                <span onClick={() => handleEditTask(item)} className="me-4">
                                    <i className="far fa-edit text-success"></i>
                                </span>
                                <span onClick={() => deleteTask(item)}>
                                    <i className="fas fa-trash-alt text-danger"></i>
                                </span>
                            </span>
                        </li>)}
                        <li className="list-group-item text-end bg-light fw-light fst-italic">
                            {list.length} items
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

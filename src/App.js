import { isEmpty, size } from 'lodash';
import React, { useState } from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import shortid from 'shortid';


function App() {
    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState([])

    const addTask =(e) =>{
        e.preventDefault()

        if(isEmpty(task)){
            console.log("Task Empty")
            return 
        }

        const newTask= {
            id: shortid.generate(),
            name: task
        }

        //a la coleccion de task le agrega la nueva tarea
        setTasks([...tasks, newTask])
        setTask("")
    }

    const deleteTask =(id) => {
        const filteredTask = tasks.filter(task => task.id !== id)
        setTasks(filteredTask)
    }

    return (
        <div className="container mt-5"> 
        <h1>Tareas</h1>
        <hr/>
        <div className="row">
            <div className="col-8">
                
                <h4 className="text-center">Lista de tareas</h4>
                {
                    size(tasks) == 0 ? (
                        <h4 className="text-center">Aun no hay tareas</h4>
                    ) : (
                    <ul className="list-group">
                        {
                            //Metemos codigo de javascrip en {}

                            tasks.map((task) => (
                                <li className="list-group-item" key={task.id}>
                                    <span className="lead">{task.name}</span>
                                    <button 
                                        className="btn btn-danger btn-sm float-right mx-2"
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        Eliminar
                                    </button>

                                    <button 
                                        className="btn btn-warning btn-sm float-right"
                                    >
                                        Editar
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                    )
                }
            </div>

            <div className="col-4">
                <h4 className="text-center">Formulario</h4>
                <form onSubmit={addTask}>
                    <input 
                        type="text" 
                        className="form-control mb-2" 
                        placeholder="Ingrese la tarea"
                        onChange={(text) => setTask(text.target.value)}
                        value={task}
                    />
                    
                    <button className="btn btn-dark btn-block" type="submit">Agregar</button>
                </form>
            </div>         
        </div>
        </div>
    );
}

export default App;

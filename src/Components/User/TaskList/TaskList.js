import React from 'react'
import TaskCard from '../TaskCard/TaskCard'

function TaskList({ tasks, setTaskModalOpen, setCurrentTask }) {

    const rows = []
    tasks.forEach(t => {
        rows.push(<TaskCard setCurrentTask={setCurrentTask} setTaskModalOpen={setTaskModalOpen} key={t.id} task={t} ></TaskCard>)
    })


    return rows
}


export default TaskList
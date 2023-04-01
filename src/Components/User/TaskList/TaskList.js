import React from 'react'
import TaskCard from '../TaskCard/TaskCard'

function TaskList({ tasks }) {

    const rows = []
    tasks.forEach(t => {
        rows.push(<TaskCard key={t.id} task={t} ></TaskCard>)
    })


    return rows
}


export default TaskList
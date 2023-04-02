import React from 'react'
import FreeTask from './FreeTask'

function FreeTaskList({ tasks, setNum }) {

    const rows = []
    tasks.forEach(t => {
        console.log(t)
        rows.push(<FreeTask task={t} setNum={setNum}></FreeTask>)
    })


    return rows
}


export default FreeTaskList
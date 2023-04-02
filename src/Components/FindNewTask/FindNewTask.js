import React from 'react'
import FreeTaskList from '../FreeTask/FreeTaskList'
import "./FindNewTask.css"


const FindNewTask = ({ freeTask, setNum }) => {

    const tasks = [
        {
            "deadline": new Date(),
            "description": "clean beach",
            "title": "Beach",
            "student": "Tom Foolery",
            "completed": false,
            "author": "NYC Parks",
            "id": 2,
            "link": "www.google.com"
        },
        {
            "deadline": new Date(),
            "description": "clean beadkjfbivb;aioudbviuabz i;djbfiv;zbdf ;fbv;iafdzv dflvbia dzldxv iadbv;ia d;zfxkvj ;aidfzvbx;a dzf;vch",
            "title": "Beach",
            "student": "Tom Foolery",
            "completed": false,
            "author": "NYC Parks",
            "id": 2,
            "link": "www.google.com"
        },
        {
            "deadline": new Date(),
            "description": "clean beach",
            "title": "Beach",
            "student": "Tom Foolery",
            "completed": true,
            "author": "NYC Parks",
            "id": 2,
            "link": "www.google.com"
        },
        {
            "deadline": new Date(),
            "description": "clean beach",
            "title": "Beach",
            "student": "Tom Foolery",
            "completed": false,
            "author": "NYC Parks",
            "id": 2,
            "link": "www.google.com"
        }
    ]
    return (
        <>
            <h1>
                Find New tasks
            </h1>
            <div className="project-boxes jsListView">

                <FreeTaskList tasks={freeTask} setNum={setNum} />
            </div>

        </>
    )
}

export default FindNewTask
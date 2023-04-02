import { Button } from '@mui/material';
import { color } from '@mui/system';
import { click } from '@testing-library/user-event/dist/click';
import { Trash } from 'phosphor-react';
import React, { useContext } from 'react'
import { AuthContext } from '../../../App';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';
import "./TaskCard.css"

const TaskCard = ({ task, setTaskModalOpen, setCurrentTask, setNum }) => {
    const { currentUser } = useContext(AuthContext);
    const { deadline, description, title, image, completed, author, id, link, created_at, submission, picked_up, approved } = task
    let news = new Date(deadline);

    console.log(new Date(created_at))


    let currdate = new Date()
    let daysLeft = Math.floor(Math.abs(news - currdate) / 86400000);

    const handleOpenModal = () => {
        setCurrentTask(task)

        setTaskModalOpen(true)
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        await deleteDoc(doc(db, "tasks", id));
        setNum(Math.random())
    }


    return (
        <div class="project-box-wrapper">
            <div class="project-box" style={{ backgroundColor: approved ? "#c8f7dc" : "#fee4cb" }}>
                <div class="project-box-header">
                    {/* <span>{created_at}</span> */}
                    <div class="more-wrapper">
                        <button class="project-btn-more">
                        </button>
                    </div>
                </div>
                <div class="project-box-content-header">
                    <p class="box-content-header">{title}</p>
                    <p class="box-content-subheader">{approved ? "completed" : "incomplete"}</p>
                    {currentUser.company &&

                        <Button onClick={handleDelete}>
                            <Trash />
                        </Button>
                    }
                </div>

                <div class="project-box-footer">
                    <div class="participants">
                        <button onClick={handleOpenModal} className={approved ? "com editinf" : "editinf"}>view more</button>
                    </div>
                    <div class="days-left" style={{ color: approved ? "#34c471" : "#ff942e" }}>
                        {daysLeft} Days Left
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TaskCard
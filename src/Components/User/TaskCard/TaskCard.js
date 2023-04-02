import React from 'react'
import "./TaskCard.css"

const TaskCard = ({ task, setTaskModalOpen, setCurrentTask }) => {

    const { deadline, description, title, image, completed, author, id, link, created_at, submission, picked_up } = task
    let news = new Date(deadline);

    console.log(new Date(created_at))


    let currdate = new Date()
    let daysLeft = Math.floor(Math.abs(news - currdate) / 86400000);

    const handleOpenModal = () => {
        setCurrentTask(task)

        setTaskModalOpen(true)

    }


    return (
        <div class="project-box-wrapper">
            <div class="project-box" style={{ backgroundColor: completed ? "#c8f7dc" : "#fee4cb" }}>
                <div class="project-box-header">
                    {/* <span>{created_at}</span> */}
                    <div class="more-wrapper">
                        <button class="project-btn-more">
                        </button>
                    </div>
                </div>
                <div class="project-box-content-header">
                    <p class="box-content-header">{title}</p>
                    <p class="box-content-subheader">{completed ? "completed" : "incomplete"}</p>
                </div>

                <div class="project-box-footer">
                    <div class="participants">
                        <button onClick={handleOpenModal} className={completed ? "com editinf" : "editinf"}>view more</button>
                    </div>
                    <div class="days-left" style={{ color: completed ? "#34c471" : "#ff942e" }}>
                        {daysLeft} Days Left
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TaskCard
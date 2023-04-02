import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../App';
import { db } from '../../firebase';
import { doc, updateDoc } from "firebase/firestore";

const FreeTask = ({ task, setNum }) => {
    const { deadline, description, title, id } = task
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id)
        console.log("currentuser")
        console.log(currentUser.uid)
        const taskRef = doc(db, "tasks", id);

        await updateDoc(taskRef, {
            picked_up: currentUser.uid

        })

        setNum(Math.random())

        navigate("/")
    }
    return (
        <div class="project-box-wrapper">
            <div class="project-box" style={{ backgroundColor: "#c4c1e0" }}>
                <div class="project-box-header">
                    <span></span>
                    <div class="more-wrapper">
                        <button class="project-btn-more">
                        </button>
                    </div>
                </div>
                <div class="project-box-content-header">
                    <p class="box-content-header">{title}</p>
                </div>
                <div class="box-progress-wrapper">
                    <p>{description}</p>


                </div>
                <div class="project-box-footer">
                    <button className="editinf purp" onClick={handleSubmit} >Sign Up</button>
                    <div class="participants">


                    </div>
                    <div class="days-left" style={{ color: "#d59bf6" }}>
                        3 Days Left
                    </div>
                </div>
            </div>
        </div>

    )
}

export default FreeTask
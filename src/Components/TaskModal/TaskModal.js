import React, { useContext } from 'react'
import { AuthContext } from '../../App';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import "./TaskModal.css"

const TaskModal = ({ setTaskModalOpen, task }) => {
    const { deadline, description, title, image, author, id, link, created_at, submission, picked_up, approved } = task
    const { currentUser } = useContext(AuthContext);
    const { username, profilepic, company, email, uid } = currentUser

    console.log(submission)

    const handleFinishTask = async (e) => {
        e.preventDefault();

        const taskRef = doc(db, "tasks", id);

        await updateDoc(taskRef, {
            submission: currentUser.uid
        })

        setTaskModalOpen(false)
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <h1>{title}</h1>
                    <button
                        onClick={() => {
                            setTaskModalOpen(false);
                        }}
                    >
                        X
                    </button>
                </div>


                <div class="formcontainer">
                    <form >

                        <div className="form-inputs">
                            <img className='pic' src={image} alt="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fadinaiqbl%2Fdefault-icon-meme-pfp%2F&psig=AOvVaw3t329wmOPEpNQB40FwvyUE&ust=1680501008910000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCIDkrJ_Aiv4CFQAAAAAdAAAAABAE" />
                        </div>


                        <div className="pickdateCover">
                            <div className="pickdatelabel">
                                {description}
                            </div>
                        </div>
                        <div>
                            {
                                company && !approved && submission &&
                                <button className="newdatebtn eventbtn" type="submit">Verify Submission</button>
                            }

                            {
                                !company && !submission &&
                                <button className="newdatebtn eventbtn com" onClick={handleFinishTask} type="submit">Submit</button>
                            }

                            {
                                !company && !approved && submission &&
                                <div>
                                    Approval Pending
                                </div>
                            }
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default TaskModal
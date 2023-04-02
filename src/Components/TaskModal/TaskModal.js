import React, { useContext } from 'react'
import { AuthContext } from '../../App';

const TaskModal = ({ setTaskModalOpen, task }) => {
    const { deadline, description, title, image, author, id, link, created_at, submission, picked_up } = task
    const { currentUser } = useContext(AuthContext);
    const { username, profilepic, company, email, uid } = currentUser

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
                            <img src={image} />
                        </div>


                        <div className="pickdateCover">
                            <div className="pickdatelabel">
                                {description}
                            </div>
                        </div>
                        <div>
                            {
                                company &&
                                <button className="newdatebtn eventbtn" type="submit">Verify Submission</button>
                            }

                            {
                                !company &&
                                <button className="newdatebtn eventbtn com" type="submit">Submit</button>
                            }
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default TaskModal
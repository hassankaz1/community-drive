import React from "react";
import "./NewEvent.css";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";



const NewEvent = ({ setOpenModal, creator }) => {


    const handleLinkSubmit = async (e) => {
        e.preventDefault();
        let title = e.target.title.value;
        let description = e.target.description.value
        let image = e.target.image.value
        let deadline = e.target.deadline.value
        let created_at = new Date()
        let submission = null
        let picked_up = null

        const formData = {
            title, description, image, deadline, creator, created_at, submission, picked_up
        }

        console.log(formData)

        try {
            const docRef = await addDoc(collection(db, "tasks"), formData);
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        e.target.reset();
        setOpenModal(false);
    }



    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <h1>Create a new Event</h1>
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>


                <div class="formcontainer">
                    <form onSubmit={handleLinkSubmit}>
                        <div className="form-inputs">
                            <label>Title</label>
                            <input name="title" type="text" />
                        </div>

                        <div className="form-inputs">
                            <label>Description</label>
                            <textarea name="description" />
                        </div>

                        <div className="form-inputs">
                            <label>Image - optional</label>
                            <input name="image" type="text" />
                        </div>


                        <div className="pickdateCover">
                            <div className="pickdatelabel">
                                <label className="end-label">Deadline</label>
                            </div>
                            <div>
                                <input className="pickdate" name="deadline" type="date" />
                            </div>
                        </div>
                        <div>
                            <button className="newdatebtn eventbtn" type="submit">Submit</button>
                        </div>
                    </form>

                </div>

            </div>
        </div>
    )
}

export default NewEvent
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../App";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import completeTask from "../../Nfts/Tasks/TaskCompleteNft";
import "./TaskModal.css";
import { collection, query, where, getDocs } from "firebase/firestore";


const TaskModal = ({ setTaskModalOpen, task, setNum }) => {
    const {
        deadline,
        description,
        title,
        image,
        author,
        id,
        link,
        created_at,
        submission,
        picked_up,
        approved,
    } = task;
    const { currentUser } = useContext(AuthContext);
    const { username, profilepic, company, email, uid } = currentUser;
    const [rarity, setRarity] = useState(null)

    useEffect(() => {
        async function getNFTInfo() {
            const userRef = doc(db, "nft", uid);
            const q = query(collection(db, "nfts"), where("taskId", "==", id));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let rareness = doc.data().rarity
                console.log(rareness)
                setRarity(rareness);
            });
        }

        getNFTInfo()
    }, []);



    //   console.log(submission);

    const handleFinishTask = async (e) => {
        e.preventDefault();

        const taskRef = doc(db, "tasks", id);

        await updateDoc(taskRef, {
            submission: currentUser.uid,
        });

        setTaskModalOpen(false);
    };

    const handleVerifySubmit = async (e) => {
        e.preventDefault();
        await completeTask(title, description, image, uid, id);


        const taskRef = doc(db, "tasks", id);

        await updateDoc(taskRef, {
            approved: true,
        });

        setNum(Math.random())
    };

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
                    <form>
                        <div className="form-inputs">
                            <img className="pic" src={image} />
                        </div>

                        <div className="pickdateCover">
                            <div className="pickdatelabel">{description}</div>
                        </div>
                        <div>
                            {company && !approved && submission && (
                                <button
                                    className="newdatebtn eventbtn"
                                    type="submit"
                                    onClick={handleVerifySubmit}
                                >
                                    Verify Submission
                                </button>
                            )}

                            {!company && !submission && (
                                <button
                                    className="newdatebtn eventbtn com"
                                    onClick={handleFinishTask}
                                    type="submit"
                                >
                                    Submit
                                </button>
                            )}

                            {!company && !approved && submission && (
                                <div>Approval Pending</div>
                            )}

                            {rarity && (
                                <h3>
                                    NFT Rewarded: {rarity}
                                </h3>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;

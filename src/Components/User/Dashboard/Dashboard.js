import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../App'
import { Navigate } from 'react-router-dom';
import NewEvent from '../../NewEvent/NewEvent'
import TaskList from '../TaskList/TaskList'
import TaskModal from '../../TaskModal/TaskModal';
import { getAuth, signOut } from "firebase/auth";
import { db } from '../../../firebase';
import { collection, getDocs, query, where } from "firebase/firestore";
import "./Dashboard.css"
import FindNewTask from '../../FindNewTask/FindNewTask';
import { Divider } from '@mui/material';



const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);
    const [modalOpen, setModalOpen] = useState(false);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [freeTask, setFreeTask] = useState([]);
    const [num, setNum] = useState(0);
    const [tasks, setTasks] = useState([])
    const { username, profilepic, company, email, uid } = currentUser
    console.log(company)

    useEffect(() => {
        async function getCompanyTasks() {
            const eventsRef = collection(db, "tasks");
            const q = query(eventsRef, where("creator", "==", uid));

            const querySnapshot = await getDocs(q);

            const ts = []
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                data.id = doc.id
                ts.push(data)
            });
            setTasks(ts)
        }

        async function getUserTasks() {
            const eventsRef = collection(db, "tasks");
            const q = query(eventsRef, where("picked_up", "==", uid));

            const querySnapshot = await getDocs(q);

            const ts = []
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                data.id = doc.id
                ts.push(data)
            });
            setTasks(ts)

        }

        async function getNewTasks() {
            const eventsRef = collection(db, "tasks");
            const q = query(eventsRef, where("picked_up", "==", null));

            const querySnapshot = await getDocs(q);

            const ts = []
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                data.id = doc.id
                ts.push(data)
            });
            setFreeTask(ts)

        }

        if (company) {
            getCompanyTasks()
        } else {
            getUserTasks()
            getNewTasks()
        }

    }, [currentUser, modalOpen, num])

    const tasks1 = [
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

    const handleSignOut = (e) => {

        e.preventDefault();

        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("signed out")
            return <Navigate to="/login" />;
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <>
            {taskModalOpen && <TaskModal setTaskModalOpen={setTaskModalOpen} task={currentTask} />}
            {company && modalOpen && <NewEvent setOpenModal={setModalOpen} creator={uid} />}
            <div className="app-container">
                <div className="app-content">
                    <div className="projects-section">
                        <div className="projects-section-header">
                            <p>Tasks</p>
                            <p className="time">{2}</p>
                        </div>
                        <div className="projects-section-line">
                            <div className="projects-status">
                                <div className="item-status">
                                    <span className="status-number">{3}</span>
                                    <span className="status-type">In Progress</span>
                                </div>
                                <div className="item-status">
                                    <span className="status-number">{1}</span>
                                    <span className="status-type">Completed</span>
                                </div>
                                <div className="item-status">
                                    <span className="status-number">{4}</span>
                                    <span className="status-type">Total Projects</span>
                                </div>
                            </div>
                        </div>
                        <div className="project-boxes jsGridView">


                            {tasks.length > 0 ? (<TaskList setNum={setNum} setCurrentTask={setCurrentTask} setTaskModalOpen={setTaskModalOpen} tasks={tasks} ></TaskList>) : (<></>)}

                        </div>

                    </div>




                    <div className="messages-section">
                        <button className="messages-close">
                        </button>
                        <div className="projects-section-header">
                            <p>Profile Info</p>
                        </div>
                        <div className="messages">
                            <div className="message-box">
                                <img src={profilepic} alt="https://cdn.landesa.org/wp-content/uploads/default-user-image.png" />
                                <div className="message-content">
                                    <div className="message-header">
                                        {username ? (<div className="name">{username}</div>) : (<></>)}

                                    </div>
                                    <p className="message-line">
                                        <button className="editinfo"  >Edit Info</button>
                                    </p>
                                </div>
                            </div>
                            {company &&
                                <div className="message-box">
                                    <div className="message-content">
                                        <button className="fnew editinfo" onClick={() => { setModalOpen(true) }}>Create New Tasks</button>

                                    </div>
                                </div>
                            }

                            <Divider variant="middle" />

                            <div className="message-content">
                                <button className="fnew editinfo" onClick={handleSignOut}>Sign Out</button>
                            </div>

                            <Divider variant="middle" />

                            {!company &&
                                <FindNewTask freeTask={freeTask} setNum={setNum} />}

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Dashboard

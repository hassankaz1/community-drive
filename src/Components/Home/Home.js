import React, { useContext } from 'react'
import { AuthContext } from '../../App';
import { Navigate } from 'react-router-dom';
import Dashboard from '../User/Dashboard/Dashboard';

const Home = () => {

    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return <Dashboard />


    // return (
    //     <button onClick={handleSignOut}>Log Out</button>
    // )
}

export default Home
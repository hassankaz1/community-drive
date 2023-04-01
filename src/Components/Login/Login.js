import React, { useCallback, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { AuthContext } from "../../App";
import "./Login.css";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'


const Login = () => {

    const [hasAccount, setHasAccount] = useState(true);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        profilepic: "",
        user: ""
    });


    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");



    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };






    const handleLogin = async (e) => {
        e.preventDefault();

        setPasswordError("");
        setEmailError("");

        let email = formData.email
        let password = formData.password


        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode == "auth/invalid-password" || errorCode == "auth/wrong-password") {
                    setPasswordError(errorMessage)
                } else {
                    setEmailError(errorMessage)
                }
            });

    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        setPasswordError("");
        setEmailError("");


        let { email, password, username, profilepic, user } = formData;
        console.log(user)

        const userinfo = {
            username,
            email,
            profilepic
        }

        if (user == "user") {
            userinfo["company"] = false
        } else {
            userinfo["company"] = true
        }




        let uid;

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                uid = user.uid;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode == "auth/invalid-password" || errorCode == "auth/wrong-password") {
                    setPasswordError(errorMessage)
                } else {
                    setEmailError(errorMessage)
                }
            });

        console.log(uid)
        await setDoc(doc(db, "users", uid), userinfo)


    }

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Navigate to="/" />;
    }

    return (
        <section className="login">


            <div className="loginContainer" >

                <form>
                    <div className="input-box">
                        <input name="email" type="email" value={formData.email} onChange={handleChange} required />
                        <label> Email </label>
                        <p className="errorMsg">{emailError}</p>

                    </div>

                    <div className="input-box">
                        <input name="password" type="password" value={formData.password} onChange={handleChange} required />
                        <label> Password </label>
                        <p className="errorMsg">{passwordError}</p>

                    </div>



                    {(!hasAccount) && (
                        <>
                            <div className="input-box">
                                <input name="username" type="text" value={formData.username} onChange={handleChange} required />
                                <label for="username"> Username/ Company Name </label>
                            </div>

                            <div className="input-box">
                                <input name="profilepic" type="text" value={formData.profilepic} onChange={handleChange} required />
                                <label> Link to Profile Pic </label>
                            </div>
                            <FormControl alignItems="center" sx={{ color: "white" }}>
                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ color: "white" }}>Type of User</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel onClick={() => { formData.user = "company" }} value="company" control={<Radio />} label="Company" />
                                    <FormControlLabel onClick={() => { formData.user = "user" }} value="user" control={<Radio />} label="User" />
                                    <FormControlLabel
                                        value="disabled"
                                        disabled
                                        control={<Radio />}
                                        label="other"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </>
                    )}


                    <div className="btnContainer">
                        {hasAccount ? (
                            <>
                                <button className="lbutton" type="submit" onClick={handleLogin}>Log In</button>
                                <p>Don't have an account ? <span onClick={() => setHasAccount(false)}>Sign Up</span></p>
                            </>
                        ) : (
                            <>
                                <button className="lbutton" type="submit" onClick={handleSignUp}>Sign Up</button>
                                <p>Have an account ? <span onClick={() => setHasAccount(true)}>Sign In</span></p>
                            </>
                        )
                        }
                    </div>



                </form>
            </div >

        </section >
    );
};

export default Login;
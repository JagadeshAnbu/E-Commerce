import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        try {
            const response = await fetch('https://localhost:7236/Authentication/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const responseData = await response.json();
            localStorage.setItem('jwtToken', responseData.token);
            window.location.replace("/"); // Redirect to the desired page
        } catch (error) {
            console.error('Login error:', error.message);
            alert('Failed to login');
        }
    };

    const signup = async () => {
        try {
            const response = await fetch('https://localhost:7236/Authentication/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to register user');
            }

            const responseData = await response.json();
            localStorage.setItem('jwtToken', responseData.token);
            window.location.replace("/"); // Redirect to the desired page
        } catch (error) {
            console.error('Registration error:', error.message);
            alert('Failed to register');
        }
    };

    return (
        <>
            <section>
                <div className='loginsignup'>
                    <div className='loginsignup-container'>
                        <h1>{state}</h1>
                        <form className='loginsignup-fields'>
                            <input
                                name='username'
                                value={formData.username}
                                onChange={changeHandler}
                                placeholder='Your Name'
                            />
                            <input
                                name='password'
                                value={formData.password}
                                onChange={changeHandler}
                                type='password'
                                placeholder='Password'
                            />
                            <button onClick={() => { state === "Login" ? login() : signup() }} type="button">Continue</button>
                            {state === "Sign Up" ?
                                <p className='loginsignup-login'>Already have an account <span onClick={() => { setState("Login") }}>Login here</span></p>
                                :
                                <p className='loginsignup-login'>Create an account? <span onClick={() => { setState("Sign Up") }}>Click </span></p>
                            }
                        </form>
                        <div className='loginsignup-agree'>
                            <input type="checkbox" name='' id='' />
                            <p>By continuing, I agree to the terms of use & privacy policy.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LoginSignup;

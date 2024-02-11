   import React, {useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {    
    const [state, setState] = useState("Login")
    const[formData, setFormData] = useState({
        username:"",
        password:"",
        email:""
    })
    const changeHandler =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const login = async()=>{
        console.log("Login Function Executed", formData);
    }
    const signup = async () => {
        console.log("Signup Function Executed", formData);
    
        try {
            const response = await fetch('https://localhost:44300/api/v1/User/Register', {
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
    
            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                // Handle unsuccessful registration
                console.error('Registration failed:', responseData.error);
                // Display error message to the user
            }
        } catch (error) {
            // Handle fetch errors
            console.error('Fetch error:', error.message);
            // Display error message to the user
        }
    }
    
    return (
        <>
                <section>
                    <div className='loginsignup'>
                        <div className='loginsignup-container'>
                            <h1>{state}</h1>
                            <form className='loginsignup-fields'>
                                {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler}
                                    placeholder='Your Name' />:<></>}
                                <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address'/>
                                <input name='password' value={formData.password} onChange={changeHandler}
                                    type='password'
                                    placeholder='Password' />
                                <button onClick={()=>{state==="Login"?login():signup()}} type="submit">Continue
                                </button>
                                {state==="Sign Up"?<p className='loginsignup-login'>Already have an account <span onClick={()=>{setState("Login")}}>Login here</span></p>
                                :<p className='loginsignup-login'>Create an account? <span onClick={()=>{setState("Sign Up")}}>Click </span></p>}
                            </form> 
                            <div className='loginsignup-agree'>
                                <input type="checkbox" name='' id='' />
                                <p>By continuing, I agree to the terms of use & privacy policy.</p>
                            </div>
                        </div>
                    </div>
                </section>
        </>
    )
}

export default LoginSignup;
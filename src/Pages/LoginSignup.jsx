import React, { useEffect, useRef, useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
    const userRef = useRef(null); 
    const pwdRef = useRef(null); 
    const errRef = useRef(null);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                </section>
            ) : (
                <section>
                    <div className='loginsignup'>
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <div className='loginsignup-container'>
                            <h1>Sign Up</h1>
                            <form onSubmit={handleSubmit} className='loginsignup-fields'>
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    placeholder='Your Name' />

                                <input
                                    type='password'
                                    id="password"
                                    ref={pwdRef}
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    placeholder='Password' />
                                <button type="submit">Continue</button>
                            </form>
                            <p className='loginsignup-login'>Already have an account <span>Login here</span></p>
                            <div className='logisignup-agree'>
                                <input type="checkbox" name='' id='' />
                                <p>By continuing, I agree to the terms of use & privacy policy.</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}
export default LoginSignup

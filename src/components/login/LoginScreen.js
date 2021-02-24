import React from 'react'

export const LoginScreen = ({ history }) => {
    
    const handleLogin = () => {
        // console.log(history);
        // history.push('/');
        history.replace('/');
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>
            <hr />
            <button
                className="btn btn-primary"
                onClick={ handleLogin }
            >
                Login
            </button>
        </div>
    )
}

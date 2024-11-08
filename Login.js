// Login.js
import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import smartHomeVideo from './IOT.mp4';
import home from './SmartHome.mp4';
import light from './light.mp4';
import { users } from './users';

const AuthPage = () => {
    return (
        <div className="app">
            <div className="left-section">
                <div className="form-container">
                    <h1 className='title'>EchoEase</h1>
                    <LoginForm />
                </div>
            </div>
            <div className="right-section">
                <div className="carousel-container">
                    <Carousel>
                        <Carousel.Item>
                            <video autoPlay loop muted className="d-block w-100">
                                <source src={smartHomeVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <Carousel.Caption className='caption'>
                                <h3 className="caption-title">Control Your Home with a Click!</h3>
                                <p className="caption-text">Turn your devices on or off effortlessly from anywhere, anytime!</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <video autoPlay loop muted className="d-block w-100">
                                <source src={light} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <Carousel.Caption className='caption'> 
                                <h3 className="caption-title">Make Your Home Smarter!</h3>
                                <p className="caption-text">Enjoy a lifestyle of convenience and efficiency with our innovative automation solutions.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <video autoPlay loop muted className="d-block w-100">
                                <source src={home} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <Carousel.Caption className='caption'>
                                <h3 className="caption-title">Your Home, Your Rules!</h3>
                                <p className="caption-text">Personalize your living space by managing devices through our user-friendly interface.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

// LoginForm component with role-based navigation
const LoginForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const user = users.find(
            (item) => item.username === username && item.password === password
        );

        if (user) {

            // Save user data to localStorage (or sessionStorage if needed)
            localStorage.setItem('user', JSON.stringify(user)); // Save the user object

            if (user.role === 'user') {
                navigate('/dashboard',{state:{user}}); // Navigate to Dashboard for user
            } else if (user.role === 'admin') {
                navigate('/AdminDashboard',{state:{user}});
            }
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="form-content">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <input 
                        type="text" 
                        required 
                        placeholder=" " 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Username</label>
                </div>
                <div className="input-group">
                    <input 
                        type="password" 
                        required 
                        placeholder=" " 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                </div>
                <button type="submit" className="submit-btn">Login</button>
            </form>
        </div>
    );
};

export default AuthPage;

import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Clear local storage when component mounts (user visits the login page)
    localStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      console.log('Please fill in all fields.');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      const { status, data } = response;
  
      if (status === 210 || status === 220 || status === 230) {
        const token = data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('userId', data.user._id); // assuming _id is required
        toast.success(data.message);
  
        if (status === 210) {
          navigate('/dashboard');
        } else if (status === 220) {
          navigate('/passReset');
        } else if (status === 230) {
          navigate('/userdashboard');
        }
      
        setEmail('');
        setPassword('');

      } 
      else if (status === 401) {
        console.log("jsicfhn")
        toast.error(data.message);
      }
      else {
        console.log('Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('wrong credentials');
       
      } else {
        console.error('An error occurred:', error.message);
      }

    }
  

  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-items-center h-100">
          
            <div className="col-lg-12 col-md-8 col-xl-5 text-center " style={{borderRadius: '15px', height: '85vh', width: '55%',backgroundColor: 'white'}}>
          
            <h1 >ETMS</h1>
              <div className="c" style={{display: 'flex', flexDirection: 'row',height:'85%' }}>
              
                <div className="card-body p-5">
                
                  <h3 className="mb-5">Login</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="form-check d-flex justify-content-start mb-4">
                      <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                      <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
                    </div>
                    <button className="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
                  </form>
                  <Link to="/forgotpassword" className="btn btn-link mt-3">Forgot Password?</Link>
                  <hr className="my-4" />
                </div>
                <img src={require('../component/login-animate.gif')} alt="Your GIF" style={{ width: '50%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

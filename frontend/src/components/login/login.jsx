import '../../styles/login.css';

import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faLock } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import DotEnvConfig from '../../utils/DotEnvConfig';
import useAuthToken from '../../hooks/useAuthToken';

const Login = () => {
  const init = { email: '', password: '' };

  const [credential, setCredential] = useState(init);
  const [showPassword, setShowPassword] = useState(false);
  const { token, updateToken } = useAuthToken();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredential((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const resetFormData = () => {
    setCredential({ email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${DotEnvConfig.BaseURL}/login`, {
        email: credential.email,
        password: credential.password,
      });

      const { accessToken } = response.data;
      resetFormData();
      updateToken(accessToken);
      console.log('Login successful:', { token });
    } catch (error) {
      const { data } = error.response;
      console.log('Error logging in:', data);
    }
  };

  return (
    <section className="loginPage">
      <section className="loginSide">
        <h2 className="heading">Sign in to Shopping Nest</h2>
        <p className="subText">or use your email account </p>
        <form onSubmit={handleSubmit} className="loginForm">
          <div className="inputWraper_column">
            <div className="inputWraper_row">
              <FontAwesomeIcon className="icons" icon={faUserTie} size="xl" />
              <input
                type="text"
                className="formInput"
                placeholder="Email"
                onChange={handleChange}
                value={credential.email}
                name="email"
              />
            </div>
          </div>
          <div className="inputWraper_column">
            <div className="inputWraper_row">
              <FontAwesomeIcon className="icons" icon={faLock} size="xl" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="formInput"
                placeholder="Password"
                onChange={handleChange}
                value={credential.password}
                name="password"
              />
            </div>
            <span className="togglePassword" onClick={togglePasswordVisibility}>
              {showPassword ? 'Hide' : 'Show'} Password
            </span>
          </div>
          <p className="forgetPassword">Forget Password ?</p>
          <button className="signin_button" type="submit">
            SIGN IN
          </button>
        </form>
      </section>

      <section className="signupSide">
        <h2 className="heading">Din&rsquo;t Have an Account </h2>
        <p className="subText">
          Simply Create your account by clicking the Signup Button
        </p>
        <button className="signup_button">SIGN UP</button>
      </section>
    </section>
  );
};

export default Login;

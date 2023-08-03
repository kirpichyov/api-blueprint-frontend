import { Button } from "../../components/button";
import styles from "./auth.module.scss";
import {useRef, useState} from "react";
import AuthContext from "../../services/auth/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "../../components/loader";
import { useAction } from "../../hooks/useAction";
import Header from "../../components/header";

type AppProps = {
  changeForm: () => void
}

const Auth = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);

  if(AuthContext.isLoggedIn()) {
    return <Navigate to="/projects"/>
  }

  const changeForm = () => {
    setIsLoginForm(prev => !prev);
  } 

    return(
      <div>
        <Header />
          <div className={styles.container}>
            {
              isLoginForm ? <Login changeForm={changeForm}/> : <Register changeForm={changeForm}/>
            }
          </div>
        </div>
    );
}

const Register = ({changeForm} : AppProps) => {
  const [requstIsSend, setRequestIsSend] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const {registerUser} = useAction();
  const inputRef = useRef({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: ""
  });

  const register = () => {
    if(inputRef.current.email.length <= 0 || 
      inputRef.current.password.length <= 0 ||
      inputRef.current.firstname.length <= 0 ||
      inputRef.current.lastname.length <= 0) {
      return;
    }

    if(inputRef.current.password != inputRef.current.confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }
    setRequestIsSend(prev => !prev)

    const model = {
      email: inputRef.current.email,
      password: inputRef.current.password,
      firstname: inputRef.current.firstname,
      lastname: inputRef.current.firstname,
    }

    registerUser(model);
  }

  return(
      <div className={styles.login}>
          <span className={styles.title}>Register</span>
          <input className={styles.input}
          placeholder="Email" 
          onChange={event => inputRef.current.email = event.target.value}/>

          <input className={styles.input} type="text" placeholder="Firstname"
          onChange={event => inputRef.current.firstname = event.target.value}/>

          <input className={styles.input} type="text" placeholder="Lastname"
          onChange={event => inputRef.current.lastname = event.target.value}/>

          <input className={styles.input} 
          type="password"
          placeholder="Password"
          onChange={event => inputRef.current.password = event.target.value}/>

          <input className={styles.input} type="password" placeholder="Confirm password"
          onChange={event => inputRef.current.confirmPassword = event.target.value}/>
          {confirmPasswordError && 
          <div style={{display: "flex", alignItems: "center", marginBottom: '10px'}}>
            <p style={{color: 'red'}}>Password should match</p>
          </div>
          }
          <a className={styles.link} onClick={changeForm}>Already have account?</a>
          {requstIsSend ? <Loader position="center" /> : <Button title="Login" onClick={register}/>}
      </div>
  );
}

const Login = ({changeForm} : AppProps) => {
  const [requstIsSend, setRequestIsSend] = useState(false);
  const {signIn} = useAction();
  const inputRef = useRef({
    email: "",
    password: "",
  });

  const login = async () => {
    const email = inputRef.current?.email;
    const password = inputRef.current?.password;

    if(email.length <= 0 || 
      password.length <= 0) {
      return;
    }

    setRequestIsSend(prev => !prev)

    const model = {
      email : email,
      password: password
    }

    signIn(model);
  };

    return(
        <div className={styles.login}>
            <span className={styles.title}>Login</span>
            <input className={styles.input} 
            onChange={event => inputRef.current.email = event.target.value}
            placeholder="Email"/>
            <input className={styles.input} 
            onChange={event => inputRef.current.password = event.target.value}
            type="password"
            placeholder="Password"/>
            <a className={styles.link} onClick={changeForm}>No account? Let's create it</a>
            {requstIsSend ? <Loader position="center" /> : <Button title="Login" onClick={login}/>}
        </div>
    );
}

export default Auth;
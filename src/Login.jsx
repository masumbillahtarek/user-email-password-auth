import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
      const [registerError,setRegisterError]=useState('')
        const [success,setSuccess]=useState('')
        const emailRef=useRef(null)
        const handleOnSubmit=(e)=>{
            e.preventDefault();
            const email=e.target.email.value;
            const password=e.target.password.value;
            console.log('Submitted',email,password)
            //Reset error and success
              setRegisterError('')
        setSuccess('')
               signInWithEmailAndPassword(auth, email, password)
                        .then(result => {
                            console.log( result.user);
                             setSuccess('User Logged in Successfully');
                        })
                        .catch(error => {
                            console.error( error);
                            setRegisterError(error.message)
                        });
        }
        const handleForgotPassword=()=>{
            const email=emailRef.current.value;
            if(!email){
console.log('Please Provide an email :',emailRef.current.value)
return;
            }else if(! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
console.log('Please write a valid email')
return ;
            }
            //Send Validation Email
            sendPasswordResetEmail(auth,email)
            .then(()=>{
                alert('Please Check Your Email')
            })
            .catch(error=>{
                console.log(error)
            })
        }
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleOnSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" ref={emailRef} name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" onClick={handleForgotPassword} className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
          <div className="form-control mt-6">
          <input className="btn btn-primary" type="submit" value="Login" />
        </div>
      </form>
        {
                registerError && <p className="text-xl font-bold text-lime-200">{registerError}</p>
            }
            {
                success && <p className="text-2xl text-orange-800">{success}</p>
            }
            <p className="text-xl">New to this website ? Please <Link to="/register">Register</Link></p>
    </div>
  </div>
</div>
    );
};

export default Login;
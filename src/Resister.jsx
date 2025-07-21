import { useState } from "react";
import { auth } from "./firebase.config";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Resister = () => {
    const [registerError,setRegisterError]=useState('')
    const [success,setSuccess]=useState('')
    const[showPassword,setShowPassword]=useState(false)
    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name=e.target.name.value;
        const accepted=e.target.terms.checked
           //Reset error and success
            setRegisterError('')
        setSuccess('')
       if(password.length<6){
        setRegisterError('Password Should be 6 character or Longer')
        return;
       }else if(!/[A-Z]/.test(password)){
        setRegisterError('Your Password should have at least one capital character')
        return;
       }else if(!accepted){
        setRegisterError('please Accept our terms and conditions')
        return;
       }
        console.log('Submitted ', email, ' | ', password , ' | ',accepted,' | ',name);
     
        //Create User
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log('User created:', result.user)
                setSuccess('User created Successfully');
                //Update Profile
                updateProfile(result.user,{
                    displayName:name,
                    photoURL:"https://example.com/jane-q-user/profile.jpg"
                })
                      .then(()=>console.log('Profile Updated'))
                    .catch()
                //Send verification with email
                sendEmailVerification(result.user)
                .then(()=>{
                    alert('Please Check your email and verify your account')
                })
            })
            .catch(error => {
                console.error('Error:', error.message);
                setRegisterError(error.message)
            });
    };

    return (
        <div>
            <h2 className="text-4xl my-8">Please Register</h2>
            <form onSubmit={handleRegister} className="p-4 border-2 rounded-xl border-black w-96 mx-auto">
                 <input className="border-2 rounded-xl border-black py-2 px-4 my-4 w-full" type="text" name="name" placeholder="Name" required />
                <input className="border-2 rounded-xl border-black py-2 px-4 my-4 w-full" type="email" name="email" placeholder="Email Address" required />
                <div className="relative">
                    <input className="border-2 rounded-xl border-black py-2 px-4 my-4 w-full" type={showPassword?'text':'password'} name="password" placeholder="Password" required />
                <span className="absolute top-7 right-5" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<FaEyeSlash />:<FaEye />}</span>
                </div>
                <label className="label">
             <a href="#" className="label-text-alt link link-hover">Forgot Password ?</a>
                </label>
                 <div>
                    <input type="checkbox" name="terms" id="terms"/>
                    <label className="ml-2" htmlFor="terms">Accept Our <a href="">Terms and conditions</a></label>
                 </div>
                <input className="border-2 rounded-xl border-black py-2 px-4 my-4 w-full bg-black text-white" type="submit" value="Register" />
            </form>
            {
                registerError && <p className="text-xl font-bold text-lime-200">{registerError}</p>
            }
            {
                success && <p className="text-2xl text-orange-800">{success}</p>
            }
            <p className="text-xl">Already have an account. Please <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Resister;

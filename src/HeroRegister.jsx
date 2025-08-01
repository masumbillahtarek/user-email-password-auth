import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.config";


const HeroRegister = () => {
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        console.log('Submitted',email,password)
           createUserWithEmailAndPassword(auth, email, password)
                    .then(result => {
                        console.log('User created:', result.user);
                    })
                    .catch(error => {
                        console.error('Error:', error.message);
                    });
    }
    return (
        <div>
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
      <form onSubmit={handleOnSubmit}  className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <input className="btn btn-primary" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default HeroRegister;
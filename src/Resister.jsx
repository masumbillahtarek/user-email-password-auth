import { auth } from "./firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Resister = () => {
    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log('Submitted ', email, ' | ', password);

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log('User created:', result.user);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });
    };

    return (
        <div>
            <h2 className="text-4xl my-8">Please Register</h2>
            <form onSubmit={handleRegister} className="p-4 border-2 rounded-xl border-black w-96 mx-auto">
                <input className="border-2 rounded-xl border-black py-2 px-4 my-4 w-full" type="email" name="email" placeholder="Email Address" required />
                <input className="border-2 rounded-xl border-black py-2 px-4 my-4 w-full" type="password" name="password" placeholder="Password" required />
                <input className="border-2 rounded-xl border-black py-2 px-4 my-4 w-full bg-black text-white" type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Resister;

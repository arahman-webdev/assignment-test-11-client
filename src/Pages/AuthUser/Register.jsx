import React, { useContext, useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import googleImg from '../../assets/images/google.png';
import { AuthContext } from '../../Auth/AuthProvider';
import Swal from 'sweetalert2';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/firebase.init';

const Register = () => {
    const { createUser, loginWithGoogle, logOutUser, user } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Redirect logged-in users
    useEffect(() => {
        if (user) {

            navigate(location?.state?.from || '/', { replace: true }); // Redirect to home if logged in
        }
    }, [user, navigate, location?.state?.from]);

    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const name = form.name.value;
        const photo = form.photoUrl.value;

        if (password.length < 6) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Passwords must be 6 characters or longer!",
            });
        }

        if (!/[a-z]/.test(password)) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Passwords must contain at least one lowercase letter!",
            });
        }

        if (!/[A-Z]/.test(password)) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Passwords must contain at least one uppercase letter!",
            });
        }

        try {
            await createUser(email, password);
            await updateProfile(auth.currentUser, { displayName: name, photoURL: photo });
            Swal.fire({
                title: "Good job!",
                text: "You are successfully registered!",
                icon: "success",
            });
            await logOutUser(); // Log out after registration
            navigate('/login'); // Redirect to the login page
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "This email is already in use! Please provide a different email address.",
            });
        }
    };

    const handleSignInWithGoogle = () => {
        loginWithGoogle()
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Welcome! Google sign-in successful.",
                    icon: "success",
                });
                navigate(location?.state?.from || '/'); // Redirect to the desired page or home
            })
            .catch((error) => {
                console.error("Google sign-in error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Google sign-in failed. Please try again.",
                });
            });
    };

    return (
        <div style={{ minHeight: 'calc(100vh - 200px)' }} className="flex items-center">
            <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl px-8 py-10 flex flex-col items-center justify-center w-full relative border">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Register</h1>
                <form onSubmit={handleRegister} className="w-full flex flex-col gap-4">
                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200">Name:</label>
                        <input
                            type="text"
                            placeholder="name"
                            id="name"
                            name="name"
                            required
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="photoUrl" className="text-sm text-gray-700 dark:text-gray-200">Photo Url:</label>
                        <input
                            type="text"
                            placeholder="Photo url"
                            id="photoUrl"
                            name="photoUrl"
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200">Email:</label>
                        <input
                            type="email"
                            placeholder="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200">Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            id="password"
                            name="password"
                            required
                            className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm">
                        Register
                    </button>
                </form>

                <div onClick={() => setShowPassword(!showPassword)} className="absolute bottom-[252px] right-10 cursor-pointer">
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>

                <div className="mt-4 text-center cursor-pointer">
                    <p>Already have an account? <Link to="/login" className="text-red-500">Login now</Link></p>
                </div>
                <div className="divider">OR</div>
                <div onClick={handleSignInWithGoogle} className="flex gap-2 cursor-pointer border px-5 py-3 rounded-md hover:bg-base-200 transition duration-200">
                    <img className="w-7 h-7" src={googleImg} alt="Google" />
                    <h1>Login With Google</h1>
                </div>
            </div>
        </div>
    );
};

export default Register;

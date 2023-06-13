import { useState } from "react";
import { useRouter } from "next/router";
import { SubmitButton } from "../components/SubmitButton";
import Link from "next/link";
import axios from '../util/axios';
import { toast } from "react-hot-toast";
import { Endpoint } from "@/util/constants";

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = async (ev) => {
    ev.preventDefault();

    try {
      let body = {
        name,
        email,
        password,
        password_confirmation: confirmPassword
      };

      if(body) {
        setLoading(true);
        let response = await axios.post(Endpoint.SIGNUP, body);
        let payload = response.data
        // console.log("payload", payload);

        if(payload) {
          // console.log("Onboarding successful")
         
          toast.success("Onboarding successful");
          router.push("/");
          
          return payload;
        }

        let message = 
          payload.status == 'false' 
          ? "Username or password is incorrect" 
          : payload.message;
        
        let error = new Error(message);
        throw error;
      }

    } catch(err) {
      console.log(err);
      toast.error("Password and confirm password do not match");
    } finally {
      setLoading(false);
    }
  };

  // const handleCloseModal = () => {
  //   onClose();
  // }

  return (
    <div className="bg-gradient-to-b from-gray-500 to-white fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-[30rem] min-h-[25rem]">
        <h2 className="text-4xl font-serif text-center mb-4">Welcome Back</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label htmlFor="name" className="block text-sm font-serif">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              placeholder="Name"
              onChange={handleNameChange}
              className="border border-3 border-gray-300 rounded px-4 py-2 w-full outline-none bg-transparent placeholder-gray-500 text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-serif">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={handleEmailChange}
              className="border border-3 border-gray-300 rounded px-4 py-2 w-full outline-none bg-transparent placeholder-gray-500 text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-serif">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePasswordChange}
              className="border border-3 border-gray-300 rounded px-4 py-2 w-full outline-none bg-transparent placeholder-gray-500 text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-serif">
              Confirm Password
            </label>
            <input
              id="password"
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handleConfirmPasswordChange}
              className="border border-3 border-gray-300 rounded px-4 py-2 w-full outline-none bg-transparent placeholder-gray-500 text-gray-500"
            />
          </div>

          <SubmitButton
            label="Sign Up"
            loading={loading} 
          />    
          
          {/* <button
            type="button"
            onClick={handleCloseModal}
            className="w-full bg-gray-500 text-white rounded px-4 py-3"
          >
            Close
          </button> */}
        </form>
        <p className="mt-4 px-3 text-center font-normal">Have an account? <Link href="/" className="underline font-bold">Sign in</Link></p>
      </div>
    </div>
  )
}

export default Register
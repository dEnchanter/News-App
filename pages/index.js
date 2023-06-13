import { useState } from "react";
import { useRouter } from "next/router";
import { SubmitButton } from "../components/SubmitButton";
import Link from "next/link";
import axios from '../util/axios';
import { toast } from "react-hot-toast";
import { Endpoint } from "@/util/constants";

function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (ev) => {
    ev.preventDefault();

    try {
      let body = {
        email,
        password
      };

      if(body) {
        setLoading(true);
        let response = await axios.post(Endpoint.LOGIN, body);
        let payload = response.data
        console.log("payload", payload);

        if(payload) {
          console.log("Login successful")
          localStorage.setItem("token", payload.data.access_token)
          localStorage.setItem("user_id", payload.data.id)
          localStorage.setItem("user_name", payload.data.name)
          localStorage.setItem("user_email", payload.data.email)

          toast.success("Login successful");
          router.push("/feeds");
          
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
      toast.error("wrong credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    onClose();
  }

  return (
    <div className="bg-gradient-to-b from-gray-500 to-white fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-[30rem] min-h-[20rem]">
        <h2 className="text-4xl font-serif text-center mb-4">Welcome Back</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
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
          <SubmitButton
            label="Sign In"
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
        <p className="mt-4 px-3 text-center font-normal">Dont have an account? <Link href="/register" className="underline font-bold">Create account</Link></p>
      </div>
    </div>
  )
}

export default HomePage
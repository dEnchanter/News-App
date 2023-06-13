import Link from "next/link";
import NavLinks from "./NavLinks";
import SearchBox from "./SearchBox";
import { Bars3Icon } from "./Icons";
import { getUsername } from "@/util/helper";
import NewsPreference from "./NewsPreference";
import { useRouter } from "next/router";
import { Endpoint } from "@/util/constants";
import axios from '../util/axios';
import { toast } from "react-hot-toast";
// import DarkModeButton from "./DarkModeButton";
 
function Header() {
  const username = getUsername();
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post(Endpoint.LOGOUT);
    localStorage.removeItem('token');
    router.push('/')
  }
  
  return (
    <header>
      <div className="grid grid-cols-3 p-10 items-center">
        <Bars3Icon className="h-8 w-8 cursor-pointer" />

        <Link href="/">
          <h1 className="font-serif text-4xl text-center">
            The <span className="underline decoration-6 decoration-orange-400">NEWS</span> app
          </h1>
        </Link>

        <div className="flex items-center justify-end space-x-4">

          <p
            className="hidden md:inline text-slate-900 dark:bg-slate-800">
              {`Hi, ${username || ''}`}
          </p>

          <NewsPreference />   

          {
            username ? (
              <button 
                onClick={handleLogout}
                className="hidden md:inline text-orange-400">
                Logout
              </button> 
            ) : (
              <button 
              className="hidden md:inline text-orange-400">
                Login
              </button> 
            )
          }       
        </div>
      </div>

      <NavLinks />

    </header>
  )
}

export default Header
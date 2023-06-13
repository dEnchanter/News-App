
import NavLink from "./NavLink"
import axios from '@/util/axios';
import { Endpoint, categories } from "@/util/constants";
import useSWR from "swr";
import { getUserID } from "@/util/helper";
import { useRouter } from "next/router";

function NavLinks() {

  const user_id = getUserID();

  const {
    data: newsCategory,
  } = useSWR(
    user_id ? [Endpoint.CATEGORIES] : null,
    newsCategoryFetcher
  );

  async function newsCategoryFetcher(endpoint) {
    try {
      const response = await axios.get(endpoint);
      const payload = response.data;
      if (payload.status == true) {
        return payload.data;
      }
      throw new Error(payload.message);
    } catch (error) {
      toast.error(`No News Category`);
      console.log(error);
    }
  }

  const router = useRouter()
  const isActive = (path) => {
    return router.pathname?.split('/').pop() === path;
  }

  return (
    <nav className="grid grid-cols-4 md:grid-cols-7 text-xs md:text-sm gap-4 pb-10 max-w-6xl mx-auto border-b">
      {
        newsCategory?.slice(0,7).map((category) => (
          <NavLink 
            key={category} 
            category={category} 
            isActive={isActive(category)} 
          />
        ))
      }
    </nav>
  )
}

export default NavLinks
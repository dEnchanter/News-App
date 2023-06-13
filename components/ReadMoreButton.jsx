
import { useRouter } from "next/router";

function ReadMoreButton({ article }) {

  const router = useRouter();

  const handleClick = () => {
    const queryString = Object.entries(article)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    
    const url = `/article?${queryString}`;
    router.push(url);
  }

  return (
    <button
      onClick={handleClick}
      disabled={true}
      className="bg-orange-400 h-10 rounded-b-lg dark:text-gray-900 hover:bg-orange-500 disabled:bg-orange-400 disabled:cursor-not-allowed transition-all duration-200 ease-out" 
    >
      Read More
    </button>
  )
}

export default ReadMoreButton
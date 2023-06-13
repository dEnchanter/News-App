import NewsList from "@/components/NewsList";
import { Endpoint } from "@/util/constants";
import axios from '@/util/axios';
import { getUserID } from "@/util/helper";
import useSWR from "swr";

async function SearchPage({ searchParams }) {

  const user_id = getUserID();

  const {
    data: newsRequestFeed,
  } = useSWR(
    user_id ? [Endpoint.REQUEST_FEEDS] : null,
    newsRequestFeedFetcher
  );

  async function newsRequestFeedFetcher(endpoint) {
    try {
      const response = await axios.get(endpoint);
      const payload = response.data;
      if (payload.status == true) {
        return payload.data;
      }
      throw new Error(payload.message);
    } catch (error) {
      toast.error(`No News Feed`);
      console.log(error);
    }
  }

  // const news = await fetchNews(
  //   "general",
  //   searchParams?.term,
  //   true
  // );

  return (
    <div>
      <h1 className="headerTitle font-serif">Search Results for: {searchParams?.term}</h1>
      <NewsList news={news} />
    </div>
  )
}

export default SearchPage
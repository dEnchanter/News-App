import { Endpoint } from "@/util/constants";
import { getUserID } from "@/util/helper";
import axios from '@/util/axios';
import useSWR from "swr";
import NewsList from "@/components/NewsList";
import Header from "@/components/Header";
import SearchBox from "@/components/SearchBox";

function NewsFeed() {

  const user_id = getUserID();

  // const {
  //   data: newsFeed,
  // } = useSWR(
  //   user_id ? [Endpoint.FEEDS] : null,
  //   newsFeedFetcher
  // );

  // async function newsFeedFetcher(endpoint) {
  //   try {
  //     const response = await axios.get(endpoint);
  //     const payload = response.data;
  //     if (payload.status == true) {
  //       return payload.data;
  //     }
  //     throw new Error(payload.message);
  //   } catch (error) {
  //     toast.error(`No News Feed`);
  //     console.log(error);
  //   }
  // }

  return (
    <div>
      <Header />
      <SearchBox />
      {/* <NewsList news={newsFeed} /> */}
    </div>
  )
}

export default NewsFeed;
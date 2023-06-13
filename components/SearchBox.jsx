import { useRouter } from "next/router";
import { Listbox, Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { getUserID } from "@/util/helper";
import useSWR from "swr";
import axios from '@/util/axios';
import { Endpoint } from "@/util/constants";
import { CheckIcon, ChevronUpDownIcon } from "./Icons";
import NewsList from "./NewsList";

function SearchBox() {

  const user_id = getUserID();

  const {
    data: newsCategory,
  } = useSWR(
    user_id ? [Endpoint.CATEGORIES] : null,
    newsCategoryFetcher
  );

  const {
    data: newsSource,
  } = useSWR(
    user_id ? [Endpoint.SOURCES] : null,
    newsSourceFetcher
  );

  const {
    data: newsFeed,
  } = useSWR(
    user_id ? [Endpoint.FEEDS] : null,
    newsFeedFetcher
  );

  async function newsFeedFetcher(endpoint) {
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

  async function newsSourceFetcher(endpoint) {
    try {
      const response = await axios.get(endpoint);
      const payload = response.data;
      if (payload.status == true) {
        return payload.data;
      }
      throw new Error(payload.message);
    } catch (error) {
      toast.error(`No News Source`);
      console.log(error);
    }
  }

  const [selectedCategory, setSelectedCategory] = useState(newsCategory?.[0] || 'general');
  const [selectedSource, setSelectedSource] = useState(newsSource?.[0] || 'newsapi.org');
  const [input, setInput] = useState('');
  // const router = useRouter();

  const {
    data: filteredFeeds,
  } = useSWR(
    user_id ? [`http://66.228.61.106:7444/api/news/request-feeds?category=${selectedCategory}&source=${selectedSource}`] : null,
    filteredFeedsFetcher
  );

  async function filteredFeedsFetcher(endpoint) {
    try {
      const response = await axios.get(endpoint);
      const payload = response.data;
      if (payload.status == true) {
        return payload.data;
      }
      throw new Error(payload.message);
    } catch (error) {
      toast.error(`No Filtered Source`);
      console.log(error);
    }
  }

  return (
    <div>
      <form 
        // onSubmit={handleSearch} 
        className="max-w-6xl mx-auto flex justify-between items-start px-5 py-2"
      >

      <input 
        type="text"
        value={input}
        disabled={!input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Filter Category, Source..." 
        className="flex-1 w-full h-14 rounded-sm placeholder-gray-500 
      text-gray-500 outline-none bg-transparent dark:text-orange-400" 
      />

      <div className="flex space-x-4">
        <div className="w-44">
          <Listbox value={selectedCategory} onChange={setSelectedCategory}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block h-5 truncate">{selectedCategory}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {newsCategory?.map((item, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={item}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {item}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div className="w-44">
          <Listbox value={selectedSource} onChange={setSelectedSource}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block h-5 truncate">{selectedSource}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {newsSource?.map((item, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={item}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {item}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

      </div>
    
      </form>
      
      <NewsList news={filteredFeeds} />

      {
        filteredFeeds?.length == 0 && (
          <NewsList news={newsFeed} />
        )
      }
      
    </div>
  )
}

export default SearchBox
import { Endpoint } from "@/util/constants";
import axios from '@/util/axios';
import useSWR from "swr";
import { toast } from "react-hot-toast";
import { getUserID } from "@/util/helper";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { SubmitButton } from "./SubmitButton";
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from "./Icons";

function NewsPreference() {

  const user_id = getUserID();

  const {
    data: newsCategory,
  } = useSWR(
    user_id ? [Endpoint.CATEGORIES] : null,
    newsCategoryFetcher
  );

  const {
    data: newsAuthor,
  } = useSWR(
    user_id ? [Endpoint.AUTHOR] : null,
    newsAuthorFetcher
  );

  const {
    data: newsSource,
  } = useSWR(
    user_id ? [Endpoint.SOURCES] : null,
    newsSourceFetcher
  );

  const {
    data: userPreference,
  } = useSWR(
    user_id ? [Endpoint.GET_USER_PREFERENCE] : null,
    userPreferenceFetcher
  );

  console.log("user", userPreference);

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

  async function newsAuthorFetcher(endpoint) {
    try {
      const response = await axios.get(endpoint);
      const payload = response.data;
      if (payload.status == true) {
        return payload.data;
      }
      throw new Error(payload.message);
    } catch (error) {
      toast.error(`No News Author`);
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

  async function userPreferenceFetcher(endpoint) {
    try {
      const response = await axios.get(endpoint);
      const payload = response.data;
      if (payload.status == true) {
        return payload.data;
      }
      throw new Error(payload.message);
    } catch (error) {
      // toast.error(`No User Preference`);
      console.log(error);
    }
  }

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button 
      onClick={handleOpenModal}
      className="hidden md:inline bg-slate-900 text-white 
      px-4 lg:px-8 py-2 lg:py-4 rounded-full dark:bg-slate-800">
        My News Preference
      </button> 

      <SignupModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        newsCategory={newsCategory} 
        newsAuthor={newsAuthor}
        newsSource={newsSource}
        userPreference={userPreference}
      />
    </div> 
  )
}

const SignupModal = ({ 
  isOpen, 
  onClose,
  newsCategory,
  newsAuthor,
  newsSource,
  userPreference
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(userPreference?.categories);
  const [selectedAuthor, setSelectedAuthor] = useState(userPreference?.authors);
  const [selectedSource, setSelectedSource] = useState(userPreference?.sources);

  const handleSavePreference = async (e) => {
    e.preventDefault();

    // Create an object to store the updated preferences
    const updatedPreferences = {
      categories: selectedCategory.map((item) => item.trim()),
      authors: selectedAuthor.map((item) => item.trim()),
      sources: selectedSource.map((item) => item.trim()),
    };

    try {
      setLoading(true);
      
      await axios.post(Endpoint.SAVE_USER_PREFERENCE, updatedPreferences);
      toast.success('Preferences saved successfully');
      onClose();

    } catch (error) {
      console.error('Error saving preferences:', error);
      // Handle the error condition accordingly
    } finally {
      setLoading(false);
    }
  }

  const handleCloseModal = () => {
    onClose();
  }

  return (
    <div className={`modal ${isOpen ? 'flex' : 'hidden'}`}>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="overflow-scroll bg-gradient-to-r from-white to-gray-200 p-6 rounded-lg shadow-lg w-[50rem] h-[30rem]">
          <h2 className="text-4xl font-serif text-center mb-4">News Preference</h2>
          <form className="space-y-4 flex flex-col justify-between">
            <div className="grid grid-cols-3 gap-3 mx-auto">
              <div className="w-44">
                <Listbox value={selectedCategory} onChange={setSelectedCategory} multiple>
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
                      <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                <Listbox value={selectedAuthor} onChange={setSelectedAuthor} multiple>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block h-5 truncate">{selectedAuthor}</span>
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
                      <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {newsAuthor?.map((item, personIdx) => (
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
                <Listbox value={selectedSource} onChange={setSelectedSource} multiple>
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
                      <Listbox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
            
            <SubmitButton
              label="Save Preference"
              onClick={handleSavePreference}
              loading={loading} 
            />    
            
            <button
              type="button"
              onClick={handleCloseModal}
              className="w-full bg-gray-500 text-white rounded px-4 py-3"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsPreference
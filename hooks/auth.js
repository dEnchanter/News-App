import { useEffect, useState } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import axios from '../util/axios';
import { Endpoint } from "../util/constants";

export function useUser({ redirectTo = false, redirectIfFound = false } = {}) {

  const { data: user, mutate: mutateUser, ...rest } = useSWR(
    Endpoint.LOGGED_IN_USER, 
    userFetcher
  );

  // console.log("user", user?.data?.businessName);

  useEffect(() => {

    if (!redirectTo || !user) return;

    if (user?.code == "00" && user?.data?.isFirstLogin && redirectIfFound) {
      Router.push("user/change-password");
      return;
    }

    if (
      // Redirect to login if user is not found and we are not on the login page
      (redirectTo && !redirectIfFound && !user?.data?.code == "00") ||
      // Redirect to appropriate page if this is the login page and we found a user
      (redirectIfFound && user?.data?.code == "00")
    ) {
    
      const userEmail = user?.data?.email;
      Router.push(redirectTo);

    }

  }, [user, redirectTo, redirectIfFound]);

  return { user, mutateUser, ...rest };


  async function userFetcher(url) {
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'x-token': ''
        }
      });
      return response.data;

    } catch (error) {
      console.log(error.message);
      if (error?.response?.data) {
        return error.response.data;
      }
      if (error.userNotFound) {
        throw error;
      }
      throw error;
    }
  }

}

export async function doLoginSender(body) {
  try {
    let response = await axios.post(Endpoint.LOGIN, body);
    let payload = response.data
    // console.log("payload", payload)

    
    if (payload.code === "00") {
      localStorage.setItem("token", payload.data.token)
      return payload;
    }

    let message =
    payload.code === "99"
      ? "Username or password is incorrect"
      : "Authentication service could not complete your " +
        "request at the moment. Please retry or contact support";
    let error = new Error(message);
    error.fromLogin = true;
    throw error;

  } catch (error) {
    console.log(error);
    if (error.fromLogin) {
      throw error;
    }
    console.error(error);
    error.fromLogin = true;
    error.message = "Username or password is incorrect";
    // TODO Handle error from thrown by code here.
    throw error;
  }
}
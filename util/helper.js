export const getUsername = () => {
  if(typeof window !== 'undefined'){
      return localStorage.getItem("user_name");
  }
};

export const getUserEmail = () => {
  if(typeof window !== 'undefined'){
      return localStorage.getItem("user_email");
  }
};

export const getUserID = () => {
  if(typeof window !== 'undefined'){
      return localStorage.getItem("user_id");
  }
};
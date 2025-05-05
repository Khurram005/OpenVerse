export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const getUserData = () => {
  const userData = localStorage.getItem("userData");
  return userData ? JSON.parse(userData) : null;
};

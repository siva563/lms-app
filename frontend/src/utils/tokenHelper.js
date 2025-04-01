// src/utils/tokenHelper.js
export const saveToken = (token) => {
    console.log("token" + token)
    localStorage.setItem("token", token);
}
export const getToken = () => localStorage.getItem("token");

export const saveUser = (user) =>
    localStorage.setItem("user", JSON.stringify(user));
export const getUser = () =>
    JSON.parse(localStorage.getItem("user") || "{}");

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};


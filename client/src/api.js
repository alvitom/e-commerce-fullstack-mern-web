import axios from "axios";

const baseUrl = process.env.REACT_APP_BASEURL;

export const getProductList = async (resource) => {
  try {
    const response = await axios.get(`${baseUrl}/products/${resource}`);
    const data = await response.data;
    return data;
  } catch (err) {
    console.log(`Error fetching data : ${err}`);
  }
};

export const authUser = async (resource, username, email, password) => {
  const response = await axios.post(`${baseUrl}/auth/${resource}`, {
    username,
    email,
    password,
  });
  const data = await response.data;
  return data;
};

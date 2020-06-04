import axios from "axios";

const proxyurl = "https://immense-stream-23977.herokuapp.com/";

const getAll = (url) =>
  axios
    .get(proxyurl + url)
    .then((response) => response.data)
    .catch((err) => {
      throw new Error(err.response.data);
    });



export default {
  getAll,
};

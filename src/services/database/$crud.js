//==============================================================================
// ■ CRUD ($crud.js)
//------------------------------------------------------------------------------
//     RESTful API CRUD operations.
//==============================================================================
import axios from "axios";
import jsyaml from "js-yaml";

const client = axios.create({
  baseURL: "data",
  withCredentials: false,
  headers: {
    Accept: "text/yaml",
    "Content-Type": "text/yaml"
  }
});

export default {
  create(path, data) {
    return client
      .post(`${path}.yml`, data)
      .then(response => jsyaml.load(response.data));
  },
  read(path) {
    return client
      .get(`${path}.yml`)
      .then(response => jsyaml.load(response.data));
  },
  update(path, data) {
    return client
      .put(`${path}.yml`, data)
      .then(response => jsyaml.load(response.data));
    // return client
    //   .patch(`${path}.yml`, data)
    //   .then(response => jsyaml.load(response.data));
  },
  delete(path) {
    return client
      .delete(`${path}.yml`)
      .then(response => jsyaml.load(response.data));
  }
};

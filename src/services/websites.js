import axios from "axios";
import jsyaml from "js-yaml";

export default {
  get() {
    return {
      websites() {
        return axios
          .get(`data/websites.yml`)
          .then(response => jsyaml.load(response.data));
      }
    }
  }
}
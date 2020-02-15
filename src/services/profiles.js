import axios from "axios";
import jsyaml from "js-yaml";

export default {
  get() {
    return {
      profiles() {
        return axios
          .get(`data/profiles.yml`)
          .then(response => jsyaml.load(response.data));
      }
    }
  }
}
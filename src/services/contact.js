import axios from "axios";
import jsyaml from "js-yaml";

export default {
  get() {
    return {
      contactLinks() {
        return axios
          .get(`data/contact-links.yml`)
          .then(response => jsyaml.load(response.data));
      }
    }
  }
}
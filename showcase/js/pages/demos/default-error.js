import { register } from "../../../../core/js/lib/luri.js";
import Example from "./example.js";

export default class DefaultErrorDemo extends Example {
  
  datax() {
    return Promise.reject(new Error("This error is almost as fake as your ex' feelings."));
  }
  
}
register(DefaultErrorDemo)
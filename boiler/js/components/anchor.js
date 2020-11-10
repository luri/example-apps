import { Component, register } from "../../../core/js/lib/luri.js";
import { DefaultAnchor } from "../styles/common.js"

export default class Anchor extends Component(HTMLAnchorElement) {
  
  static parentx() {
    return "a";
  }

  constructor(text, url, props = {}) {
    props.class = DefaultAnchor
    props.html = text;
    props.href = url;
    super(props);
  }

}
register(Anchor);

export function BlankAnchor(text, url, props = {}) {
  props.target = "_blank";
  return new Anchor(text, url, props);
}
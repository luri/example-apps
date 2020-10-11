import luri, { Component } from "../lib/luri.js";
import Animatable from "./animatable.js";

export default class Content extends Animatable(
  Component()
) {

  // static parentx() {
  //   return "div";
  // }

  constructx(props) {
    this.queryx = props;
    
    return this.propsx();
  }
  
  propsx() {
    return {
      // id: this.idx()
    };
  }

  /**
   * Expresses the content's attitude
   * towards being cached
   */
  cachex() {
    return true;
  }

  contentx(data) {
    return [
      "*Cricket Sounds"
    ];
  }

  /**
   * Inject the returned definition from contentx or errorx after fetching datax
   * @param {HTMLElement} def
   */
  injectx(def) {
    for (let child of (Array.isArray(def) ? def : [def])) {
      luri.append(child, this);
    }
  }

  /**
   * Determines an unique identifier for the content
   * @param {*} query 
   */
  static idx(query) {
    let isArray = Array.isArray(query);
    let id = this.name;

    if (query && (query.length || !isArray)) {
      id += ":" + (!isArray ? JSON.stringify(query) : query);
    }
    return id;
  }

  /**
   * @deprecated The idx function has been made static, this is only kept for no good reason really.
   * @param {*} query 
   */
  idx(query = this.queryx) {
    return this.constructor.idx(query);
  }

  /**
   * Runs before content is rendered.
   * @throws {Error | Content}
   */
  interceptx() {
    
  }

  /**
   * Allows render of a custom error screen 
   * when datax rejects
   */
  errorx() {
    
  }

  datax() {
    return Promise.resolve();
  }

}
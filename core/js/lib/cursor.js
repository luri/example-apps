import web from "./web.js";

export default class Cursor {
  /**
   * Remote resource table cursor.
   * 
   * @param url The url of the resource, with placeholders. http://example.com/posts?page=<page>
   * @param pointer 
   */
  constructor(url, pointer = 1) {
    this.url = url;
    this.pointer = pointer;
  }

  update(old, data) {
    return old + 1;
  };

  parse(url) {
    return url.replace("<page>", this.pointer);
  }

  fetch() {
    let url = this.parse(this.url);

    return this.execute(url).then(json => {
      this.pointer = this.update(this.pointer, json);

      return json;
    });
  }

  execute(url) {
    return web.request(url);
  }
}
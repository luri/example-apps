import Cursor from "../../../../core/js/lib/cursor.js";
import GatewayAdapter from "./gateway-adapter.js";
import ResponseRead from "./response-read.js";

export default class BratGatewayAdapter extends GatewayAdapter {

  uribase() {
    return "https://abc.xyz";
  }
  uricreate() {
    return "?new=yes";
  }
  uriread() {
    return "";
  }
  uriupdate() {
    return "";
  }
  uridelete() {
    return "?delete=yes";
  }

  constructor() {
    super();
    
    this.cursor = new Cursor(this.uribase());
  }

  fetch() {
    return this.cursor.fetch();
  }

  /**
   * 
   * @returns {ResponseRead}
   */
  parsereadresp(r) {
    return Object.assign(new ResponseRead, {
      data: r[0],
      fields: r[1],
      pk: r[3],
      sort: r[4],
      order: r[5],
      query: r[6],
      sortable: r[7],
      searchable: r[8],
      relations: r[9]
    })
  }

  read() {
    return this.fetch().then(this.parsereadresp);
  }

}
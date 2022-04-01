import Modal from "../../../../boiler/js/components/modal.js";
import { ButtonPrimary } from "../../../../boiler/js/styles/common.js";
import { Component, register } from "../../../../core/js/lib/luri.js";
import { smoothie } from "../../../../core/js/lib/util.js";
import BratGatewayAdapter from "./brat-gateway-adapter.js";



class BuildingsGwAdp extends BratGatewayAdapter {

  uribase() {
    return "https://ubuntu/own/idom/public/buildings";
  }

}


export default class CRUDTable extends Component() {
  
  /**
   * @type {BuildingsGwAdp}
   */
  gwadapterx = new BuildingsGwAdp;
  queryx = "";
  queryfieldsx = [];
  sortx = "";
  fieldsx = [];
  

  refreshx() {
    Modal.loadx(this.gwadapterx.read().then(resp => this.constructtablex(resp)))
  }

  getvisiblefieldsx(resp) {
    return resp.fields;
  }

  constructtablex(readresp) {
    this.fieldsx = this.getvisiblefieldsx(readresp);

    smoothie(this.bodyx(readresp), this.getBodyElementx());
  }

  headingtagx = "th";
  headinglabelsx = {};

  headinglabelx(col) {
    return this.headinglabelsx[col] || col;
  }

  headingx(columns = []) {
    return columns.map(col => {
      return {
        node: this.headingtagx,
        class: "text-left",
        html: this.headinglabelx(col)
      }
    })
  }

  rowx(record) {
    return {
      node: "tr",
      html: this.fieldsx.map(field => this.colx(record[field], field, record))
    }
  }

  colx(value, field, record) {
    return {
      node: "td",
      html: value || ""
    };
  }

  addbtnx() {
    return true;
  }

  bodyx(readresp) {
    return {
      node: "table",
      class: "table w-full",
      html: [
        {
          node: "thead",
          html: this.headingx(this.fieldsx)
        },
        {
          node: "tbody",
          html: readresp.data.map(row => this.rowx(row))
        }
      ]
    }
  }

  getBodyElementx() {
    return this.children[1];
  }

  constructsearchbarx() {
    return {
      class: "flex",
      html: [
        this.addbtnx() ? {
          node: "button",
          class: ButtonPrimary,
          html: "Add"
        } : null
      ]
    }
  }

  constructx() {
    setTimeout(() => this.refreshx(), 100)

    return {
      class: "w-full",
      html: [
        this.constructsearchbarx(),
        {
          // body
          html: "Loading, please wait..",
        }
      ]
    }
  }

}
register(CRUDTable);


export class BuildingsCRUDTable extends CRUDTable {

  headinglabelsx = {
    id: "#",
    addr: "Адрес",
  }

  colx(value, field, record) {
    if (field === "actions") {
      return "EDIT";
    } else {
      return super.colx(value, field, record);
    }
  }
  
  getvisiblefieldsx(resp) {
    let hidden = ["lat", "lon", "cpny_id"];

    return resp.fields.filter(x => !hidden.includes(x)).concat(["actions"])
  }
}
register(BuildingsCRUDTable);
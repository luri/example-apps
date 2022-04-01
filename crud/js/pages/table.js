import { register } from "../../../core/js/lib/luri.js";
import CRUDTable, { BuildingsCRUDTable } from "../components/crud/table.js";
import Page from "../components/page.js";



export default class TablePage extends Page {


  titlex() {
    return "CRUD example";
  }

  animinx() {
    return "zoomIn";
  }

  animoutx() {
    return "fadeOut";
  }

  propsx() {
    return {
      class: "w-full"
    }
  }

  contentx() {
    return {
      class: "flex flex-col items-center mb-6 w-full",
      html: [
        
        new BuildingsCRUDTable
      ],
    }
  }

}

register(TablePage);
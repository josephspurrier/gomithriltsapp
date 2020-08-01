import m from "mithril";
import Menu from "@/component/menu";
import Flash from "@/component/flash";

const main = (): m.Component => {
  return {
    view: ({ children }) => {
      return m("main.layout", [m(Menu), m("section", children), m(Flash)]);
    },
  };
};

export default main;

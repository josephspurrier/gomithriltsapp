import m from "mithril";
import Menu from "@/component/menu";
import Flash from "@/component/flash";

const View = (): m.Component => {
  return {
    view: ({ children }) => {
      return m("main.layout", [m(Menu), m("section", children), m(Flash)]);
    },
  };
};

export default View;

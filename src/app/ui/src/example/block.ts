import m from "mithril";

const block = (): m.Component => {
  return {
    view: ({ children }) => m("div", children),
  };
};

export default block;

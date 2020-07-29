import m from "mithril";

const Block = (): m.Component => {
  return {
    view: ({ children }) => m("div", children),
  };
};

export default Block;

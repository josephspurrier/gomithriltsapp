import m from "mithril";

const Block = (): m.Component => {
  return {
    view: (vnode) => m("div", vnode.children),
  };
};

export default Block;

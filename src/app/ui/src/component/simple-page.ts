import m from "mithril";

interface defaultProps {
  title?: string;
  description?: m.Vnode;
  content?: string;
}

const Page: m.Component<defaultProps> = {
  view: ({ attrs }) =>
    m("div", [
      m("section", { class: "section" }, [
        m("div", { class: "container" }, [
          m("h1", { class: "title" }, attrs.title),
          m("h2", { class: "subtitle" }, attrs.description),
          m("div", attrs.content),
        ]),
      ]),
    ]),
};

export default Page;

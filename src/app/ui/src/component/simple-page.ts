import m from "mithril";

interface defaultAttrs {
  title?: string;
  description?: string;
}

const Page: m.Component<defaultAttrs> = {
  view: ({ attrs, children }) =>
    m("div", [
      m("section", { class: "section" }, [
        m("div", { class: "container" }, [
          m("h1", { class: "title" }, attrs.title),
          m("h2", { class: "subtitle" }, attrs.description),
          children,
        ]),
      ]),
    ]),
};

export default Page;

import m from "mithril";

interface Attrs {
  title?: string;
  description?: string;
}

export const SimplePage: m.Component<Attrs> = {
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

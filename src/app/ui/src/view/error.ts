import m from "mithril";

const Page: m.Component = {
  view: () =>
    m("div", [
      m("section", { class: "section" }, [
        m("div", { class: "container" }, [
          m("h1", { class: "title" }, "Error"),
          m("h2", { class: "subtitle" }, "The page is not found."),
        ]),
      ]),
    ]),
};

export default Page;

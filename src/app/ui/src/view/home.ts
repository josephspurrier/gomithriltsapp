import m from "mithril";

const data = {
  title: "Welcome",
  subtitle: "Login was successful",
};

const Page: m.Component = {
  view: () =>
    m("div", [
      m("section", { class: "hero is-primary" }, [
        m("div", { class: "hero-body" }, [
          m("div", { class: "container" }, [
            m("h1", { class: "title" }, data.title),
            m("h2", { class: "subtitle" }, data.subtitle),
          ]),
        ]),
      ]),
      m("br"),
      m("div", { class: "container" }, [
        m(m.route.Link, { href: "/notepad", "data-cy": "notepad-link" }, [
          " Click here to access your Notepad. ",
        ]),
      ]),
    ]),
};

export default Page;

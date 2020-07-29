import m from "mithril";

const Page: m.ClosureComponent = () => {
  return {
    view: () =>
      m("div", [
        m("section", { class: "hero is-primary" }, [
          m("div", { class: "hero-body" }, [
            m("div", { class: "container" }, [
              m("h1", { class: "title" }, "Welcome"),
              m("h2", { class: "subtitle" }, "Login was successful"),
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
};

export default Page;

import m from "mithril";
import SimplePage from "@/component/simple-page";

const about: m.ClosureComponent = () => {
  return {
    view: () =>
      m(
        SimplePage,
        {
          title: "About",
        },
        [
          m("div", [
            "This shows you how to build a website using ",
            m("strong", "Mithril"),
            ", ",
            m("strong", "Go"),
            ", and ",
            m("strong", "Bulma"),
            ".",
          ]),
        ]
      ),
  };
};

export default about;

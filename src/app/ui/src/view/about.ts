import m from "mithril";
import SimplePage from "@/component/simple-page";

const data = {
  title: "About",
  description: {
    view: () =>
      m("div", [
        "This shows you how to build a website using ",
        m("strong", "Mithril"),
        ", ",
        m("strong", "Go"),
        ", and ",
        m("strong", "Bulma"),
        ".",
      ]),
  },
};

const Page = (): m.Component => {
  return {
    view: () =>
      m(SimplePage, {
        title: data.title,
        description: m(data.description),
      }),
  };
};

export default Page;

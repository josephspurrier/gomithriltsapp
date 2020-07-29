import m from "mithril";
import SimplePage from "@/component/simple-page";

const Page: m.ClosureComponent = () => {
  return {
    view: () =>
      m(SimplePage, {
        title: "Error",
        description: "The page is not found.",
      }),
  };
};

export default Page;

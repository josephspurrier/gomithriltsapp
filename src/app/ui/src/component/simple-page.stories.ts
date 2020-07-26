import m from "mithril";
import { withKnobs, text } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import SimplePage from "@/component/simple-page";

export default {
  title: "Component/Simple Page",
  component: SimplePage,
  decorators: [withKnobs, withA11y],
};

export const WithContent = (): m.Component => ({
  view: () =>
    m(SimplePage, {
      title: text("Title", "This is the Title"),
      description: m(
        "span",
        text("Description", "This is a subtitle or description.")
      ),
      content: text("Content", "This is the content."),
    }),
});

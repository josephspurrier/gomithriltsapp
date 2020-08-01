import m from "mithril";
import { withKnobs, text } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { MainLayout } from "./main";
import { SimplePage } from "@/component/simple-page";

export default {
  title: "Component/Layout Main",
  component: MainLayout,
  decorators: [withKnobs, withA11y],
};

export const simplePage = (): m.Component => ({
  view: () => {
    return m(
      MainLayout,
      m(
        SimplePage,
        {
          title: text("Title", "This is the Title"),
          description: text(
            "Description",
            "This is a subtitle or description."
          ),
        },
        [text("Content", "This is the content.")]
      )
    );
  },
});

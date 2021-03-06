import m from "mithril";
import { withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import { AboutPage } from "@/view/about";

export default {
  title: "View/About",
  component: AboutPage,
  decorators: [withKnobs, withA11y],
};

export const about = (): m.Component => ({
  view: () => m(AboutPage),
});

import m from "mithril";
import { withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import ErrorPage from "@/view/error";

export default {
  title: "View/Error",
  component: ErrorPage,
  decorators: [withKnobs, withA11y],
};

export const error = (): m.Component => ({
  view: () => m(ErrorPage),
});

// eslint-disable-next-line no-unused-vars
import m from "mithril";
import { withKnobs } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import LoginPage from "@/view/login";
import MockRequest from "@/component/mockrequest";
import "~/style/main.scss";

export default {
  title: "View/Login",
  component: LoginPage,
  decorators: [withKnobs, withA11y],
};

export const login = () => ({
  oninit: () => {
    MockRequest.ok({}, true);
  },
  view: () => <LoginPage />,
});

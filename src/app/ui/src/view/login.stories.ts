import m from "mithril";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import LoginPage from "@/view/login";
import Flash from "@/component/flash";
import { rest } from "msw";
import { worker } from "@/mock/browser";

export default {
  title: "View/Login",
  component: LoginPage,
  decorators: [withKnobs, withA11y],
};

// FIXME: I don't think the flash is working.

export const login = (): m.Component => ({
  oninit: () => {
    const shouldFail = boolean("Fail", false);

    worker.use(
      ...[
        rest.post("/api/v1/login", (req, res, ctx) => {
          if (shouldFail) {
            return res(
              ctx.status(400),
              ctx.json({
                message: "There was an error.",
              })
            );
          } else {
            return res(
              ctx.status(200),
              ctx.json({
                message: "ok",
              })
            );
          }
        }),
      ]
    );
  },
  view: () =>
    m("main", [
      m(
        LoginPage,
        {
          email: text("Email", "jsmith@example.com"),
          password: text("Password", "password"),
        },
        m(Flash)
      ),
    ]),
});

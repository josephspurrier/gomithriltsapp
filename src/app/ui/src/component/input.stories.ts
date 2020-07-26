import m from "mithril";
import { withKnobs, text, select } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import Input from "./input";

export default {
  title: "Component/Input",
  component: Input,
  decorators: [withKnobs, withA11y],
};

interface State {
  type: string;
}

export const input = (): m.Component<null, State> => ({
  oninit: (vnode) => {
    vnode.state.type = select(
      "Type",
      {
        text: "text",
        color: "color",
        date: "date",
        "datetime-local": "datetime-local",
        email: "email",
        hidden: "hidden",
        month: "month",
        number: "number",
        password: "password",
        range: "range",
        search: "search",
        time: "time",
        week: "week",
      },
      "text"
    );
  },
  view: (vnode) =>
    m(Input, {
      name: "first_name",
      label: "First Name",
      value: text("Value", "John"),
      type: vnode.state.type,
      oninput: function (): void {
        console.log("changed");
      },
    }),
});

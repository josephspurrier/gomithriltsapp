import m from "mithril";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import Block from "@/example/block";

export default {
  title: "Example/Block",
  component: Block,
  decorators: [withKnobs, withA11y],
};

export const button = (): m.Component => ({
  view: () =>
    m(
      "button",
      {
        disabled: boolean("Disabled", false),
        onclick: function () {
          action("button-click");
          console.log("Clicked!");
        },
      },
      text("Label", "Hello Storybook")
    ),
});

export const dynamicText = (): m.Component => ({
  view: () => {
    const name = text("Name", "Joe");
    const age = number("Age", 32);
    const content = `I am ${name} and I'm ${age} years old.`;

    return m("", content);
  },
});

export const long = (): m.Component => {
  return {
    view: () => m(Block, text("Text", "Long")),
  };
};

export const short = (): m.Component => ({
  view: () => m(Block, text("Text", "Short")),
});

export const emoji = (): m.Component => ({
  view: () =>
    m("block", [
      m("form", [
        m("span", { role: "img", "aria-label": "so cool" }, "😀 😎 👍 💯"),
      ]),
    ]),
});

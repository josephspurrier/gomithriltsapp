import m from "mithril";
import {
  withKnobs,
  text,
  select,
  button,
  number,
  boolean,
} from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import Flash from "@/component/flash";

export default {
  title: "Component/Flash",
  component: Flash,
  decorators: [withKnobs, withA11y],
};

export const success = (): m.Component => ({
  oninit: () => {
    Flash.timeout = -1;
    Flash.success(text("Text", "This is a success message."));
  },
  onremove: () => {
    Flash.clear();
  },
  view: () => m(Flash),
});

export const failed = (): m.Component => ({
  oninit: () => {
    Flash.timeout = -1;
    Flash.failed(text("Text", "This is a failed message."));
  },
  onremove: () => {
    Flash.clear();
  },
  view: () => m(Flash),
});

export const warning = (): m.Component => ({
  oninit: () => {
    Flash.timeout = -1;
    Flash.warning(text("Text", "This is a warning message."));
  },
  onremove: () => {
    Flash.clear();
  },
  view: () => m(Flash),
});

export const primary = (): m.Component => ({
  oninit: () => {
    Flash.timeout = -1;
    Flash.primary(text("Text", "This is a primary message."));
  },
  onremove: () => {
    Flash.clear();
  },
  view: () => m(Flash),
});

export const link = (): m.Component => ({
  oninit: () => {
    Flash.timeout = -1;
    Flash.link(text("Text", "This is a link message."));
  },
  onremove: () => {
    Flash.clear();
  },
  view: () => m(Flash),
});

export const info = (): m.Component => ({
  oninit: () => {
    Flash.timeout = -1;
    Flash.info(text("Text", "This is a info message."));
  },
  onremove: () => {
    Flash.clear();
  },
  view: () => m(Flash),
});

export const dark = (): m.Component => ({
  oninit: () => {
    Flash.timeout = -1;
    Flash.dark(text("Text", "This is a dark message."));
  },
  onremove: () => {
    Flash.clear();
  },
  view: () => m(Flash),
});

export const Action = (): m.Component => ({
  oninit: () => {
    Flash.timeout = number("Timeout (milliseconds)", 2000);
    Flash.prepend = boolean("Prepend", false);
    const s = select(
      "Type",
      {
        success: "success",
        failed: "failed",
        warning: "warning",
        primary: "primary",
        link: "link",
        info: "info",
        dark: "dark",
      },
      "success"
    );
    Flash[s](text("Text", "This is a test message."));
    button("Show Message", () => {
      console.log("Show message");
    });
  },
  onremove: () => {
    Flash.clear();
  },
  view: () => m(Flash),
});

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
import {
  Flash,
  showFlash,
  setFlashTimeout,
  setPrepend,
  clearFlash,
  MessageType,
} from "@/component/flash";

export default {
  title: "Component/Flash",
  component: Flash,
  decorators: [withKnobs, withA11y],
};

export const success = (): m.Component => ({
  oninit: () => {
    setFlashTimeout(-1);
    showFlash(text("Text", "This is a success message."), MessageType.success);
  },
  onremove: () => {
    clearFlash();
  },
  view: () => m(Flash),
});

export const failed = (): m.Component => ({
  oninit: () => {
    setFlashTimeout(-1);
    showFlash(text("Text", "This is a failed message."), MessageType.failed);
  },
  onremove: () => {
    clearFlash();
  },
  view: () => m(Flash),
});

export const warning = (): m.Component => ({
  oninit: () => {
    setFlashTimeout(-1);
    showFlash(text("Text", "This is a warning message."), MessageType.warning);
  },
  onremove: () => {
    clearFlash();
  },
  view: () => m(Flash),
});

export const primary = (): m.Component => ({
  oninit: () => {
    setFlashTimeout(-1);
    showFlash(text("Text", "This is a primary message."), MessageType.primary);
  },
  onremove: () => {
    clearFlash();
  },
  view: () => m(Flash),
});

export const link = (): m.Component => ({
  oninit: () => {
    setFlashTimeout(-1);
    showFlash(text("Text", "This is a link message."), MessageType.link);
  },
  onremove: () => {
    clearFlash();
  },
  view: () => m(Flash),
});

export const info = (): m.Component => ({
  oninit: () => {
    setFlashTimeout(-1);
    showFlash(text("Text", "This is a info message."), MessageType.info);
  },
  onremove: () => {
    clearFlash();
  },
  view: () => m(Flash),
});

export const dark = (): m.Component => ({
  oninit: () => {
    setFlashTimeout(-1);
    showFlash(text("Text", "This is a dark message."), MessageType.dark);
  },
  onremove: () => {
    clearFlash();
  },
  view: () => m(Flash),
});

export const action = (): m.Component => ({
  oninit: () => {
    console.log("yeah");
    setFlashTimeout(number("Timeout (milliseconds)", 2000));
    setPrepend(boolean("Prepend", false));
    const s = select("Type", MessageType, MessageType.success);
    showFlash(text("Text", "This is a test message."), s);
    button("Show Message", () => {
      console.log("Show message");
    });
  },
  onremove: () => {
    clearFlash();
  },
  view: () => m(Flash),
});

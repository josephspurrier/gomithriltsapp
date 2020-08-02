import m from "mithril";
import { randId } from "@/module/random";

// Create a flash message class with Bulma.
// http://bulma.io/documentation/components/message/

// Types of flash message.
enum MessageType {
  success = "is-success",
  failed = "is-danger",
  warning = "is-warning",
  primary = "is-primary",
  link = "is-link",
  info = "is-info",
  dark = "is-dark",
}

// Structure of a flash message.
interface FlashMessage {
  message: string;
  style: MessageType;
}

export const Flash = {
  list: [] as FlashMessage[],
  timeout: 4000, // milliseconds
  prepend: false,
  success: (message: string): void => {
    Flash.addFlash(message, MessageType.success);
  },
  failed: (message: string): void => {
    Flash.addFlash(message, MessageType.failed);
  },
  warning: (message: string): void => {
    Flash.addFlash(message, MessageType.warning);
  },
  primary: (message: string): void => {
    Flash.addFlash(message, MessageType.primary);
  },
  link: (message: string): void => {
    Flash.addFlash(message, MessageType.link);
  },
  info: (message: string): void => {
    Flash.addFlash(message, MessageType.info);
  },
  dark: (message: string): void => {
    Flash.addFlash(message, MessageType.dark);
  },
  addFlash: (message: string, style: MessageType): void => {
    // Don't show a message if zero.
    if (Flash.timeout === 0) {
      return;
    }

    const msg: FlashMessage = {
      message: message,
      style: style,
    };

    //Check if the messages should stack in reverse order.
    if (Flash.prepend === true) {
      Flash.list.unshift(msg);
    } else {
      Flash.list.push(msg);
    }

    m.redraw();

    // Show forever if -1.
    if (Flash.timeout > 0) {
      setTimeout(() => {
        Flash.removeFlash(msg);
        m.redraw();
      }, Flash.timeout);
    }
  },
  removeFlash: (i: FlashMessage): void => {
    Flash.list = Flash.list.filter((v) => {
      return v !== i;
    });
  },
  clear: (): void => {
    Flash.list = [];
  },
  view: (): m.Vnode =>
    m(
      "div",
      {
        style: {
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          "z-index": "100",
          margin: "0",
        },
      },
      [
        Flash.list.map((i) =>
          m("div", { class: `notification ${i.style}`, key: randId() }, [
            i.message,
            m("button", {
              class: "delete",
              onclick: function () {
                Flash.removeFlash(i);
              },
            }),
          ])
        ),
      ]
    ),
};

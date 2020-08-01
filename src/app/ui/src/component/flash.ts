import m from "mithril";

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

const flash = {
  list: [] as FlashMessage[],
  timeout: 4000, // milliseconds
  prepend: false,
  randId: (): string => {
    const min = 1;
    const max = 99999999999999;
    const randomNum = Math.random() * (max - min) + min;
    return Math.floor(randomNum).toString();
  },
  success: (message: string): void => {
    flash.addFlash(message, MessageType.success);
  },
  failed: (message: string): void => {
    flash.addFlash(message, MessageType.failed);
  },
  warning: (message: string): void => {
    flash.addFlash(message, MessageType.warning);
  },
  primary: (message: string): void => {
    flash.addFlash(message, MessageType.primary);
  },
  link: (message: string): void => {
    flash.addFlash(message, MessageType.link);
  },
  info: (message: string): void => {
    flash.addFlash(message, MessageType.info);
  },
  dark: (message: string): void => {
    flash.addFlash(message, MessageType.dark);
  },
  addFlash: (message: string, style: MessageType): void => {
    // Don't show a message if zero.
    if (flash.timeout === 0) {
      return;
    }

    const msg: FlashMessage = {
      message: message,
      style: style,
    };

    //Check if the messages should stack in reverse order.
    if (flash.prepend === true) {
      flash.list.unshift(msg);
    } else {
      flash.list.push(msg);
    }

    m.redraw();

    // Show forever if -1.
    if (flash.timeout > 0) {
      setTimeout(() => {
        flash.removeFlash(msg);
        m.redraw();
      }, flash.timeout);
    }
  },
  removeFlash: (i: FlashMessage): void => {
    flash.list = flash.list.filter((v) => {
      return v !== i;
    });
  },
  clear: (): void => {
    flash.list = [];
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
        flash.list.map((i) =>
          m("div", { class: `notification ${i.style}`, key: flash.randId() }, [
            i.message,
            m("button", {
              class: "delete",
              onclick: function () {
                flash.removeFlash(i);
              },
            }),
          ])
        ),
      ]
    ),
};

export default flash;

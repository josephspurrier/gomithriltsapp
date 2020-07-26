import m from "mithril";

// Create a flash message class with Bulma.
// http://bulma.io/documentation/components/message/

// Types of styles available for the flash messages.
export enum messageType {
  success = "is-success",
  failed = "is-danger",
  warning = "is-warning",
  primary = "is-primary",
  link = "is-link",
  info = "is-info",
  dark = "is-dark",
}

// flashMessage is used by the component and by others calling the component.
interface flashMessage {
  message: string;
  style: messageType;
}

function randId(): string {
  const min = 10000;
  const max = 99999999999999;
  const randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum).toString();
}

const View = {
  list: [] as flashMessage[],
  timeout: 4000, // milliseconds
  prepend: false,
  success: (message: string): void => {
    View.addFlash(message, messageType.success);
  },
  failed: (message: string): void => {
    View.addFlash(message, messageType.failed);
  },
  warning: (message: string): void => {
    View.addFlash(message, messageType.warning);
  },
  primary: (message: string): void => {
    View.addFlash(message, messageType.primary);
  },
  link: (message: string): void => {
    View.addFlash(message, messageType.link);
  },
  info: (message: string): void => {
    View.addFlash(message, messageType.info);
  },
  dark: (message: string): void => {
    View.addFlash(message, messageType.dark);
  },
  addFlash: (message: string, style: messageType): void => {
    // Don't show a message if zero.
    if (View.timeout === 0) {
      return;
    }

    const msg = {
      message: message,
      style: style,
    };

    //Check if the messages should stack in reverse order.
    if (View.prepend === true) {
      View.list.unshift(msg);
    } else {
      View.list.push(msg);
    }

    m.redraw();

    // Show forever if -1.
    if (View.timeout > 0) {
      setTimeout(() => {
        View.removeFlash(msg);
        m.redraw();
      }, View.timeout);
    }
  },
  removeFlash: (i: flashMessage): void => {
    View.list = View.list.filter((v) => {
      return v !== i;
    });
  },
  clear: (): void => {
    View.list = [];
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
        View.list.map((i) =>
          m("div", { class: `notification ${i.style}`, key: randId() }, [
            i.message,
            m("button", {
              class: "delete",
              onclick: function () {
                View.removeFlash(i);
              },
            }),
          ])
        ),
      ]
    ),
};

export default View;

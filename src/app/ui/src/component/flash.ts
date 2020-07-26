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
  view: (): m.Vnode => {
    return m("div", "");
    // <div style="position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 100; margin: 0;">
    //   {View.list.map((i) => (
    //     <div key={i} class={`notification ${i.style}`}>
    //       {i.message}
    //       <button
    //         class="delete"
    //         onclick={() => {
    //           View.removeFlash(i);
    //         }}
    //       ></button>
    //     </div>
    //   ))}
    // </div>
  },
};

export default View;

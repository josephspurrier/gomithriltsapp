import m from "mithril";
import { debounce } from "@/module/debounce";
import NoteStore from "@/store/notestore";

interface Attrs {
  id: string;
  message?: string;
  oninput: (e: { target: HTMLInputElement }) => void;
}

interface State {
  saving: string;
}

const note = (): m.Component<Attrs, State> => {
  return {
    view: ({ attrs, state }) =>
      m("li", { style: { "margin-top": "12px" } }, [
        m("div", { class: "box" }, [
          m("div", { class: "content" }, [
            m("div", { class: "editable" }, [
              m("input", {
                class: "input individual-note",
                id: attrs.id,
                type: "text",
                value: attrs.message,
                oninput: attrs.oninput,
                onkeyup: function (e: { target: HTMLInputElement }) {
                  debounce(
                    attrs.id,
                    () => {
                      NoteStore.runUpdate(attrs.id, e.target.value);
                      state.saving = "Saving...";
                      m.redraw();
                      setTimeout(() => {
                        state.saving = "";
                        m.redraw();
                      }, 1000);
                    },
                    1000
                  );
                },
              }),
            ]),
          ]),
          m("nav", { class: "level is-mobile" }, [
            m("div", { class: "level-left" }, [
              m(
                "a",
                {
                  class: "level-item",
                  title: "Delete note",
                  onclick: function () {
                    NoteStore.runDelete(attrs.id);
                  },
                },
                [
                  m("span", { class: "icon is-small has-text-danger" }, [
                    m("i", {
                      class: "fas fa-trash",
                      "data-cy": "delete-note-link",
                    }),
                  ]),
                ]
              ),
            ]),
            m(
              "div",
              { class: "level-right", style: { "min-height": "1.2rem" } },
              [m("span", { class: "is-size-7 has-text-grey" }, state.saving)]
            ),
          ]),
        ]),
      ]),
  };
};

export default note;

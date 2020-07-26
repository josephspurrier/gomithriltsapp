import m from "mithril";
import NoteStore from "@/store/notestore";
import Note from "@/component/note";

interface Notes {
  id: string;
  message: string;
}

const Page: m.ClosureComponent = () => {
  NoteStore.load();

  return {
    view: () =>
      m("section", { class: "section", id: "note-section" }, [
        m("div", { class: "container" }, [
          m("div", { class: "box" }, [
            m("div", { class: "field" }, [
              m("label", { class: "label" }, "To Do"),
              m("div", { class: "control" }, [
                m("input", {
                  class: "input",
                  type: "text",
                  placeholder: "What would you like to do?",
                  name: "note-add",
                  "data-cy": "note-text",
                  onkeypress: function (e: KeyboardEvent) {
                    if (e.key !== "Enter") {
                      return;
                    }
                    NoteStore.submit();
                  },
                  oninput: function (e: { target: HTMLInputElement }) {
                    NoteStore.current.message = e.target.value;
                  },
                  value: NoteStore.current.message,
                }),
              ]),
            ]),
            m("nav", { class: "level is-mobile" }, [
              m("div", { class: "level-left" }, [
                m(
                  "a",
                  {
                    class: "level-item",
                    title: "Add note",
                    onclick: "{NoteStore.submit}",
                  },
                  [
                    m("span", { class: "icon is-small has-text-success" }, [
                      m("i", {
                        class: "far fa-plus-square",
                        "data-cy": "add-note-link",
                      }),
                    ]),
                  ]
                ),
              ]),
            ]),
          ]),
          m("div", [
            m("ul", { id: "listTodo" }, [
              NoteStore.list.map((note: Notes) =>
                m(Note, {
                  key: note.id,
                  id: note.id,
                  message: note.message,
                  oninput: function (e: { target: HTMLInputElement }) {
                    note.message = e.target.value;
                  },
                })
              ),
            ]),
          ]),
        ]),
      ]),
  };
};

export default Page;

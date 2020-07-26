import m from "mithril";
import Debounce from "@/module/debounce";
import NoteStore from "@/store/notestore";

interface defaultAttrs {
  id: string;
  message?: string;
  oninput: (e: string) => void;
}

interface defaultState {
  saving: string;
}

const View = (): m.Component<defaultAttrs, defaultState> => {
  return {
    view: (vnode) => (
      <li style="margin-top: 12px;">
        <div class="box">
          <div class="content">
            <div class="editable">
              <input
                id={vnode.attrs.id}
                type="text"
                class="input individual-note"
                value={vnode.attrs.message}
                oninput={vnode.attrs.oninput}
                onkeyup={(e: { target: HTMLInputElement }) => {
                  Debounce.run(
                    vnode.attrs.id,
                    () => {
                      NoteStore.runUpdate(vnode.attrs.id, e.target.value);
                      vnode.state.saving = "Saving...";
                      m.redraw();
                      setTimeout(() => {
                        vnode.state.saving = "";
                        m.redraw();
                      }, 1000);
                    },
                    1000
                  );
                }}
              />
            </div>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a
                title="Delete note"
                class="level-item"
                onclick={() => {
                  NoteStore.runDelete(vnode.attrs.id);
                }}
              >
                <span class="icon is-small has-text-danger">
                  <i class="fas fa-trash" data-cy="delete-note-link"></i>
                </span>
              </a>
            </div>
            <div class="level-right" style="min-height: 1.2rem;">
              <span class="is-size-7 has-text-grey">{vnode.state.saving}</span>
            </div>
          </nav>
        </div>
      </li>
    ),
  };
};

export default View;
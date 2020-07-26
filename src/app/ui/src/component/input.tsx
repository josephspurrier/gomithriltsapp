import m from "mithril";

interface defaultAttrs {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  oninput: (e: { target: HTMLInputElement }) => void;
}

const View = (): m.Component<defaultAttrs> => {
  return {
    view: ({ attrs }) => (
      <div class="field">
        <label class="label">{attrs.label}</label>
        <div class="control">
          <input
            name={attrs.name}
            type={attrs.type || "text"}
            class="input"
            data-cy={attrs.name}
            required={attrs.required || false}
            oninput={attrs.oninput}
            value={attrs.value}
          ></input>
        </div>
      </div>
    ),
  };
};

export default View;

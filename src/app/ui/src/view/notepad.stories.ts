import m from "mithril";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { withA11y } from "@storybook/addon-a11y";
import NotepadPage from "@/view/notepad";
import Flash from "@/component/flash";
import { rest } from "msw";
import { worker } from "@/mock/browser";

export default {
  title: "View/Notepad",
  component: NotepadPage,
  decorators: [withKnobs, withA11y],
};

interface Note {
  id: string;
  message: string;
}

interface Message {
  message: string;
}

function randId(): string {
  const min = 10000;
  const max = 99999999999999;
  const randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum).toString();
}

export const notepad = (): m.Component => ({
  oninit: () => {
    const shouldFail = boolean("Fail", false);

    const notes = [] as Note[];

    worker.use(
      ...[
        rest.get("/api/v1/note", (req, res, ctx) => {
          if (shouldFail) {
            return res(
              ctx.status(400),
              ctx.json({
                message: "There was an error.",
              })
            );
          } else {
            return res(
              ctx.status(200),
              ctx.json({
                notes: notes,
              })
            );
          }
        }),
        rest.delete("/api/v1/note/:noteId", (req, res, ctx) => {
          if (shouldFail) {
            return res(
              ctx.status(400),
              ctx.json({
                message: "There was an error.",
              })
            );
          } else {
            const { noteId } = req.params;
            console.log("Found:", noteId);
            return res(
              ctx.status(200),
              ctx.json({
                message: "ok",
              })
            );
          }
        }),
        rest.post("/api/v1/note", (req, res, ctx) => {
          if (shouldFail) {
            return res(
              ctx.status(400),
              ctx.json({
                message: "There was an error.",
              })
            );
          } else {
            const m = req.body as Message;
            const id = randId();
            notes.push({ id: id, message: m.message });
            return res(
              ctx.status(201),
              ctx.json({
                message: "ok",
              })
            );
          }
        }),
        rest.put("/api/v1/note/:noteId", (req, res, ctx) => {
          if (shouldFail) {
            return res(
              ctx.status(400),
              ctx.json({
                message: "There was an error.",
              })
            );
          } else {
            const { noteId } = req.params;
            console.log("Found:", noteId);
            return res(
              ctx.status(200),
              ctx.json({
                message: "ok",
              })
            );
          }
        }),
      ]
    );
  },
  view: () => m("main", [m(NotepadPage), m(Flash)]),
});

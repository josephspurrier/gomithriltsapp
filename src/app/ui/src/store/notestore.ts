import m from "mithril";
import { Flash } from "@/component/flash";
import { bearerToken } from "@/module/cookiestore";

export interface Note {
  id: string;
  message: string;
}

interface NoteResponse {
  notes: Note[];
}

export const submit = (n: Note): Promise<void> => {
  return create(n)
    .then(() => {
      Flash.success("Note created.");
    })
    .catch((err) => {
      Flash.warning(err.response.message);
      throw err;
    });
};

export const create = (body: Note): Promise<void> => {
  return m.request({
    method: "POST",
    url: "/api/v1/note",
    headers: {
      Authorization: bearerToken(),
    },
    body,
  });
};

export const load = (): Promise<Note[]> => {
  return m
    .request({
      method: "GET",
      url: "/api/v1/note",
      headers: {
        Authorization: bearerToken(),
      },
    })
    .then((raw: unknown) => {
      const result = raw as NoteResponse;
      if (result) {
        return result.notes;
      }
      Flash.failed("Data returned is not valid.");
      return [] as Note[];
    });
};

export const runUpdate = (id: string, value: string): void => {
  update(id, value).catch((e) => {
    Flash.warning("Could not update note: " + e.response.message);
  });
};

export const update = (id: string, text: string): Promise<void> => {
  return m.request({
    method: "PUT",
    url: "/api/v1/note/" + id,
    headers: {
      Authorization: bearerToken(),
    },
    body: { message: text },
  });
};

export const runDelete = (id: string): Promise<void> => {
  return deleteNote(id)
    .then(() => {
      Flash.success("Note deleted.");
    })
    .catch((err) => {
      Flash.warning("Could not delete: " + err.response.message);
    });
};

export const deleteNote = (id: string): Promise<void> => {
  return m.request({
    method: "DELETE",
    url: "/api/v1/note/" + id,
    headers: {
      Authorization: bearerToken(),
    },
  });
};

import m from "mithril";
import { showFlash, MessageType } from "@/component/flash";
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
      showFlash("Note created.", MessageType.success);
    })
    .catch((err) => {
      showFlash(err.response.message, MessageType.warning);
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
      showFlash("Data returned is not valid.", MessageType.failed);
      return [] as Note[];
    });
};

export const runUpdate = (id: string, value: string): void => {
  update(id, value).catch((e) => {
    showFlash(
      "Could not update note: " + e.response.message,
      MessageType.warning
    );
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
      showFlash("Note deleted.", MessageType.success);
    })
    .catch((err) => {
      showFlash(
        "Could not delete: " + err.response.message,
        MessageType.warning
      );
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

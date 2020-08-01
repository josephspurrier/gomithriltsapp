const submit = {
  disabled: false,
  submitText: "Submitting...",
  start: function (event: { preventDefault: () => void }): void {
    event.preventDefault();
    submit.disabled = true;
  },
  finish: function (): void {
    submit.disabled = false;
  },
  text: function (s: string): string {
    return !submit.disabled ? s : submit.submitText;
  },
};

export default submit;

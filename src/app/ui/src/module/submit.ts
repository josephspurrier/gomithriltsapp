const Submit = {
  disabled: false,
  submitText: "Submitting...",
  start: function (event: { preventDefault: () => void }): void {
    event.preventDefault();
    Submit.disabled = true;
  },
  finish: function (): void {
    Submit.disabled = false;
  },
  text: function (s: string): string {
    if (!Submit.disabled) {
      return s;
    } else {
      return Submit.submitText;
    }
  },
};

export default Submit;

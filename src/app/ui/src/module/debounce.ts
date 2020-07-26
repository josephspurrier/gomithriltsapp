const Debounce = {
  m: new Map(),
  run(id: string, func: () => void, timeout: number): void {
    if (this.m[id]) {
      clearTimeout(this.m[id]);
    }
    this.m[id] = setTimeout(func, timeout);
  },
};

export default Debounce;

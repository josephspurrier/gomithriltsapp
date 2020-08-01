const debounce = {
  m: new Map<string, ReturnType<typeof setTimeout>>(),
  run(id: string, func: () => void, timeout: number): void {
    const timer = this.m.get(id);
    if (timer) {
      clearTimeout(timer);
    }
    this.m.set(id, setTimeout(func, timeout));
  },
};

export default debounce;

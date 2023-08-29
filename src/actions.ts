export const selectOnFocus = (node: HTMLInputElement) => {
  if (node && typeof node.select === "function") {
    const onFocus = (event: Event) => node.select();
    node.addEventListener("focus", onFocus);

    return {
      destroy: () => node.removeEventListener("focus", onFocus),
    };
  }
}

export const focusOnInit = (node: HTMLElement) => {
  node && typeof node.focus === "function" && node.focus()
}

export const selectOnFocus = (node) => {
    if (node && typeof node.select === "function") {
        const onFocus = (event) => node.select();
        node.addEventListener("focus", onFocus);
        return {
            destroy: () => node.removeEventListener("focus", onFocus),
        };
    }
};
export const focusOnInit = (node) => {
    node && typeof node.focus === "function" && node.focus();
};
//# sourceMappingURL=actions.js.map
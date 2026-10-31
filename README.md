# `@tailwindcss/node`: an `@import` that failed to resolve keeps failing for up to 4 s after the file is written

```sh
npm install
npm start
```

Expected: the second compile, right after `accent.css` is written, resolves the import.

Seen:

```
before accent.css exists: Can't resolve './accent.css' in '…'
right after writing accent.css: Can't resolve './accent.css' in '…'
4.5 s after writing accent.css: resolved
```

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from `app/`:

```bash
cd app
npm install        # install dependencies
npm run dev        # dev server at localhost:5173
npm run build      # production build
npm run lint       # ESLint
npm run preview    # preview production build
```

## Architecture

React 19 + Vite 8 app that generates Samsung DS DevRel newsletters. Two output formats from two **immutable** template files at the project root:

- **template_markdown.md** — web HTML with CSS. Uses HTML comment markers (`<!-- news -->` … `<!-- //end news -->`) to delimit dynamic sections that get rebuilt from form data.
- **template_email.md** — email-safe table HTML. Treated as a **static** template: only `{{PLACEHOLDER}}` tokens are replaced. Never reconstruct or remove any HTML in this template.

Templates are loaded via Vite `?raw` imports (three levels up from `src/lib/`). Vite config has `server.fs.allow` set to the parent directory to permit this.

### Key modules (`app/src/lib/`)

| Module | Purpose |
|---|---|
| `templateEngine.js` | `processMarkdown()` rebuilds sections + replaces placeholders (image URLs). `processEmail()` does **only** placeholder replacement (image base64). |
| `placeholders.js` | `buildPlaceholderMap(state, 'url'|'base64')` → flat map. `replacePlaceholders(template, map)` → regex substitution. Handles literal `\` in email template placeholder names (e.g. `{{NEWS1\_THUMBNAIL\_IMAGE}}`). |
| `markdownGenerator.js` | Builds HTML section strings for the markdown template. |
| `emailGenerator.js` | Legacy; not currently imported by templateEngine. |

### State management

`useReducer` in `App.jsx` with reducer/initial state in `store.js`. Actions: `SET_FIELD`, `SET_ITEM_FIELD`, `ADD_ITEM`, `REMOVE_ITEM`, `RESET`.

### Critical constraints

1. **Never modify template files** (`template_markdown.md`, `template_email.md`).
2. **Email template = pure placeholder replacement only.** No section rebuilding, no HTML manipulation.
3. Email template placeholders contain literal backslash characters (byte 0x5c) due to Markdown escaping. The regex in `placeholders.js` must match `[\w\\]+` inside `{{…}}` and normalize by stripping backslashes.
4. Images: URL mode for markdown output, base64 mode for email output.

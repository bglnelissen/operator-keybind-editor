# OPERATOR — Keybind Editor

A browser-based editor for the keybindings of [OPERATOR](https://store.steampowered.com/app/1913370/OPERATOR/)
(VECTOR INTERACTIVE). Load your `KeyBinds.es3`, rebind keys by clicking a badge and pressing the
new key, and download the result.

Everything runs client-side. No file is ever uploaded to a server.

## Features

- **Load your own bindings** — drag and drop `KeyBinds.es3`, or browse for it.
- **Bundled factory defaults** — the game's default bindings ship with the tool and load
  automatically, so the page is never empty on arrival.
- **Click-to-rebind** — click a key badge, press any key or mouse button. Modifier combos
  (e.g. `Shift` + `T`) are supported.
- **Activation types** — Press, Release, Hold, Double Click and Hold Delayed are editable per action.
- **Presets** — Default and Numpad are built in and read-only. Save your own under any name and
  it becomes *live*: every rebind and activation-type change is written back to it immediately,
  no save step.
- **Keyboard map on hover** — hovering a binding highlights the physical key on a schematic
  full-size keyboard (main block, navigation cluster, arrows, numpad).
- **Recent uploads** — previously loaded files stay available so you can switch back.
- **Print / PDF export** — all bindings on a single A4 sheet, headed with the preset name.
  A config that has no name yet is named first, which also stores it as a preset.

## Where to find your keybinds file

```
%USERPROFILE%\AppData\LocalLow\VECTOR INTERACTIVE\OPERATOR\Saves\Save0\
```

The file is `KeyBinds.es3`. It is plain JSON written by
[Easy Save 3](https://moodkie.com/easy-save/), so it can be read and edited as text.

**Back up your original before overwriting it.** The tool has a *Download backup (original)*
button for exactly this.

## Running it

It is a static site — no build step, no dependencies.

Because the page fetches the bundled defaults, it must be served over HTTP.
Opening `index.html` directly from disk (`file://`) will skip the auto-load and fall back to
the upload screen.

```bash
python -m http.server 8420
# then open http://localhost:8420
```

## Hosting on GitHub Pages

Push this folder to a repository, then in **Settings → Pages** set the source to your
`main` branch, folder `/ (root)`. The site will be published at
`https://<username>.github.io/<repository>/`.

Note that saved presets and the recent-uploads list live in the browser's `localStorage`,
which is tied to the origin — they do not carry over between `localhost` and the published URL.

## File format notes

Each entry maps an action name to a serialized C# object:

```json
"WalkForward": {
    "__type": "InputLayer+InputKeyBind,Assembly-CSharp",
    "value": { "PressType": 2, "PrimaryKey": 119, "PreliminaryKey": 0 }
}
```

- `PrimaryKey` / `PreliminaryKey` are Unity [`KeyCode`](https://docs.unity3d.com/ScriptReference/KeyCode.html)
  integers. `PreliminaryKey` is the modifier, `0` when unused.
- `PressType` is the activation type: `0` Press, `1` Release, `2` Hold, `3` Double Click,
  `4` Hold Delayed. The Aim row is labelled *Toggle* rather than *Press* for `0` in-game.
  A value of `6` appears on the default Emergency Reload binding; its in-game name is unconfirmed,
  so the editor displays it as `Type 6` and preserves it unchanged.

## Disclaimer

Unofficial community tool, not affiliated with VECTOR INTERACTIVE.
Editing save files is at your own risk — keep a backup.

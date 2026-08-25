// ---- Unity KeyCode <-> leesbare naam ----------------------------------
const KEYCODE_TO_LABEL = (() => {
  const m = {
    0: '—', 8: 'Backspace', 9: 'Tab', 13: 'Enter', 19: 'Pause', 27: 'Escape',
    32: 'Space', 39: "'", 44: ',', 45: '-', 46: 'Period .', 47: '/',
    48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7', 56: '8', 57: '9',
    59: ';', 61: '=', 91: '[', 92: '\\', 93: ']', 96: '`', 127: 'Delete',
    256: 'Keypad 0', 257: 'Keypad 1', 258: 'Keypad 2', 259: 'Keypad 3', 260: 'Keypad 4',
    261: 'Keypad 5', 262: 'Keypad 6', 263: 'Keypad 7', 264: 'Keypad 8', 265: 'Keypad 9',
    266: 'Keypad .', 267: 'Keypad /', 268: 'Keypad *', 269: 'Keypad -', 270: 'Keypad +',
    271: 'Keypad Enter', 272: 'Keypad =',
    273: 'Up Arrow', 274: 'Down Arrow', 275: 'Right Arrow', 276: 'Left Arrow',
    277: 'Insert', 278: 'Home', 279: 'End', 280: 'Page Up', 281: 'Page Down',
    282: 'F1', 283: 'F2', 284: 'F3', 285: 'F4', 286: 'F5', 287: 'F6',
    288: 'F7', 289: 'F8', 290: 'F9', 291: 'F10', 292: 'F11', 293: 'F12',
    300: 'Num Lock', 301: 'Caps Lock', 302: 'Scroll Lock',
    303: 'Right Shift', 304: 'Left Shift', 305: 'Right Ctrl', 306: 'Left Ctrl',
    307: 'Right Alt', 308: 'Left Alt', 309: 'Left Cmd', 310: 'Right Cmd',
    311: 'Left Windows', 312: 'Right Windows', 319: 'Menu',
    323: 'Mouse 0', 324: 'Mouse 1', 325: 'Mouse 2', 326: 'Mouse 3', 327: 'Mouse 4',
    328: 'Mouse 5', 329: 'Mouse 6'
  };
  for (let i = 97; i <= 122; i++) m[i] = String.fromCharCode(i).toUpperCase();
  return m;
})();

// browser KeyboardEvent.code -> Unity KeyCode int
const CODE_TO_UNITY = (() => {
  const m = {
    'Space': 32, 'Quote': 39, 'Comma': 44, 'Minus': 45, 'Period': 46, 'Slash': 47,
    'Semicolon': 59, 'Equal': 61, 'BracketLeft': 91, 'Backslash': 92, 'BracketRight': 93,
    'Backquote': 96, 'Backspace': 8, 'Tab': 9, 'Enter': 13, 'Pause': 19, 'Escape': 27,
    'Delete': 127, 'Insert': 277, 'Home': 278, 'End': 279, 'PageUp': 280, 'PageDown': 281,
    'ArrowUp': 273, 'ArrowDown': 274, 'ArrowRight': 275, 'ArrowLeft': 276,
    'NumLock': 300, 'CapsLock': 301, 'ScrollLock': 302,
    'ShiftRight': 303, 'ShiftLeft': 304, 'ControlRight': 305, 'ControlLeft': 306,
    'AltRight': 307, 'AltLeft': 308, 'MetaLeft': 309, 'MetaRight': 310, 'ContextMenu': 319,
    'Numpad0': 256, 'Numpad1': 257, 'Numpad2': 258, 'Numpad3': 259, 'Numpad4': 260,
    'Numpad5': 261, 'Numpad6': 262, 'Numpad7': 263, 'Numpad8': 264, 'Numpad9': 265,
    'NumpadDecimal': 266, 'NumpadDivide': 267, 'NumpadMultiply': 268, 'NumpadSubtract': 269,
    'NumpadAdd': 270, 'NumpadEnter': 271, 'NumpadEqual': 272
  };
  for (let i = 0; i <= 9; i++) m['Digit' + i] = 48 + i;
  for (let i = 0; i < 26; i++) m['Key' + String.fromCharCode(65 + i)] = 97 + i;
  for (let i = 1; i <= 12; i++) m['F' + i] = 281 + i;
  return m;
})();

const MOUSEBUTTON_TO_UNITY = { 0: 323, 2: 324, 1: 325, 3: 326, 4: 327 };

// Activation types, verified against the in-game keybind screens.
const PRESSTYPE_LABELS = { 0: 'Press', 1: 'Release', 2: 'Hold', 3: 'Double Click', 4: 'Hold Delayed' };
// The Aim row uses its own wording in-game (Toggle instead of Press).
const PRESSTYPE_LABELS_AIM = { 0: 'Toggle', 1: 'Release', 2: 'Hold', 3: 'Double Click', 4: 'Hold Delayed' };

function pressTypeLabels(actionKey) {
  return actionKey === 'Aim' ? PRESSTYPE_LABELS_AIM : PRESSTYPE_LABELS;
}
function pressTypeLabel(actionKey, value) {
  const map = pressTypeLabels(actionKey);
  return map[value] !== undefined ? map[value] : 'Type ' + value;
}
const MODIFIER_CODES = new Set(['ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight']);

function keyLabel(code) {
  return KEYCODE_TO_LABEL[code] !== undefined ? KEYCODE_TO_LABEL[code] : ('Code ' + code);
}

// ---- Actie-metadata: welke sectie/label hoort bij welke JSON-key -----
const ACTION_META = {
  WalkForward: ['Movement', 'Move Forward'],
  WalkBackward: ['Movement', 'Move Backward'],
  WalkLeft: ['Movement', 'Move Left'],
  WalkRight: ['Movement', 'Move Right'],
  Run: ['Movement', 'Run'],
  Sprint: ['Movement', 'Sprint'],

  LeanRight: ['Tactical Movement', 'Lean Right'],
  LeanLeft: ['Tactical Movement', 'Lean Left'],
  FreeLean: ['Tactical Movement', 'Free Lean'],
  Crouch: ['Tactical Movement', 'Crouch'],
  Prone: ['Tactical Movement', 'Prone'],
  Freelook: ['Tactical Movement', 'Freelook'],

  Interact: ['Player', 'Interact'],
  Kick: ['Player', 'Kick'],
  Vault: ['Player', 'Vault (Hold)'],
  HealthMenu: ['Player', 'Open Health Menu'],
  FlashlightsToggle: ['Player', 'Flashlight Toggle'],
  FlashlightsCycle: ['Player', 'Flashlight Cycle'],
  LasersToggle: ['Player', 'Laser Toggle'],
  LasersCycle: ['Player', 'Laser Cycle'],

  Voicechat: ['Comms', 'Proximity Voip'],
  RadioChat: ['Comms', 'Radio Voip'],
  VoiceTaunt: ['Comms', 'Voice Taunt'],

  SwitchPrimary: ['Inventory', 'Equip Primary'],
  SwitchSecondPrimary: ['Inventory', 'Equip Second Primary'],
  SwitchSecondary: ['Inventory', 'Equip Secondary'],
  SwitchSpecialPurpose: ['Inventory', 'Equip Special Purpose'],
  SwitchGrenades: ['Inventory', 'Equip / Cycle Grenades'],
  DropWeapon: ['Inventory', 'Drop Weapon'],
  ToggleNVGs: ['Inventory', 'Toggle NVGs'],
  NVGGainIncrease: ['Inventory', 'NV Gain Increase'],
  NVGGainDecrease: ['Inventory', 'NV Gain Decrease'],

  Aim: ['Weapons & Optics', 'Aim Weapon'],
  Shoot: ['Weapons & Optics', 'Fire Weapon'],
  ChamberRound: ['Weapons & Optics', 'Chamber Weapon'],
  CheckChamber: ['Weapons & Optics', 'Check Chamber'],
  Reload: ['Weapons & Optics', 'Reload'],
  EmergencyReload: ['Weapons & Optics', 'Emergency Reload'],
  CheckMag: ['Weapons & Optics', 'Check Mag'],
  Inspect: ['Weapons & Optics', 'Inspect Weapon'],
  Firemode: ['Weapons & Optics', 'Cycle Firemode'],

  HoldBreath: ['Weapons & Optics', 'Hold Breath'],
  SwitchBetweenSights: ['Weapons & Optics', 'Cycle Optics'],
  CantWeapon: ['Weapons & Optics', 'Canted Weapon'],
  ReticleBrightnessIncrease: ['Weapons & Optics', 'Reticle Brightness +'],
  ReticleBrightnessDecrease: ['Weapons & Optics', 'Reticle Brightness −'],
  ScopeZeroUp: ['Weapons & Optics', 'Scope Zero Increase'],
  ScopeZeroDown: ['Weapons & Optics', 'Scope Zero Decrease'],
  ZoomOptics: ['Weapons & Optics', 'Scope Magnifier + Scroll'],

  OpenATAK: ['ATAK (Drone / Tablet)', 'Open'],
  ATAKZoomIn: ['ATAK (Drone / Tablet)', 'Zoom In'],
  ATAKZoomOut: ['ATAK (Drone / Tablet)', 'Zoom Out'],
  ATAKZoomCycleFLIR: ['ATAK (Drone / Tablet)', 'Cycle FLIR'],
  ATAKDropBomb: ['ATAK (Drone / Tablet)', 'Drop Munition'],
  ATAKZoomMoveUp: ['ATAK (Drone / Tablet)', 'Move Up'],
  ATAKZoomMoveDown: ['ATAK (Drone / Tablet)', 'Move Down'],
  ATAKZoomMoveLeft: ['ATAK (Drone / Tablet)', 'Move Left'],
  ATAKZoomMoveRight: ['ATAK (Drone / Tablet)', 'Move Right'],

  Console: ['Misc', 'Open Console']
};
const SECTION_ORDER = ['Movement', 'Tactical Movement', 'Player', 'Comms', 'Inventory', 'Weapons & Optics', 'ATAK (Drone / Tablet)', 'Misc'];

// ---- Ingebouwde presets (PrimaryKey/PreliminaryKey per actie) -----------
const PRESET_DEFAULT = {
  Console: [96, 0], ATAKZoomIn: [39, 0], ATAKZoomMoveRight: [275, 0], ATAKZoomMoveLeft: [276, 0],
  WalkLeft: [97, 0], Kick: [32, 0], Reload: [114, 0], OpenATAK: [109, 0], RadioChat: [107, 0],
  VoiceTaunt: [282, 0], SwitchPrimary: [50, 0], FreeLean: [306, 0], CheckMag: [114, 0],
  ScopeZeroUp: [280, 0], ATAKZoomOut: [59, 0], FlashlightsToggle: [326, 0], CantWeapon: [116, 0],
  Voicechat: [104, 0], ATAKDropBomb: [305, 0], SwitchSecondary: [49, 0], CheckChamber: [116, 306],
  ATAKZoomMoveDown: [274, 0], Aim: [324, 0], LeanLeft: [113, 0], NVGGainIncrease: [280, 0],
  Prone: [122, 0], EmergencyReload: [114, 0], WalkRight: [100, 0], LasersCycle: [327, 0],
  HealthMenu: [9, 0], Inspect: [105, 0], Run: [304, 0], ATAKZoomMoveUp: [273, 0],
  DropWeapon: [121, 0], Firemode: [98, 0], ChamberRound: [116, 304], WalkBackward: [115, 0],
  Freelook: [325, 0], ReticleBrightnessDecrease: [274, 0], ZoomOptics: [308, 0], LeanRight: [101, 0],
  Sprint: [304, 0], Interact: [102, 0], Shoot: [323, 0], SwitchSpecialPurpose: [52, 0],
  NVGGainDecrease: [281, 0], ATAKZoomCycleFLIR: [46, 0], ReticleBrightnessIncrease: [273, 0],
  Crouch: [99, 0], LasersToggle: [327, 0], SwitchGrenades: [103, 0], HoldBreath: [308, 0],
  FlashlightsCycle: [326, 0], SwitchBetweenSights: [301, 0], SwitchSecondPrimary: [51, 0],
  ToggleNVGs: [110, 0], WalkForward: [119, 0], ScopeZeroDown: [281, 0], Vault: [32, 0]
};

// Taken from a played-in numpad layout, so this one also carries its activation types.
const PRESET_NUMPAD = {
  Console: [96, 0, 0], ATAKZoomIn: [39, 0, 2], ATAKZoomMoveRight: [100, 0, 2],
  ATAKZoomMoveLeft: [97, 0, 2], WalkLeft: [260, 0, 2], Kick: [258, 0, 1],
  Reload: [325, 0, 0], OpenATAK: [109, 0, 2], RadioChat: [107, 0, 2],
  VoiceTaunt: [282, 0, 0], SwitchPrimary: [257, 0, 0], FreeLean: [258, 0, 0],
  CheckMag: [275, 0, 3], ScopeZeroUp: [273, 0, 2], ATAKZoomOut: [59, 0, 2],
  FlashlightsToggle: [278, 0, 1], CantWeapon: [267, 0, 1], Voicechat: [104, 0, 2],
  ATAKDropBomb: [305, 0, 0], SwitchSecondary: [259, 0, 0], CheckChamber: [326, 0, 3],
  ATAKZoomMoveDown: [115, 0, 2], Aim: [324, 0, 0], LeanLeft: [263, 0, 0],
  NVGGainIncrease: [127, 0, 0], Prone: [256, 0, 0], EmergencyReload: [325, 0, 3],
  WalkRight: [262, 0, 2], LasersCycle: [327, 0, 2], HealthMenu: [269, 0, 2],
  Inspect: [276, 0, 4], Run: [271, 0, 4], ATAKZoomMoveUp: [119, 0, 2],
  DropWeapon: [121, 0, 0], Firemode: [275, 0, 1], ChamberRound: [326, 0, 2],
  WalkBackward: [261, 0, 2], Freelook: [300, 0, 0], ReticleBrightnessDecrease: [281, 0, 0],
  ZoomOptics: [276, 0, 2], LeanRight: [265, 0, 0], Sprint: [271, 0, 3],
  Interact: [270, 0, 0], Shoot: [323, 0, 2], SwitchSpecialPurpose: [259, 0, 3],
  NVGGainDecrease: [277, 0, 0], ATAKZoomCycleFLIR: [102, 0, 0], ReticleBrightnessIncrease: [280, 0, 0],
  Crouch: [46, 0, 0], LasersToggle: [327, 0, 1], SwitchGrenades: [268, 0, 0],
  HoldBreath: [275, 0, 2], FlashlightsCycle: [278, 0, 2], SwitchBetweenSights: [276, 0, 0],
  SwitchSecondPrimary: [257, 0, 3], ToggleNVGs: [279, 0, 0], WalkForward: [264, 0, 2],
  ScopeZeroDown: [274, 0, 2], Vault: [258, 0, 4]
};

// ---- Day / night theme --------------------------------------------------
// The theme itself is applied by the inline script in <head>, before the first
// paint. This only handles switching it and remembering the choice.
const THEME_KEY = 'operatorKeybindEditor.theme';
const themeToggle = document.getElementById('themeToggle');

function currentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const toDay = theme === 'dark';
  themeToggle.textContent = toDay ? '☀ Day' : '☾ Night';
  themeToggle.title = toDay ? 'Switch to the day theme' : 'Switch to the night theme';
  themeToggle.setAttribute('aria-label', themeToggle.title);
}

themeToggle.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* private mode: this session only */ }
});

applyTheme(currentTheme());

const CUSTOM_PRESETS_KEY = 'operatorKeybindEditor.presets';
function loadCustomPresets() {
  try { return JSON.parse(localStorage.getItem(CUSTOM_PRESETS_KEY)) || {}; } catch (e) { return {}; }
}
function saveCustomPresets(obj) { localStorage.setItem(CUSTOM_PRESETS_KEY, JSON.stringify(obj)); }

// ---- State --------------------------------------------------------------
let originalText = '';
let originalFilename = 'KeyBinds.es3';
let data = null;        // parsed JSON object (working copy, gets mutated)
let baseline = null;    // deep copy of originally parsed data, for diff/reset
let capturingEl = null; // key-span currently waiting for input

const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const uploadPanel = document.getElementById('uploadPanel');
const editorPanel = document.getElementById('editorPanel');
const sectionsGrid = document.getElementById('sectionsGrid');
const filenameLabel = document.getElementById('filenameLabel');
const statusLine = document.getElementById('statusLine');
const overlay = document.getElementById('captureOverlay');

dropzone.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('dragover', e => { e.preventDefault(); dropzone.classList.add('dragover'); });
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
dropzone.addEventListener('drop', e => {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener('change', () => { if (fileInput.files.length) handleFile(fileInput.files[0]); });

document.getElementById('loadOtherBtn').addEventListener('click', () => {
  // Keep the current file on screen while a new one is picked: its buttons stay usable,
  // and cancelling the file dialog no longer leaves an empty page behind.
  uploadPanel.style.display = '';
  fileInput.value = '';
  uploadPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
document.getElementById('resetBtn').addEventListener('click', () => {
  applyDefaultBindings();
  presetSelect.value = '__default';
  syncPresetUi();
  setStatus('Reset to the game’s Default bindings.', 'warn');
});
document.getElementById('revertBtn').addEventListener('click', () => {
  data = JSON.parse(JSON.stringify(baseline));
  presetSelect.value = '';
  syncPresetUi();
  renderTables();
  setStatus('Reverted to the uploaded file.', 'warn');
});
// ---- Activation types explainer ----------------------------------------
const infoOverlay = document.getElementById('infoOverlay');
function openInfo() { infoOverlay.classList.add('show'); }
function closeInfo() { infoOverlay.classList.remove('show'); }

document.getElementById('helpTypesBtn').addEventListener('click', openInfo);
document.getElementById('infoClose').addEventListener('click', closeInfo);
// Clicking the backdrop closes it; clicking inside the box must not.
infoOverlay.addEventListener('click', e => { if (!e.target.closest('.overlay-box')) closeInfo(); });
window.addEventListener('keydown', e => {
  if (e.code !== 'Escape') return;
  if (infoOverlay.classList.contains('show')) closeInfo();
  if (sourceOverlay.classList.contains('show')) closeSource();
});

// ---- Raw .es3 viewer ----------------------------------------------------
const sourceOverlay = document.getElementById('sourceOverlay');
const sourceCode = document.getElementById('sourceCode');
const sourceMeta = document.getElementById('sourceMeta');
const sourceTabEdited = document.getElementById('sourceTabEdited');
const sourceTabOriginal = document.getElementById('sourceTabOriginal');
let sourceView = 'edited';

// Minimal JSON colouring. Escapes first, then wraps tokens, so the file's own
// text can never inject markup.
function highlightJson(text) {
  const escaped = text.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  return escaped.replace(/("(?:\\.|[^"\\])*")(\s*:)?|(-?\d+(?:\.\d+)?)/g,
    (m, str, colon, num) => {
      if (num !== undefined) return '<span class="s-num">' + num + '</span>';
      if (colon) return '<span class="s-key">' + str + '</span>' + colon;
      return '<span class="s-str">' + str + '</span>';
    });
}

function currentSourceText() {
  return sourceView === 'original' ? originalText : JSON.stringify(data, null, '\t');
}

function renderSource() {
  const text = currentSourceText();
  sourceCode.innerHTML = highlightJson(text);
  sourceTabEdited.classList.toggle('is-active', sourceView === 'edited');
  sourceTabOriginal.classList.toggle('is-active', sourceView === 'original');
  const lines = text.split('\n').length;
  sourceMeta.textContent = originalFilename + ' · ' + lines + ' lines · '
    + (new Blob([text]).size / 1024).toFixed(1) + ' kB';
  sourceCode.parentElement.scrollTop = 0;
}

function openSource() {
  // Only reachable with a file loaded, but never throw if one somehow is not.
  if (!data) { setStatus('No file loaded yet — nothing to show as code.', 'warn'); return; }
  renderSource();
  sourceOverlay.classList.add('show');
}
function closeSource() { sourceOverlay.classList.remove('show'); }

document.getElementById('viewSourceBtn').addEventListener('click', openSource);
document.getElementById('sourceClose').addEventListener('click', closeSource);
sourceOverlay.addEventListener('click', e => { if (!e.target.closest('.overlay-box')) closeSource(); });
sourceTabEdited.addEventListener('click', () => { sourceView = 'edited'; renderSource(); });
sourceTabOriginal.addEventListener('click', () => { sourceView = 'original'; renderSource(); });

document.getElementById('sourceCopy').addEventListener('click', function () {
  const btn = this;
  const done = () => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
  };
  if (navigator.clipboard) navigator.clipboard.writeText(currentSourceText()).then(done, done);
  else done();
});

document.getElementById('printBtn').addEventListener('click', () => {
  // A printed sheet without a name is unidentifiable a week later, so insist on one.
  const preset = currentPresetName() || askForPresetName('Name this preset before printing:');
  if (!preset) { setStatus('Print cancelled — a preset name is needed on the printout.', 'warn'); return; }
  document.getElementById('printPreset').textContent = ' · ' + preset;
  const meta = document.getElementById('printMeta');
  meta.textContent = 'Preset: ' + preset + ' · ' + originalFilename + ' · '
    + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  window.print();
});
document.getElementById('downloadBackupBtn').addEventListener('click', () => {
  downloadText(originalText, backupFilename(originalFilename));
  setStatus('Backup downloaded. Keep this file before you install the edited version.', 'ok');
});
document.getElementById('downloadEditedBtn').addEventListener('click', () => {
  const out = JSON.stringify(data, null, '\t');
  downloadText(out, originalFilename);
  setStatus('Edited file downloaded — drop it over the original in your save folder to replace it.', 'ok');
});

function backupFilename(name) {
  const dot = name.lastIndexOf('.');
  const base = dot === -1 ? name : name.slice(0, dot);
  const ext = dot === -1 ? '' : name.slice(dot);
  return base + '_backup' + ext;
}

function downloadText(text, filename) {
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

function setStatus(msg, cls) {
  statusLine.textContent = msg;
  statusLine.className = 'status' + (cls ? ' ' + cls : '');
}

function loadParsedContent(text, filename, opts) {
  opts = opts || {};
  try {
    const parsed = JSON.parse(text);
    originalText = text;
    originalFilename = filename || 'KeyBinds.es3';
    data = parsed;
    baseline = JSON.parse(JSON.stringify(parsed));
    uploadPanel.style.display = 'none';
    editorPanel.style.display = '';
    filenameLabel.textContent = originalFilename;
    presetSelect.value = '';
    syncPresetUi();
    renderTables();
    setStatus('File loaded. Click a key badge to change it.', 'ok');
    if (!opts.skipHistory) addRecentUpload(originalFilename, text);
    return true;
  } catch (err) {
    alert('Could not read this file as a valid KeyBinds.es3 (JSON). Details: ' + err.message);
    return false;
  }
}

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    loadParsedContent(reader.result, file.name || 'KeyBinds.es3');
  };
  reader.readAsText(file);
}

// ---- Conflict detection ---------------------------------------------------
// Two bindings only clash when key, modifier AND activation type all match.
// Space/Release (Kick) and Space/Hold Delayed (Vault) coexist fine in-game,
// as do Mouse 3 Press (Flashlight Toggle) and Mouse 3 Hold (Flashlight Cycle).
let currentConflicts = new Map();   // actionKey -> [labels of the other actions]

function describeBinding(val, actionKey) {
  const key = keyLabel(val.PrimaryKey);
  const combo = val.PreliminaryKey ? keyLabel(val.PreliminaryKey) + ' + ' + key : key;
  return combo + ' · ' + pressTypeLabel(actionKey, val.PressType);
}

// The tablet is its own input context: those binds are only live while ATAK is open, so
// they can reuse keys from the rest of the game without ever firing at the same time.
const CONFLICT_SCOPES = { 'ATAK (Drone / Tablet)': 'atak' };
function conflictScope(actionKey) {
  return CONFLICT_SCOPES[ACTION_META[actionKey][0]] || 'game';
}

function findConflicts() {
  const bySignature = new Map();
  Object.keys(ACTION_META).forEach(actionKey => {
    const entry = data[actionKey];
    if (!entry || !entry.value) return;
    if (!entry.value.PrimaryKey) return;   // unassigned is never a clash
    const sig = conflictScope(actionKey) + '|' + entry.value.PrimaryKey + '|' + entry.value.PreliminaryKey + '|' + entry.value.PressType;
    if (!bySignature.has(sig)) bySignature.set(sig, []);
    bySignature.get(sig).push(actionKey);
  });

  const byAction = new Map();
  const groups = [];
  bySignature.forEach(list => {
    if (list.length < 2) return;
    list.forEach(k => byAction.set(k, list.filter(o => o !== k).map(o => ACTION_META[o][1])));
    groups.push({
      binding: describeBinding(data[list[0]].value, list[0]),
      actions: list.map(k => ACTION_META[k][1])
    });
  });
  return { byAction, groups };
}

function renderConflictBar(groups) {
  const bar = document.getElementById('conflictBar');
  if (!groups.length) { bar.style.display = 'none'; bar.innerHTML = ''; return; }
  bar.style.display = '';
  bar.innerHTML = '';
  const title = document.createElement('div');
  title.className = 'conflictbar-title';
  title.textContent = groups.length === 1
    ? '1 binding is assigned twice'
    : groups.length + ' bindings are assigned more than once';
  bar.appendChild(title);
  groups.forEach(g => {
    const row = document.createElement('div');
    row.className = 'conflictbar-row';
    const b = document.createElement('span');
    b.className = 'conflictbar-key';
    b.textContent = g.binding;
    row.appendChild(b);
    row.appendChild(document.createTextNode(' — ' + g.actions.join(' / ')));
    bar.appendChild(row);
  });
}

// ---- Rendering ------------------------------------------------------------
function renderTables() {
  sectionsGrid.innerHTML = '';
  const conflicts = findConflicts();
  currentConflicts = conflicts.byAction;
  renderConflictBar(conflicts.groups);

  const bySection = {};
  SECTION_ORDER.forEach(s => bySection[s] = []);

  // Iterate ACTION_META, not the file: .es3 stores actions in an arbitrary order,
  // while ACTION_META is written in the order the game's own keybind screen uses.
  Object.keys(ACTION_META).forEach(actionKey => {
    const entry = data[actionKey];
    if (!entry || !entry.value) return; // not present in this file
    const meta = ACTION_META[actionKey];
    bySection[meta[0]].push({ actionKey, label: meta[1] });
  });

  SECTION_ORDER.forEach(section => {
    const rows = bySection[section];
    if (!rows.length) return;
    const sec = document.createElement('div');
    sec.className = 'section';
    sec.innerHTML = `<div class="section-head">${section}</div>`;
    const table = document.createElement('table');
    table.innerHTML = '<thead><tr><td>Action</td><td>Key</td><td>Type</td></tr></thead>';
    const tbody = document.createElement('tbody');
    rows.forEach(r => tbody.appendChild(buildRow(r.actionKey, r.label)));
    table.appendChild(tbody);
    sec.appendChild(table);
    sectionsGrid.appendChild(sec);
  });
}

function buildRow(actionKey, label) {
  const entry = data[actionKey];
  const val = entry.value;
  const baseVal = baseline[actionKey] ? baseline[actionKey].value : val;
  const changed = val.PrimaryKey !== baseVal.PrimaryKey
    || val.PreliminaryKey !== baseVal.PreliminaryKey
    || val.PressType !== baseVal.PressType;

  const tr = document.createElement('tr');
  if (changed) tr.classList.add('changed');

  const tdAction = document.createElement('td');
  tdAction.className = 'action';
  tdAction.textContent = label;

  const tdKey = document.createElement('td');
  const keySpan = document.createElement('span');
  keySpan.className = 'key';
  keySpan.dataset.action = actionKey;
  renderKeySpan(keySpan, val);
  keySpan.addEventListener('click', () => startCapture(keySpan, actionKey));
  const clash = currentConflicts.get(actionKey);
  if (clash) {
    keySpan.classList.add('conflict');
    keySpan.title = 'Same key and activation type as: ' + clash.join(', ');
    tr.classList.add('has-conflict');
  }
  tdKey.appendChild(keySpan);

  const tdType = document.createElement('td');
  tdType.className = 'presstype';
  const sel = document.createElement('select');
  sel.className = 'typeselect';
  const labels = pressTypeLabels(actionKey);
  Object.keys(labels).forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.textContent = labels[v];
    sel.appendChild(opt);
  });
  // Preserve values this tool doesn't have a verified name for (e.g. 6) instead of silently rewriting them.
  if (labels[val.PressType] === undefined) {
    const opt = document.createElement('option');
    opt.value = val.PressType;
    opt.textContent = 'Type ' + val.PressType;
    sel.appendChild(opt);
  }
  sel.value = String(val.PressType);
  sel.addEventListener('change', () => {
    data[actionKey].value.PressType = parseInt(sel.value, 10);
    renderTables();
    reportRebind(actionKey);
  });
  tdType.appendChild(sel);
  // Print/PDF output uses plain text instead of the dropdown.
  const printSpan = document.createElement('span');
  printSpan.className = 'type-print';
  printSpan.textContent = pressTypeLabel(actionKey, val.PressType);
  tdType.appendChild(printSpan);

  tr.appendChild(tdAction);
  tr.appendChild(tdKey);
  tr.appendChild(tdType);
  return tr;
}

// Call after renderTables(), which is what refreshes currentConflicts.
function reportRebind(actionKey) {
  const name = ACTION_META[actionKey] ? ACTION_META[actionKey][1] : actionKey;
  const clash = currentConflicts.get(actionKey);
  dirtySincePreset = true;
  const saved = autosaveActivePreset() ? ' Saved to preset “' + activePreset + '”.' : '';
  if (clash) setStatus('"' + name + '" now clashes with ' + clash.join(', ') + ' — same key and activation type.' + saved, 'warn');
  else setStatus('"' + name + '" updated.' + saved, 'ok');
}

function renderKeySpan(el, val) {
  el.textContent = keyLabel(val.PrimaryKey);
  const old = el.querySelector('.combo');
  if (old) old.remove();
  if (val.PreliminaryKey) {
    const combo = document.createElement('span');
    combo.className = 'combo';
    combo.textContent = '+ ' + keyLabel(val.PreliminaryKey);
    el.appendChild(combo);
  }
}

// ---- Key capture ------------------------------------------------------------
function startCapture(el, actionKey) {
  if (capturingEl) capturingEl.classList.remove('capturing');
  capturingEl = el;
  capturingEl.actionKey = actionKey;
  el.classList.add('capturing');
  overlay.classList.add('show');
}

function stopCapture() {
  if (capturingEl) capturingEl.classList.remove('capturing');
  capturingEl = null;
  overlay.classList.remove('show');
}

// A tap on a touchscreen also fires a synthetic mousedown; without this it would bind Mouse 0.
let lastPointerType = 'mouse';
window.addEventListener('pointerdown', e => { lastPointerType = e.pointerType; }, true);

// Touch devices have no Esc key, so the overlay needs a way out that isn't a keypress.
// The X and a tap on the backdrop both cancel; a real mouse click on the backdrop still binds.
const captureCancelBtn = document.getElementById('captureCancel');
captureCancelBtn.addEventListener('click', e => { e.stopPropagation(); stopCapture(); });
overlay.addEventListener('click', e => {
  if (!capturingEl) return;
  if (lastPointerType === 'mouse') return;
  if (e.target.closest('.overlay-box') && e.target !== captureCancelBtn) return;
  stopCapture();
});

window.addEventListener('keydown', e => {
  if (!capturingEl) return;
  e.preventDefault();
  if (e.code === 'Escape') { stopCapture(); return; }
  if (MODIFIER_CODES.has(e.code)) return; // wait for the real key, modifiers are captured as combo below

  const unity = CODE_TO_UNITY[e.code];
  if (unity === undefined) { setStatus('Unknown key: ' + e.code, 'warn'); return; }

  const actionKey = capturingEl.actionKey;
  const entry = data[actionKey];
  entry.value.PrimaryKey = unity;
  entry.value.PreliminaryKey = (e.shiftKey && !e.code.startsWith('Shift')) ? 304
    : (e.ctrlKey && !e.code.startsWith('Control')) ? 306
    : (e.altKey && !e.code.startsWith('Alt')) ? 308
    : 0;

  renderKeySpan(capturingEl, entry.value);
  stopCapture();
  renderTables();
  reportRebind(actionKey);
});

window.addEventListener('mousedown', e => {
  if (!capturingEl) return;
  if (lastPointerType !== 'mouse') return;      // a finger tap is not a mouse button
  if (e.target.closest('#captureCancel')) return;
  e.preventDefault();
  const unity = MOUSEBUTTON_TO_UNITY[e.button];
  if (unity === undefined) return;
  const actionKey = capturingEl.actionKey;
  data[actionKey].value.PrimaryKey = unity;
  data[actionKey].value.PreliminaryKey = 0;
  stopCapture();
  renderTables();
  reportRebind(actionKey);
});

// The folder is shown in both the upload panel and the editor, so wire up every copy button.
document.querySelectorAll('.js-pathrow').forEach(row => {
  const btn = row.querySelector('.copybtn');
  const path = row.querySelector('.pathtext');
  btn.addEventListener('click', () => {
    // The path is the folder itself, so it pastes straight into the Explorer address bar.
    const done = () => {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(path.textContent.trim()).then(done, done);
    else done();
  });
});

// ---- Presets ----------------------------------------------------------
const presetSelect = document.getElementById('presetSelect');
const savePresetBtn = document.getElementById('savePresetBtn');
const deletePresetBtn = document.getElementById('deletePresetBtn');
const presetState = document.getElementById('presetState');

const BUILTIN_PRESET_NAMES = { '__default': 'Default', '__numpad': 'Numpad' };

// Name of the custom preset that edits are written straight back into,
// or null while a built-in preset or a plain uploaded file is on screen.
let activePreset = null;
// Whether anything was rebound since the current preset was selected. Only used to
// decide if a built-in preset's name still describes what is on screen.
let dirtySincePreset = false;

// Everything about the preset state is derived from the dropdown, so any code that
// changes the selection only has to call this.
function syncPresetUi() {
  const v = presetSelect.value;
  activePreset = v.startsWith('custom:') ? v.slice(7) : null;
  dirtySincePreset = false;
  deletePresetBtn.style.display = activePreset ? '' : 'none';
  presetState.textContent = activePreset ? 'Auto-saving to “' + activePreset + '”' : '';
  presetState.className = 'presetstate' + (activePreset ? ' live' : '');
}

function refreshPresetOptions() {
  const custom = loadCustomPresets();
  presetSelect.querySelectorAll('option[data-custom]').forEach(o => o.remove());
  Object.keys(custom).sort().forEach(name => {
    const opt = document.createElement('option');
    opt.value = 'custom:' + name;
    opt.textContent = name;
    opt.dataset.custom = '1';
    presetSelect.appendChild(opt);
  });
}

function applyPresetMap(map) {
  Object.keys(map).forEach(actionKey => {
    if (!data[actionKey]) return;
    const entry = map[actionKey];
    data[actionKey].value.PrimaryKey = entry[0];
    data[actionKey].value.PreliminaryKey = entry[1];
    // Presets stored before activation types were included only carry two values.
    if (entry.length > 2) data[actionKey].value.PressType = entry[2];
  });
  renderTables();
}

// The whole editable config, in the shape presets are stored in.
function captureCurrentMap() {
  const map = {};
  Object.keys(data).forEach(actionKey => {
    if (actionKey === 'None' || !ACTION_META[actionKey]) return;
    const val = data[actionKey].value;
    map[actionKey] = [val.PrimaryKey, val.PreliminaryKey, val.PressType];
  });
  return map;
}

function storePreset(name) {
  const custom = loadCustomPresets();
  custom[name] = captureCurrentMap();
  saveCustomPresets(custom);
  refreshPresetOptions();
  presetSelect.value = 'custom:' + name;
  syncPresetUi();
}

// A custom preset is live: once it is selected, every edit lands in it without a save step.
function autosaveActivePreset() {
  if (!activePreset) return false;
  const custom = loadCustomPresets();
  custom[activePreset] = captureCurrentMap();
  saveCustomPresets(custom);
  return true;
}

// The name that describes what is currently on screen, or null if it has none:
// a custom preset always, a built-in one only as long as nothing was rebound.
function currentPresetName() {
  if (activePreset) return activePreset;
  const builtin = BUILTIN_PRESET_NAMES[presetSelect.value];
  return builtin && !dirtySincePreset ? builtin : null;
}

function suggestPresetName() {
  const custom = loadCustomPresets();
  let name = 'My bindings', n = 1;
  while (custom[name]) name = 'My bindings ' + (++n);
  return name;
}

// Returns the stored name, or null if the user cancelled.
function askForPresetName(message) {
  const name = (prompt(message, suggestPresetName()) || '').trim();
  if (!name) return null;
  if (loadCustomPresets()[name] && !confirm('Preset "' + name + '" already exists. Overwrite it?')) return null;
  storePreset(name);
  return name;
}

presetSelect.addEventListener('change', () => {
  const v = presetSelect.value;
  syncPresetUi();
  if (v === '__default') { applyDefaultBindings(); setStatus('Default preset applied.', 'ok'); }
  else if (v === '__numpad') { applyPresetMap(PRESET_NUMPAD); setStatus('Numpad preset applied.', 'ok'); }
  else if (activePreset) {
    const custom = loadCustomPresets();
    if (custom[activePreset]) {
      applyPresetMap(custom[activePreset]);
      setStatus('Preset "' + activePreset + '" applied — every change is now saved to it automatically.', 'ok');
    }
  }
});

savePresetBtn.addEventListener('click', () => {
  const name = askForPresetName('Name for this preset:');
  if (!name) return;
  setStatus('Preset "' + name + '" saved in this browser. Every change from now on is saved to it automatically.', 'ok');
});

deletePresetBtn.addEventListener('click', () => {
  if (!activePreset) return;
  const name = activePreset;
  if (!confirm('Delete preset "' + name + '"?')) return;
  const custom = loadCustomPresets();
  delete custom[name];
  saveCustomPresets(custom);
  refreshPresetOptions();
  presetSelect.value = '';
  syncPresetUi();
  setStatus('Preset "' + name + '" deleted.', 'warn');
});

refreshPresetOptions();

// ---- Recente uploads (localStorage) ------------------------------------
const RECENT_UPLOADS_KEY = 'operatorKeybindEditor.recentUploads';
const MAX_RECENT_UPLOADS = 15;

function loadRecentUploads() {
  try { return JSON.parse(localStorage.getItem(RECENT_UPLOADS_KEY)) || []; } catch (e) { return []; }
}
function saveRecentUploads(list) { localStorage.setItem(RECENT_UPLOADS_KEY, JSON.stringify(list)); }

function addRecentUpload(name, text) {
  let list = loadRecentUploads();
  list = list.filter(u => u.text !== text); // dedupe identical content, keep newest position
  list.unshift({ name, text, ts: Date.now() });
  if (list.length > MAX_RECENT_UPLOADS) list = list.slice(0, MAX_RECENT_UPLOADS);
  saveRecentUploads(list);
  renderRecentUploads();
}

function removeRecentUpload(index) {
  const list = loadRecentUploads();
  list.splice(index, 1);
  saveRecentUploads(list);
  renderRecentUploads();
}

function formatRelativeTime(ts) {
  const diffMin = Math.round((Date.now() - ts) / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return diffMin + ' min ago';
  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return diffH + ' hour' + (diffH === 1 ? '' : 's') + ' ago';
  const diffD = Math.round(diffH / 24);
  if (diffD < 30) return diffD + ' day' + (diffD === 1 ? '' : 's') + ' ago';
  return new Date(ts).toLocaleDateString('en-US');
}

function renderRecentUploads() {
  const wrap = document.getElementById('recentUploads');
  const list = loadRecentUploads();
  if (!list.length) { wrap.innerHTML = ''; wrap.style.display = 'none'; return; }
  wrap.style.display = '';
  wrap.innerHTML = '<div class="recent-title">Recent uploads</div>';
  const ul = document.createElement('div');
  ul.className = 'recent-list';
  list.forEach((u, i) => {
    const row = document.createElement('div');
    row.className = 'recent-row';
    const nameSpan = document.createElement('span');
    nameSpan.className = 'recent-name';
    nameSpan.textContent = u.name;
    const timeSpan = document.createElement('span');
    timeSpan.className = 'recent-time';
    timeSpan.textContent = formatRelativeTime(u.ts);
    const loadBtn = document.createElement('button');
    loadBtn.className = 'btn btn-ghost recent-loadbtn';
    loadBtn.textContent = 'Load';
    loadBtn.addEventListener('click', () => loadParsedContent(u.text, u.name, { skipHistory: true }));
    const delBtn = document.createElement('button');
    delBtn.className = 'recent-delbtn';
    delBtn.textContent = '×';
    delBtn.title = 'Remove from list';
    delBtn.addEventListener('click', (e) => { e.stopPropagation(); removeRecentUpload(i); });
    row.appendChild(nameSpan);
    row.appendChild(timeSpan);
    row.appendChild(loadBtn);
    row.appendChild(delBtn);
    ul.appendChild(row);
  });
  wrap.appendChild(ul);
}
renderRecentUploads();

// ---- Bundled default KeyBinds.es3 ---------------------------------------
const DEFAULT_FILE_URL = 'KeyBinds.default.es3';
let defaultFileData = null;   // parsed factory bindings, once fetched

async function fetchDefaultFile() {
  if (defaultFileData) return defaultFileData;
  const resp = await fetch(DEFAULT_FILE_URL, { cache: 'no-cache' });
  if (!resp.ok) throw new Error('HTTP ' + resp.status);
  const text = await resp.text();
  defaultFileData = JSON.parse(text);   // validate before caching
  return defaultFileData;
}

// Restore factory bindings. The bundled file also carries the correct PressType
// per action, which the hardcoded PRESET_DEFAULT fallback cannot express.
function applyDefaultBindings() {
  if (!defaultFileData) { applyPresetMap(PRESET_DEFAULT); return false; }
  Object.keys(defaultFileData).forEach(k => {
    const src = defaultFileData[k] && defaultFileData[k].value;
    if (!src || !data[k]) return;
    data[k].value.PrimaryKey = src.PrimaryKey;
    data[k].value.PreliminaryKey = src.PreliminaryKey;
    data[k].value.PressType = src.PressType;
  });
  renderTables();
  return true;
}

function loadDefaults(opts) {
  opts = opts || {};
  return fetchDefaultFile().then(parsed => {
    loadParsedContent(JSON.stringify(parsed, null, '\t'), 'KeyBinds.es3', { skipHistory: true });
    presetSelect.value = '__default';
    syncPresetUi();
    setStatus(opts.silent
      ? 'Loaded the game’s default bindings. Upload your own file to edit it.'
      : 'Default bindings loaded.', 'ok');
    return true;
  }).catch(err => {
    // Opening index.html straight from disk (file://) blocks fetch — fall back to the upload panel.
    console.warn('Could not load ' + DEFAULT_FILE_URL + ':', err.message);
    if (!opts.silent) {
      alert('Could not load the bundled default file (' + err.message + ').\n\n'
        + 'This usually means the page was opened directly from disk. Serve the folder over http:// and it will work.');
    }
    return false;
  });
}

document.getElementById('loadDefaultsBtn').addEventListener('click', () => loadDefaults());

// Load the factory bindings automatically so the site is never empty on arrival.
loadDefaults({ silent: true });

// ---- Keyboard hover diagram --------------------------------------------
// Parked for now. Flip to true to bring the schematic keyboard back; the panel,
// its markup and keyboard.js are all still in place.
const KEYBOARD_HOVER_ENABLED = false;

if (KEYBOARD_HOVER_ENABLED) {
buildKeyboardGrid();
sectionsGrid.addEventListener('mouseover', e => {
  const el = e.target.closest('.key');
  if (!el) return;
  const actionKey = el.dataset.action;
  if (!actionKey || !data[actionKey]) return;
  const val = data[actionKey].value;
  showKeyboardHighlight(val.PrimaryKey, val.PreliminaryKey);
});
sectionsGrid.addEventListener('mouseout', e => {
  const el = e.target.closest('.key');
  if (!el) return;
  if (el.contains(e.relatedTarget)) return;
  hideKeyboardPanel();
});
}

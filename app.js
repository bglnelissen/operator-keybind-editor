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

  Aim: ['Weapons', 'Aim Weapon'],
  Shoot: ['Weapons', 'Fire Weapon'],
  ChamberRound: ['Weapons', 'Chamber Weapon'],
  CheckChamber: ['Weapons', 'Check Chamber'],
  Reload: ['Weapons', 'Reload'],
  EmergencyReload: ['Weapons', 'Emergency Reload'],
  CheckMag: ['Weapons', 'Check Mag'],
  Inspect: ['Weapons', 'Inspect Weapon'],
  Firemode: ['Weapons', 'Cycle Firemode'],

  HoldBreath: ['Optics & Sights', 'Hold Breath'],
  SwitchBetweenSights: ['Optics & Sights', 'Cycle Optics'],
  CantWeapon: ['Optics & Sights', 'Canted Weapon'],
  ReticleBrightnessIncrease: ['Optics & Sights', 'Reticle Brightness +'],
  ReticleBrightnessDecrease: ['Optics & Sights', 'Reticle Brightness −'],
  ScopeZeroUp: ['Optics & Sights', 'Scope Zero Increase'],
  ScopeZeroDown: ['Optics & Sights', 'Scope Zero Decrease'],
  ZoomOptics: ['Optics & Sights', 'Scope Magnifier + Scroll'],

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
const SECTION_ORDER = ['Movement', 'Tactical Movement', 'Player', 'Comms', 'Inventory', 'Weapons', 'Optics & Sights', 'ATAK (Drone / Tablet)', 'Misc'];

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

const PRESET_NUMPAD = {
  Console: [96, 0], ATAKZoomIn: [39, 0], ATAKZoomMoveRight: [275, 0], ATAKZoomMoveLeft: [276, 0],
  WalkLeft: [260, 0], Kick: [32, 0], Reload: [325, 0], OpenATAK: [109, 0], RadioChat: [107, 0],
  VoiceTaunt: [282, 0], SwitchPrimary: [257, 0], FreeLean: [0, 0], CheckMag: [275, 0],
  ScopeZeroUp: [273, 0], ATAKZoomOut: [59, 0], FlashlightsToggle: [326, 0], CantWeapon: [116, 0],
  Voicechat: [104, 0], ATAKDropBomb: [305, 0], SwitchSecondary: [259, 0], CheckChamber: [275, 0],
  ATAKZoomMoveDown: [274, 0], Aim: [324, 0], LeanLeft: [263, 0], NVGGainIncrease: [127, 0],
  Prone: [256, 0], EmergencyReload: [325, 0], WalkRight: [262, 0], LasersCycle: [327, 0],
  HealthMenu: [9, 0], Inspect: [275, 0], Run: [271, 0], ATAKZoomMoveUp: [273, 0],
  DropWeapon: [121, 0], Firemode: [274, 0], ChamberRound: [325, 0], WalkBackward: [261, 0],
  Freelook: [325, 0], ReticleBrightnessDecrease: [281, 0], ZoomOptics: [308, 0], LeanRight: [265, 0],
  Sprint: [271, 0], Interact: [270, 0], Shoot: [323, 0], SwitchSpecialPurpose: [259, 0],
  NVGGainDecrease: [277, 0], ATAKZoomCycleFLIR: [46, 0], ReticleBrightnessIncrease: [280, 0],
  Crouch: [46, 0], LasersToggle: [327, 0], SwitchGrenades: [268, 0], HoldBreath: [308, 0],
  FlashlightsCycle: [326, 0], SwitchBetweenSights: [326, 0], SwitchSecondPrimary: [257, 0],
  ToggleNVGs: [279, 0], WalkForward: [264, 0], ScopeZeroDown: [274, 0], Vault: [32, 0]
};

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
  uploadPanel.style.display = '';
  editorPanel.style.display = 'none';
  sectionsGrid.innerHTML = '';
  fileInput.value = '';
});
document.getElementById('resetBtn').addEventListener('click', () => {
  applyDefaultBindings();
  presetSelect.value = '__default';
  deletePresetBtn.style.display = 'none';
  setStatus('Reset to the game’s Default bindings.', 'warn');
});
document.getElementById('revertBtn').addEventListener('click', () => {
  data = JSON.parse(JSON.stringify(baseline));
  presetSelect.value = '';
  deletePresetBtn.style.display = 'none';
  renderTables();
  setStatus('Reverted to the uploaded file.', 'warn');
});
document.getElementById('printBtn').addEventListener('click', () => {
  const meta = document.getElementById('printMeta');
  meta.textContent = originalFilename + ' · ' + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
    deletePresetBtn.style.display = 'none';
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

// ---- Rendering ------------------------------------------------------------
function renderTables() {
  sectionsGrid.innerHTML = '';
  const bySection = {};
  SECTION_ORDER.forEach(s => bySection[s] = []);

  Object.keys(data).forEach(actionKey => {
    if (actionKey === 'None') return;
    const meta = ACTION_META[actionKey];
    if (!meta) return; // unknown action in file, skip silently
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
    setStatus('"' + actionKey + '" activation type set to ' + pressTypeLabel(actionKey, data[actionKey].value.PressType) + '.', 'ok');
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
  setStatus('"' + actionKey + '" updated.', 'ok');
});

window.addEventListener('mousedown', e => {
  if (!capturingEl) return;
  e.preventDefault();
  const unity = MOUSEBUTTON_TO_UNITY[e.button];
  if (unity === undefined) return;
  const actionKey = capturingEl.actionKey;
  data[actionKey].value.PrimaryKey = unity;
  data[actionKey].value.PreliminaryKey = 0;
  stopCapture();
  renderTables();
  setStatus('"' + actionKey + '" updated.', 'ok');
});

const copyPathBtn = document.getElementById('copyPathBtn');
copyPathBtn.addEventListener('click', () => {
  // pathHint is the folder itself, so it pastes straight into the Explorer address bar.
  const text = document.getElementById('pathHint').textContent.trim();
  const done = () => {
    copyPathBtn.textContent = 'Copied!';
    copyPathBtn.classList.add('copied');
    setTimeout(() => { copyPathBtn.textContent = 'Copy'; copyPathBtn.classList.remove('copied'); }, 1500);
  };
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, done);
  else done();
});

// ---- Presets ----------------------------------------------------------
const presetSelect = document.getElementById('presetSelect');
const savePresetBtn = document.getElementById('savePresetBtn');
const deletePresetBtn = document.getElementById('deletePresetBtn');

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
    data[actionKey].value.PrimaryKey = map[actionKey][0];
    data[actionKey].value.PreliminaryKey = map[actionKey][1];
  });
  renderTables();
}

presetSelect.addEventListener('change', () => {
  const v = presetSelect.value;
  deletePresetBtn.style.display = v.startsWith('custom:') ? '' : 'none';
  if (v === '__default') { applyDefaultBindings(); setStatus('Default preset applied.', 'ok'); }
  else if (v === '__numpad') { applyPresetMap(PRESET_NUMPAD); setStatus('Numpad preset applied.', 'ok'); }
  else if (v.startsWith('custom:')) {
    const name = v.slice(7);
    const custom = loadCustomPresets();
    if (custom[name]) { applyPresetMap(custom[name]); setStatus('Preset "' + name + '" applied.', 'ok'); }
  }
});

savePresetBtn.addEventListener('click', () => {
  const name = prompt('Name for this preset:');
  if (!name) return;
  const map = {};
  Object.keys(data).forEach(actionKey => {
    if (actionKey === 'None' || !ACTION_META[actionKey]) return;
    map[actionKey] = [data[actionKey].value.PrimaryKey, data[actionKey].value.PreliminaryKey];
  });
  const custom = loadCustomPresets();
  custom[name] = map;
  saveCustomPresets(custom);
  refreshPresetOptions();
  presetSelect.value = 'custom:' + name;
  deletePresetBtn.style.display = '';
  setStatus('Preset "' + name + '" saved in this browser.', 'ok');
});

deletePresetBtn.addEventListener('click', () => {
  const v = presetSelect.value;
  if (!v.startsWith('custom:')) return;
  const name = v.slice(7);
  if (!confirm('Delete preset "' + name + '"?')) return;
  const custom = loadCustomPresets();
  delete custom[name];
  saveCustomPresets(custom);
  refreshPresetOptions();
  presetSelect.value = '';
  deletePresetBtn.style.display = 'none';
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

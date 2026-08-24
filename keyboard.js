// Schematic extended-keyboard diagram (TKL + nav cluster + numpad).
// Each entry: [unityCode, label, col, row, colspan, rowspan]
const KEYBOARD_LAYOUT = [
  // Function row (row 1)
  [27, 'Esc', 1, 1, 1, 1],
  [282, 'F1', 3, 1, 1, 1], [283, 'F2', 4, 1, 1, 1], [284, 'F3', 5, 1, 1, 1], [285, 'F4', 6, 1, 1, 1],
  [286, 'F5', 8, 1, 1, 1], [287, 'F6', 9, 1, 1, 1], [288, 'F7', 10, 1, 1, 1], [289, 'F8', 11, 1, 1, 1],
  [290, 'F9', 13, 1, 1, 1], [291, 'F10', 14, 1, 1, 1], [292, 'F11', 15, 1, 1, 1], [293, 'F12', 16, 1, 1, 1],

  // Number row (row 2)
  [96, '`', 1, 2, 1, 1], [49, '1', 2, 2, 1, 1], [50, '2', 3, 2, 1, 1], [51, '3', 4, 2, 1, 1], [52, '4', 5, 2, 1, 1],
  [53, '5', 6, 2, 1, 1], [54, '6', 7, 2, 1, 1], [55, '7', 8, 2, 1, 1], [56, '8', 9, 2, 1, 1], [57, '9', 10, 2, 1, 1],
  [48, '0', 11, 2, 1, 1], [45, '-', 12, 2, 1, 1], [61, '=', 13, 2, 1, 1], [8, 'Backspace', 14, 2, 2, 1],

  // QWERTY row (row 3)
  [9, 'Tab', 1, 3, 2, 1],
  [113, 'Q', 3, 3, 1, 1], [119, 'W', 4, 3, 1, 1], [101, 'E', 5, 3, 1, 1], [114, 'R', 6, 3, 1, 1], [116, 'T', 7, 3, 1, 1],
  [121, 'Y', 8, 3, 1, 1], [117, 'U', 9, 3, 1, 1], [105, 'I', 10, 3, 1, 1], [111, 'O', 11, 3, 1, 1], [112, 'P', 12, 3, 1, 1],
  [91, '[', 13, 3, 1, 1], [93, ']', 14, 3, 1, 1], [92, '\\', 15, 3, 2, 1],

  // Home row (row 4)
  [301, 'Caps', 1, 4, 2, 1],
  [97, 'A', 3, 4, 1, 1], [115, 'S', 4, 4, 1, 1], [100, 'D', 5, 4, 1, 1], [102, 'F', 6, 4, 1, 1], [103, 'G', 7, 4, 1, 1],
  [104, 'H', 8, 4, 1, 1], [106, 'J', 9, 4, 1, 1], [107, 'K', 10, 4, 1, 1], [108, 'L', 11, 4, 1, 1],
  [59, ';', 12, 4, 1, 1], [39, "'", 13, 4, 1, 1], [13, 'Enter', 14, 4, 3, 1],

  // Bottom letter row (row 5)
  [304, 'Shift', 1, 5, 3, 1],
  [122, 'Z', 4, 5, 1, 1], [120, 'X', 5, 5, 1, 1], [99, 'C', 6, 5, 1, 1], [118, 'V', 7, 5, 1, 1], [98, 'B', 8, 5, 1, 1],
  [110, 'N', 9, 5, 1, 1], [109, 'M', 10, 5, 1, 1], [44, ',', 11, 5, 1, 1], [46, '.', 12, 5, 1, 1], [47, '/', 13, 5, 1, 1],
  [303, 'Shift', 14, 5, 3, 1],

  // Space row (row 6)
  [306, 'Ctrl', 1, 6, 1, 1], [311, 'Win', 2, 6, 1, 1], [308, 'Alt', 3, 6, 1, 1],
  [32, 'Space', 4, 6, 9, 1],
  [307, 'Alt', 13, 6, 1, 1], [312, 'Win', 14, 6, 1, 1], [319, 'Menu', 15, 6, 1, 1], [305, 'Ctrl', 16, 6, 1, 1],

  // Nav cluster (cols 18-20)
  [277, 'Ins', 18, 2, 1, 1], [278, 'Home', 19, 2, 1, 1], [280, 'PgUp', 20, 2, 1, 1],
  [127, 'Del', 18, 3, 1, 1], [279, 'End', 19, 3, 1, 1], [281, 'PgDn', 20, 3, 1, 1],

  // Arrow cluster (cols 18-20)
  [273, '↑', 19, 5, 1, 1],
  [276, '←', 18, 6, 1, 1], [274, '↓', 19, 6, 1, 1], [275, '→', 20, 6, 1, 1],

  // Numpad (cols 22-25)
  [300, 'Num', 22, 2, 1, 1], [267, '/', 23, 2, 1, 1], [268, '*', 24, 2, 1, 1], [269, '-', 25, 2, 1, 1],
  [263, '7', 22, 3, 1, 1], [264, '8', 23, 3, 1, 1], [265, '9', 24, 3, 1, 1], [270, '+', 25, 3, 1, 2],
  [260, '4', 22, 4, 1, 1], [261, '5', 23, 4, 1, 1], [262, '6', 24, 4, 1, 1],
  [257, '1', 22, 5, 1, 1], [258, '2', 23, 5, 1, 1], [259, '3', 24, 5, 1, 1], [271, 'Enter', 25, 5, 1, 2],
  [256, '0', 22, 6, 2, 1], [266, '.', 24, 6, 1, 1]
];

const MOUSE_CODES = { 323: 'Mouse 0 (left)', 324: 'Mouse 1 (right)', 325: 'Mouse 2 (middle)', 326: 'Mouse 3 (side)', 327: 'Mouse 4 (side)', 328: 'Mouse 5', 329: 'Mouse 6' };

function buildKeyboardGrid() {
  const grid = document.getElementById('kbdGrid');
  grid.innerHTML = '';
  KEYBOARD_LAYOUT.forEach(([code, label, col, row, colspan, rowspan]) => {
    const div = document.createElement('div');
    div.className = 'kbd-key';
    div.dataset.code = code;
    div.textContent = label;
    div.style.gridColumn = colspan > 1 ? `${col} / span ${colspan}` : col;
    div.style.gridRow = rowspan > 1 ? `${row} / span ${rowspan}` : row;
    grid.appendChild(div);
  });
}

function showKeyboardHighlight(primaryCode, preliminaryCode) {
  const panel = document.getElementById('kbdPanel');
  const label = document.getElementById('kbdPanelLabel');
  const grid = document.getElementById('kbdGrid');

  grid.querySelectorAll('.kbd-key').forEach(el => el.classList.remove('highlight', 'mod'));

  if (MOUSE_CODES[primaryCode]) {
    label.textContent = MOUSE_CODES[primaryCode];
    grid.style.display = 'none';
  } else if (!primaryCode) {
    label.textContent = 'No key assigned';
    grid.style.display = 'none';
  } else {
    label.textContent = '';
    grid.style.display = '';
    const primEl = grid.querySelector(`.kbd-key[data-code="${primaryCode}"]`);
    if (primEl) primEl.classList.add('highlight');
    if (preliminaryCode) {
      const modEl = grid.querySelector(`.kbd-key[data-code="${preliminaryCode}"]`);
      if (modEl) modEl.classList.add('highlight', 'mod');
    }
  }
  panel.classList.add('show');
}

function hideKeyboardPanel() {
  document.getElementById('kbdPanel').classList.remove('show');
}

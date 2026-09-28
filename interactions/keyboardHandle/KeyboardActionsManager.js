import { ActionKey } from "./ActionKey.js"

export class KeyboardActionsManager{
  constructor(){
    this.KEY_STATES = KEY_STATES;
    this.forwardKey = new ActionKey("ArrowUp","KeyW");
    this.backKey = new ActionKey("ArrowDown", "KeyS");
    this.leftKey = new ActionKey("ArrowLeft", "KeyA");
    this.rightKey = new ActionKey("ArrowRight", "KeyD");
    this.modeKey = new ActionKey("ShiftLeft");
    this.upKey = new ActionKey("Space");
    this.downKey = new ActionKey("Tab");
  }
  clearActionKeys(action_name){
    let array = this[action_name].boundKeys
    for (let index = 0; index < array.length; index++) {
      this.KEY_STATES[array[index]]=null;
    }
    this[action_name].boundKeys = [];
  }
  deleteActionKey(action_name, key_name){
    let idx = this[action_name].boundKeys.indexOf(key_name)
    if (idx==-1){
      console.warn(`no key: ${key_name} in ${action_name}.boundKeys`);
      return
    }
    this[action_name].boundKeys.splice(idx, 1)
    this.KEY_STATES[key_name] = null
  }
  addActionKey(action_name, key_name){
    this[action_name].boundKeys.push(key_name)
    this.change_KEY_STATE(action_name, key_name)
  }
  change_KEY_STATE(action_name, key_name){
    let current_key_action = this.KEY_STATES[key_name]
    if(current_key_action!=null && current_key_action!= action_name){
      this.deleteActionKey(current_key_action, key_name)
    }
    this.KEY_STATES[key_name] = action_name
  }
  setActionKey(action_name, key_name){
    this.clearActionKeys(action_name)
    this.addActionKey(action_name, key_name)
  }
}


const KEY_STATES = {
  // Strzałki
  ArrowUp: "forwardKey",
  ArrowDown: "backKey",
  ArrowLeft: "leftKey",
  ArrowRight: "rightKey",

  // Klawisze sterujące i modyfikatory
  Space: "upKey",
  Enter: null,
  Escape: null,
  Tab: "downKey",
  Backspace: null,
  Delete: null,
  ShiftLeft: "modeKey",
  ShiftRight: null,
  ControlLeft: null,
  ControlRight: null,
  AltLeft: null,
  AltRight: null,
  CapsLock: null,

  // Nawigacja
  PageUp: null,
  PageDown: null,
  Home: null,
  End: null,
  Insert: null,

  // Litery (pozycja fizyczna QWERTY)
  KeyA: "leftKey", KeyB: null, KeyC: null, KeyD: "rightKey",
  KeyE: null, KeyF: null, KeyG: null, KeyH: null,
  KeyI: null, KeyJ: null, KeyK: null, KeyL: null,
  KeyM: null, KeyN: null, KeyO: null, KeyP: null,
  KeyQ: null, KeyR: null, KeyS: "backKey", KeyT: null,
  KeyU: null, KeyV: null, KeyW: "forwardKey", KeyX: null,
  KeyY: null, KeyZ: null,

  // Cyfry (główny rząd)
  Digit0: null, Digit1: null, Digit2: null,
  Digit3: null, Digit4: null, Digit5: null,
  Digit6: null, Digit7: null, Digit8: null,
  Digit9: null,

  // Numpad
  Numpad0: null, Numpad1: null, Numpad2: null,
  Numpad3: null, Numpad4: null, Numpad5: null,
  Numpad6: null, Numpad7: null, Numpad8: null,
  Numpad9: null,
  NumpadAdd: null,
  NumpadSubtract: null,
  NumpadMultiply: null,
  NumpadDivide: null,
  NumpadEnter: null,
  NumpadDecimal: null,

  // Klawisze funkcyjne (F1 - F12)
  F1: null, F2: null, F3: null, F4: null,
  F5: null, F6: null, F7: null, F8: null,
  F9: null, F10: null, F11: null, F12: null,
};


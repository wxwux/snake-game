export const objects = {
  "SNAKE" : "SNAKE",
  "BOARD" : "BOARD",
  "APPLE" : "APPLE"
}

class State {
  constructor(initialState = {}) {
    this.state = initialState;
  }

  setState(type, data) {
    this.state[type] = {...this.state[type], ...data};
  }

  getState(type) {
    if (type && this.state.hasOwnProperty(type) === false) {
      throw new Error(`you are trying to get property ${type} which is not set in state`);
    }

    return type ? this.state[type] : this.state;
  }
}

export const state = new State();


export const objects = {
  "SNAKE" : "SNAKE",
  "BOARD" : "BOARD"
}

class State {
  constructor(initialState = {}) {
    this.state = initialState;
  }

  setState(type, data) {
    this.state[type] = {...this.state[type], ...data};
  }

  getState(type) {
    return type ? this.state[type] : this.state;
  }
}

export const state = new State();


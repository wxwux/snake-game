import { objects } from "../objects";

export const initialState = {
  [objects.SNAKE]: {
    head: {
      col: 8,
      row: 6,
    },
    position: [
      { col: 8, row: 6 },
      { col: 8, row: 7 },
      { col: 8, row: 8 },
    ],
  },
  [objects.BOARD]: {
    size: 15,
    edgeCell: 1,
    cell: {
      size: 36,
      spacing: 6,
    },
  },
  [objects.APPLE]: {
    position: {
      col: 3,
      row: 3
    }
  },
  [objects.SCORES] : {
    scores: 0,
    lives: 3
  }
};

class State {
  constructor(initialState = {}) {
    this.originalState = {...initialState};
    this.state = initialState;
  }

  setState(type, data) {
    this.state[type] = { ...this.state[type], ...data };
  }

  getState(type) {
    if (type && this.state.hasOwnProperty(type) === false) {
      throw new Error(
        `you are trying to get property ${type} which is not set in the state`
      );
    }

    return type ? this.state[type] : this;
  }

  resetState(type) {
    if (type && this.state.hasOwnProperty(type) === false) {
      throw new Error(
        `you are trying to reset property ${type} which is not set in the state`
      );
    }

    this.state[type] = this.originalState[type];
  }
}

export const state = new State(initialState);

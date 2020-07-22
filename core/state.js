import { objects } from "../objects";

export const initialState = {
  [objects.SNAKE]: {
    head: {
      col: 8,
      row: 8,
    },
    position: [
      { col: 8, row: 8 },
      { col: 6, row: 6 },
      { col: 8, row: 9 },
      { col: 8, row: 10 },
      { col: 8, row: 11 },
      { col: 8, row: 12 },
      { col: 8, row: 13 },
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
    scores: 0
  }
};

class State {
  constructor(initialState = {}) {
    this.state = initialState;
  }

  setState(type, data) {
    this.state[type] = { ...this.state[type], ...data };
  }

  getState(type) {
    if (type && this.state.hasOwnProperty(type) === false) {
      throw new Error(
        `you are trying to get property ${type} which is not set in state`
      );
    }

    return type ? this.state[type] : this;
  }

}

export const state = new State(initialState);

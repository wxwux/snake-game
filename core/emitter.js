export class Emitter {
  constructor() {
    this.events = {};
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  emit(type) {
    if (this.events[type]) {
      this.events[type].forEach((listener) => {
        listener();
      });
    }
  }
}

export const emitter = new Emitter();

export const events = {
  "SCORE": "SCORE",
  "LOSE" : "LOSE"
}
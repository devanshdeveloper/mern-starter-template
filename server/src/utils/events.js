import EventEmitter from "events";

export default class Events {
  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  // Add an event listener
  on(event, listener) {
    this.eventEmitter.on(event, listener);
  }

  // Add an event listener that triggers only once
  once(event, listener) {
    this.eventEmitter.once(event, listener);
  }

  // Remove a specific listener for an event
  removeListener(event, listener) {
    this.eventEmitter.removeListener(event, listener);
  }

  // Emit an event and return results from all listeners
  emit(event, ...args) {
    const listeners = this.eventEmitter.listeners(event);

    if (listeners.length === 0) {
      return null; // No listeners for the event
    }

    return listeners.map((listener) => listener(...args));
  }

  // Get a list of listeners for a specific event
  listeners(event) {
    return this.eventEmitter.listeners(event);
  }

  hasListners(event) {
    const listeners = this.eventEmitter.listeners(event);
    return listeners.length !== 0;
  }

  // Get a list of all registered events
  eventNames() {
    return this.eventEmitter.eventNames();
  }

  // Remove all listeners for a specific event
  removeAllListeners(event) {
    this.eventEmitter.removeAllListeners(event);
  }
}

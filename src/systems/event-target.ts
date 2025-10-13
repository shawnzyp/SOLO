type ListenerEntry = {
  listener: EventListenerOrEventListenerObject;
  once: boolean;
};

class BasicEventTarget implements EventTarget {
  private listeners = new Map<string, Set<ListenerEntry>>();

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    if (!listener) return;
    const once = typeof options === 'object' && options?.once === true;
    const entries = this.listeners.get(type) ?? new Set<ListenerEntry>();
    entries.add({ listener, once });
    this.listeners.set(type, entries);
    if (typeof options === 'object' && options?.signal) {
      const { signal } = options;
      if (signal.aborted) {
        this.removeEventListener(type, listener, options);
        return;
      }
      signal.addEventListener('abort', () => {
        this.removeEventListener(type, listener, options);
      }, { once: true });
    }
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    _options?: boolean | EventListenerOptions,
  ): void {
    if (!listener) return;
    const entries = this.listeners.get(type);
    if (!entries) return;
    for (const entry of entries) {
      if (entry.listener === listener) {
        entries.delete(entry);
      }
    }
    if (entries.size === 0) {
      this.listeners.delete(type);
    }
  }

  dispatchEvent(event: Event): boolean {
    const entries = this.listeners.get(event.type);
    if (!entries || entries.size === 0) {
      return true;
    }

    for (const entry of Array.from(entries)) {
      const { listener, once } = entry;
      if (typeof listener === 'function') {
        listener.call(this, event);
      } else if (listener && typeof listener.handleEvent === 'function') {
        listener.handleEvent(event);
      }
      if (once) {
        entries.delete(entry);
      }
      if ((event as Event).defaultPrevented) {
        break;
      }
    }

    if (entries.size === 0) {
      this.listeners.delete(event.type);
    }

    return !event.defaultPrevented;
  }
}

function createNativeTarget(): EventTarget | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const { EventTarget: NativeEventTarget, document } = window;
  if (typeof NativeEventTarget === 'function') {
    try {
      return new NativeEventTarget();
    } catch (error) {
      console.warn('EventTarget constructor not supported, falling back to DOM element.', error);
    }
  }
  if (document && typeof document.createElement === 'function') {
    return document.createElement('span');
  }
  return null;
}

export class SafeEventTarget implements EventTarget {
  private readonly target: EventTarget;

  constructor() {
    this.target = createNativeTarget() ?? new BasicEventTarget();
  }

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    if (!listener) return;
    const normalizedOptions = typeof options === 'boolean' ? { capture: options } : options;
    this.target.addEventListener(type, listener as EventListener, normalizedOptions);
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject | null,
    options?: boolean | EventListenerOptions,
  ): void {
    if (!listener) return;
    const normalizedOptions = typeof options === 'boolean' ? { capture: options } : options;
    this.target.removeEventListener(type, listener as EventListener, normalizedOptions);
  }

  dispatchEvent(event: Event): boolean {
    return this.target.dispatchEvent(event);
  }
}

export const createSafeEventTarget = () => new SafeEventTarget();

export type { BasicEventTarget };

export function clone<T>(value: T): T {
  if (typeof globalThis.structuredClone === 'function') {
    return globalThis.structuredClone(value);
  }

  return cloneFallback(value);
}

function cloneFallback<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cloneFallback(item)) as unknown as T;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as unknown as T;
  }

  if (value instanceof Map) {
    const result = new Map();
    for (const [key, entry] of value.entries()) {
      result.set(key, cloneFallback(entry));
    }
    return result as unknown as T;
  }

  if (value instanceof Set) {
    const result = new Set();
    for (const entry of value.values()) {
      result.add(cloneFallback(entry));
    }
    return result as unknown as T;
  }

  if (value && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      result[key] = cloneFallback(entry);
    }
    return result as T;
  }

  return value;
}

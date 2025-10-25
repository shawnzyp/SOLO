let loggedWarning = false;

function warnOnce(message: string, error?: unknown): void {
  if (loggedWarning) return;
  loggedWarning = true;
  if (error) {
    console.warn(message, error);
  } else {
    console.warn(message);
  }
}

export function createAbortController(): AbortController | null {
  if (typeof AbortController !== 'undefined') {
    try {
      return new AbortController();
    } catch (error) {
      warnOnce('AbortController is unavailable; continuing without request cancellation support.', error);
      return null;
    }
  }

  warnOnce('AbortController is not supported in this browser; continuing without request cancellation support.');
  return null;
}

export function getAbortSignal(controller: AbortController | null): AbortSignal | undefined {
  return controller?.signal;
}

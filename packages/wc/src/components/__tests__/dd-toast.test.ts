import { describe, expect, it, beforeEach } from 'vitest';
import { DdToast, type ToastOptions } from '../dd-toast';

const tag = 'dd-toast';

function defineToast() {
  if (!customElements.get(tag)) {
    customElements.define(tag, DdToast);
  }
}

describe('<dd-toast>', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('pushes notifications to the document body', async () => {
    defineToast();
    const options: ToastOptions = { message: 'Quest updated!', variant: 'success', duration: 10_000 };
    const toast = await DdToast.show(options);
    await toast.updateComplete;
    expect(document.querySelector(tag)).toBeInstanceOf(DdToast);
    expect(toast.message).toBe(options.message);
    DdToast.clear();
    expect(toast.message).toBe('');
  });
});

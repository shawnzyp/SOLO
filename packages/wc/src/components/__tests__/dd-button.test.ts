import { describe, it, expect } from 'vitest';
import { DdButton } from '../dd-button';

describe('dd-button', () => {
  it('defaults to primary variant', () => {
    const btn = new DdButton();
    expect(btn.variant ?? (btn as any).variant).toBe('primary');
  });
});

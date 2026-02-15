import { describe, it, expect, vi } from 'vitest';

describe('components/index.js', () => {
  it('should export Navbar component', async () => {
    const { Navbar } = await import('./index.js');
    expect(Navbar).toBeDefined();
    expect(typeof Navbar).toBe('function');
  });

  it('should export Welcome component', async () => {
    const { Welcome } = await import('./index.js');
    expect(Welcome).toBeDefined();
    expect(typeof Welcome).toBe('function');
  });

  it('should export both Navbar and Welcome components', async () => {
    const exports = await import('./index.js');
    expect(Object.keys(exports)).toContain('Navbar');
    expect(Object.keys(exports)).toContain('Welcome');
  });

  it('should have exactly two named exports', async () => {
    const exports = await import('./index.js');
    const namedExports = Object.keys(exports).filter(key => key !== 'default');
    expect(namedExports).toHaveLength(2);
  });

  it('should export components that are different from each other', async () => {
    const { Navbar, Welcome } = await import('./index.js');
    expect(Navbar).not.toBe(Welcome);
  });
});
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('Client App Component', () => {
  it('defines the App component function', () => {
    expect(typeof App).toBe('function');
  });
});

import { describe, it, expect } from 'vitest';

describe('Frontend Environment & Sanity Checks', () => {
    it('vitest test runner is configured correctly', () => {
        expect(true).toBe(true);
    });

    it('jsdom environment is successfully loaded', () => {
        // This confirms the test environment simulates a browser
        expect(typeof window).not.toBe('undefined');
        expect(typeof document).not.toBe('undefined');
    });
});

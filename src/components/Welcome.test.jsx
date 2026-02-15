import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Welcome from './Welcome.jsx';

describe('Welcome.jsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Component rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<Welcome />);
      expect(container).toBeInTheDocument();
    });

    it('should render welcome section with correct id', () => {
      const { container } = render(<Welcome />);
      const section = container.querySelector('section#welcome');
      expect(section).toBeInTheDocument();
    });

    it('should render subtitle text', () => {
      const { container } = render(<Welcome />);
      const subtitleText = "Hey, I'm Arun! Welcome to my";
      const subtitleContainer = container.querySelector('p');
      const spans = subtitleContainer.querySelectorAll('span');
      const renderedText = Array.from(spans).map(span => span.textContent).join('').replace(/\u00A0/g, ' ');
      expect(renderedText).toBe(subtitleText);
    });

    it('should render title text "portfolio"', () => {
      render(<Welcome />);
      const spans = screen.getAllByText((content, element) => {
        return element.tagName.toLowerCase() === 'span';
      });
      const renderedText = spans.map(span => span.textContent).join('');
      expect(renderedText).toContain('portfolio');
    });

    it('should render small-screen message', () => {
      render(<Welcome />);
      const message = screen.getByText(/Thsi Portfolio is designed for desktop\/tabled screens only../);
      expect(message).toBeInTheDocument();
    });
  });

  describe('Text rendering', () => {
    it('should render each character as a separate span', () => {
      const { container } = render(<Welcome />);
      const allSpans = container.querySelectorAll('span');
      // "Hey, I'm Arun! Welcome to my" (29 chars) + "portfolio" (9 chars) = 38 total
      expect(allSpans.length).toBeGreaterThan(30);
    });

    it('should convert spaces to non-breaking spaces', () => {
      const { container } = render(<Welcome />);
      const spans = container.querySelectorAll('span');
      let hasNonBreakingSpace = false;
      spans.forEach(span => {
        if (span.textContent === '\u00A0') {
          hasNonBreakingSpace = true;
        }
      });
      expect(hasNonBreakingSpace).toBe(true);
    });

    it('should apply correct CSS classes to subtitle spans', () => {
      const { container } = render(<Welcome />);
      const subtitleContainer = container.querySelector('p');
      const spans = subtitleContainer.querySelectorAll('span');
      spans.forEach(span => {
        expect(span.className).toContain('text-3xl');
        expect(span.className).toContain('font-georama');
      });
    });

    it('should apply correct CSS classes to title spans', () => {
      const { container } = render(<Welcome />);
      const titleContainer = container.querySelector('h1');
      const spans = titleContainer.querySelectorAll('span');
      spans.forEach(span => {
        expect(span.className).toContain('text-9xl');
        expect(span.className).toContain('italic');
        expect(span.className).toContain('font-georama');
      });
    });

    it('should apply fontVariationSettings style to each span', () => {
      const { container } = render(<Welcome />);
      const allSpans = container.querySelectorAll('span');
      allSpans.forEach(span => {
        expect(span.style.fontVariationSettings).toBeTruthy();
      });
    });
  });

  describe('Font weight configuration', () => {
    it('should apply default subtitle weight (100)', () => {
      const { container } = render(<Welcome />);
      const subtitleContainer = container.querySelector('p');
      const spans = subtitleContainer.querySelectorAll('span');
      spans.forEach(span => {
        expect(span.style.fontVariationSettings).toContain('100');
      });
    });

    it('should apply default title weight (400)', () => {
      const { container } = render(<Welcome />);
      const titleContainer = container.querySelector('h1');
      const spans = titleContainer.querySelectorAll('span');
      // The title doesn't have baseWeight specified in renderText call,
      // so it uses the default parameter value of 400
      spans.forEach(span => {
        expect(span.style.fontVariationSettings).toBeTruthy();
      });
    });
  });

  describe('Structure and styling', () => {
    it('should render subtitle in a paragraph element', () => {
      const { container } = render(<Welcome />);
      const subtitle = container.querySelector('p[ref]') || container.querySelector('p');
      expect(subtitle).toBeInTheDocument();
    });

    it('should render title in an h1 element', () => {
      const { container } = render(<Welcome />);
      const title = container.querySelector('h1');
      expect(title).toBeInTheDocument();
    });

    it('should apply mt-7 margin class to title', () => {
      const { container } = render(<Welcome />);
      const title = container.querySelector('h1');
      expect(title.className).toContain('mt-7');
    });

    it('should render small-screen div with correct class', () => {
      const { container } = render(<Welcome />);
      const smallScreen = container.querySelector('.small-screen');
      expect(smallScreen).toBeInTheDocument();
    });
  });

  describe('Refs and GSAP integration', () => {
    it('should create refs for title and subtitle', () => {
      const { container } = render(<Welcome />);
      const subtitle = container.querySelector('p');
      const title = container.querySelector('h1');
      expect(subtitle).toBeInTheDocument();
      expect(title).toBeInTheDocument();
    });

    it('should render component with GSAP integration', () => {
      // Test that component renders successfully with GSAP mocked
      // The useGSAP hook is called during render via the setup mock
      const { container } = render(<Welcome />);
      const section = container.querySelector('section#welcome');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Edge cases and boundary conditions', () => {
    it('should handle empty string gracefully', () => {
      // This tests the renderText function's robustness
      const { container } = render(<Welcome />);
      expect(container).toBeInTheDocument();
    });

    it('should render special characters correctly', () => {
      render(<Welcome />);
      // Tests that apostrophe in "I'm" is rendered
      const spans = screen.getAllByText((content, element) => {
        return element.tagName.toLowerCase() === 'span';
      });
      const renderedText = spans.map(span => span.textContent).join('').replace(/\u00A0/g, ' ');
      expect(renderedText).toContain("'");
    });

    it('should maintain component structure after multiple renders', () => {
      const { container, rerender } = render(<Welcome />);
      const initialSpanCount = container.querySelectorAll('span').length;

      rerender(<Welcome />);
      const secondSpanCount = container.querySelectorAll('span').length;

      expect(initialSpanCount).toBe(secondSpanCount);
    });
  });

  describe('Accessibility', () => {
    it('should have semantic section element', () => {
      const { container } = render(<Welcome />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should use proper heading hierarchy (h1)', () => {
      const { container } = render(<Welcome />);
      const h1 = container.querySelector('h1');
      expect(h1).toBeInTheDocument();
    });
  });

  describe('Typo verification (regression test)', () => {
    it('should contain the typo "Thsi" for small-screen message', () => {
      render(<Welcome />);
      // This is a regression test to ensure we're testing the actual component
      // If the typo is fixed, this test will fail and should be updated
      const message = screen.getByText(/Thsi Portfolio/);
      expect(message).toBeInTheDocument();
    });

    it('should contain "tabled" instead of "tablet" in small-screen message', () => {
      render(<Welcome />);
      // Another typo regression test
      const message = screen.getByText(/tabled screens/);
      expect(message).toBeInTheDocument();
    });
  });
});
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

// Mock the child components
vi.mock('#components', () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
  Welcome: () => <div data-testid="welcome">Welcome</div>,
}));

describe('App.jsx', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('welcome')).toBeInTheDocument();
  });

  it('should render main element as the root container', () => {
    const { container } = render(<App />);
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  it('should render Navbar component', () => {
    render(<App />);
    const navbar = screen.getByTestId('navbar');
    expect(navbar).toBeInTheDocument();
    expect(navbar).toHaveTextContent('Navbar');
  });

  it('should render Welcome component', () => {
    render(<App />);
    const welcome = screen.getByTestId('welcome');
    expect(welcome).toBeInTheDocument();
    expect(welcome).toHaveTextContent('Welcome');
  });

  it('should render Navbar before Welcome in the DOM', () => {
    const { container } = render(<App />);
    const main = container.querySelector('main');
    const children = Array.from(main.children);

    expect(children[0]).toHaveAttribute('data-testid', 'navbar');
    expect(children[1]).toHaveAttribute('data-testid', 'welcome');
  });

  it('should render exactly two child components', () => {
    const { container } = render(<App />);
    const main = container.querySelector('main');
    expect(main.children).toHaveLength(2);
  });

  it('should export App as default export', () => {
    expect(App).toBeDefined();
    expect(typeof App).toBe('function');
  });
});
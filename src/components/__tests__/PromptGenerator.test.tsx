import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AuthProvider } from '../../context/AuthContext';
import { PromptGenerator } from '../PromptGenerator';
import { Blueprint } from '../../data';

// Mock the useAuth hook
const mockIncrementRequestCount = vi.fn();
const mockRemainingRequests = 5;

vi.mock('../../context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-provider">{children}</div>,
  useAuth: vi.fn(() => ({
    incrementRequestCount: mockIncrementRequestCount,
    remainingRequests: mockRemainingRequests,
    isLoggedIn: true,
  })),
}));

const mockBlueprint: Blueprint = {
  id: 'test-blueprint',
  title: 'Test Blueprint',
  category: 'Test',
  description: 'A test blueprint',
  logic_template: 'Create a {{type}} for {{purpose}}',
  input_fields: [
    {
      label: 'Type',
      type: 'text',
      placeholder: 'e.g., website',
      name: 'type',
    },
    {
      label: 'Purpose',
      type: 'text',
      placeholder: 'e.g., business',
      name: 'purpose',
    },
  ],
  tier: 'free',
};

describe('PromptGenerator', () => {
  beforeEach(() => {
    mockIncrementRequestCount.mockClear();
    mockIncrementRequestCount.mockResolvedValue(true);
  });

  it('renders blueprint title and input fields', () => {
    render(
      <AuthProvider>
        <PromptGenerator blueprint={mockBlueprint} onClose={vi.fn()} />
      </AuthProvider>
    );

    expect(screen.getByText('Test Blueprint')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., website')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., business')).toBeInTheDocument();
  });

  it('shows remaining requests count', () => {
    render(
      <AuthProvider>
        <PromptGenerator blueprint={mockBlueprint} onClose={vi.fn()} />
      </AuthProvider>
    );

    expect(screen.getByText('คงเหลือ: 5 ครั้ง')).toBeInTheDocument();
  });

  it('generates prompt when form is submitted', async () => {
    render(
      <AuthProvider>
        <PromptGenerator blueprint={mockBlueprint} onClose={vi.fn()} />
      </AuthProvider>
    );

    const typeInput = screen.getByPlaceholderText('e.g., website');
    const purposeInput = screen.getByPlaceholderText('e.g., business');
    const generateButton = screen.getByText('สร้าง Prompt');

    fireEvent.change(typeInput, { target: { value: 'website' } });
    fireEvent.change(purposeInput, { target: { value: 'business' } });
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(mockIncrementRequestCount).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText('Create a website for business')).toBeInTheDocument();
    });
  });

  it('shows upgrade button when requests are exhausted', async () => {
    // Mock exhausted requests
    const { useAuth } = vi.mocked(await import('../../context/AuthContext'));
    useAuth.mockReturnValueOnce({
      incrementRequestCount: mockIncrementRequestCount,
      remainingRequests: 0,
      isLoggedIn: true,
    });

    render(
      <AuthProvider>
        <PromptGenerator blueprint={mockBlueprint} onClose={vi.fn()} />
      </AuthProvider>
    );

    expect(screen.getByText('ใช้ครบแล้ว')).toBeInTheDocument();
    expect(screen.getByText('อัปเกรด')).toBeInTheDocument();
  });

  it('copies result to clipboard when copy button is clicked', async () => {
    // Mock clipboard API
    const mockWriteText = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: mockWriteText,
      },
    });

    render(
      <AuthProvider>
        <PromptGenerator blueprint={mockBlueprint} onClose={vi.fn()} />
      </AuthProvider>
    );

    // Generate a result first
    const typeInput = screen.getByPlaceholderText('e.g., website');
    const purposeInput = screen.getByPlaceholderText('e.g., business');
    const generateButton = screen.getByText('สร้าง Prompt');

    fireEvent.change(typeInput, { target: { value: 'website' } });
    fireEvent.change(purposeInput, { target: { value: 'business' } });
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(screen.getByText('Create a website for business')).toBeInTheDocument();
    });

    const copyButton = screen.getByTitle('คัดลอก');
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Create a website for business');
  });
});
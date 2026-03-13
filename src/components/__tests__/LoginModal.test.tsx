import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../../context/AuthContext';
import App from '../../App';

// This test checks that the login modal can be opened and displays required fields.
// It uses the existing app layout to render components in context.

describe('Login Modal', () => {
  it('renders login form and allows switching to sign up', async () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    const getStartedButtons = await screen.findAllByRole('button', { name: /เริ่มต้นใช้งานฟรี/i });
    fireEvent.click(getStartedButtons[0]);

    const emailInput = await screen.findByPlaceholderText(/your@email/i);
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    expect(passwordInput).toBeInTheDocument();

    const toggleButton = screen.getByText(/ยังไม่มีบัญชี\? สมัครสมาชิก/i);
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    const displayNameInput = await screen.findByPlaceholderText(/ชื่อของคุณ/i);
    expect(displayNameInput).toBeInTheDocument();
  });
});

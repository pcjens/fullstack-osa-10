import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from "./SignIn";

describe('SignIn', () => {
    describe('SignInContainer', () => {
        it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
            const signInFn = jest.fn();
            render(<SignInContainer onSubmit={signInFn} />);
            fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
            fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
            fireEvent.press(screen.getByText('Sign in'));

            await waitFor(() => {
                expect(signInFn).toHaveBeenCalledTimes(1);
                expect(signInFn.mock.calls[0][0]).toEqual({
                    username: 'kalle',
                    password: 'password',
                });
            });
        });
    });
});
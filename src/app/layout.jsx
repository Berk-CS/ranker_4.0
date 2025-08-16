// src/app/layout.jsx
import './globals.css';
import AuthProviderWrapper from '../../components/AuthProviderWrapper';

export const metadata = {
  title: 'Your App Title',
  description: 'Your description',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProviderWrapper>
          {children}
        </AuthProviderWrapper>
      </body>
    </html>
  );
}

// App.tsx
import { Suspense, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import { AuthProvider } from './contexts/AuthContext';
import { AppRouter } from './routes/appRouters';

function App() {
  useEffect(() => {
    localStorage.setItem('token', 'fake_token');
    localStorage.setItem('role', 'staff');
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </Suspense>
  );
}

export default App;

import React from 'react';
import Navigation from './navigation/RootNavigation';
import {AuthProvider} from './hooks/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

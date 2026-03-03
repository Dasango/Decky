import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import Dashboard from './pages/Dashboard';
import DeckDetail from './pages/DeckDetail';

import StudySession from './pages/StudySession';
import FlashcardForm from './pages/FlashcardForm';
import NewDeck from './pages/NewDeck';

// Pages (Placeholders for now)

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/decks" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/decks/new" element={
              <ProtectedRoute>
                <NewDeck />
              </ProtectedRoute>
            } />
            <Route path="/decks/:deckId" element={
              <ProtectedRoute>
                <DeckDetail />
              </ProtectedRoute>
            } />
            <Route path="/decks/:deckId/add" element={
              <ProtectedRoute>
                <FlashcardForm />
              </ProtectedRoute>
            } />
            <Route path="/decks/:deckId/edit/:id" element={
              <ProtectedRoute>
                <FlashcardForm />
              </ProtectedRoute>
            } />
            <Route path="/study" element={
              <ProtectedRoute>
                <StudySession />
              </ProtectedRoute>
            } />

            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
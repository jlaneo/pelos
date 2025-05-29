
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BookingWidget from './components/BookingWidget';
import AdminView from './components/admin/AdminView';
import AdminLogin from './components/admin/AdminLogin'; // New Login View

const App: React.FC = () => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleEnterAdminIntent = useCallback(() => {
    setIsAdminMode(true);
    window.scrollTo(0, 0);
  }, []);

  const handleExitAdminMode = useCallback(() => {
    setIsAdminMode(false);
    setIsAdminAuthenticated(false); // Always logout on full exit
    window.scrollTo(0, 0);
  }, []);

  const handleLoginSuccess = useCallback(() => {
    setIsAdminAuthenticated(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg-light">
      <Header />
      <main className="flex-grow">
        {isAdminMode ? (
          isAdminAuthenticated ? (
            <AdminView onExitAdminMode={handleExitAdminMode} />
          ) : (
            <AdminLogin 
              onLoginSuccess={handleLoginSuccess} 
              onGoBack={handleExitAdminMode} /* Go back to client view */
            />
          )
        ) : (
          <BookingWidget />
        )}
      </main>
      <Footer 
        isAdminMode={isAdminMode} 
        onToggleAdminMode={isAdminMode ? handleExitAdminMode : handleEnterAdminIntent} 
      />
    </div>
  );
};

export default App;

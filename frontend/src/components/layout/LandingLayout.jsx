// src/components/layout/LandingLayout.jsx
import Header from './Header';
import Footer from './Footer';

const LandingLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayout;

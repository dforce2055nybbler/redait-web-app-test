import React from 'react';
import Header from './header';
import '../styles/styles.scss'
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-background">
        <div style={{ marginTop: '1rem' }}>&nbsp;</div>
        {children}
      </main>
      {/*Footer  */}
    </>
  );
};

export default Layout;

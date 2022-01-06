import React from 'react';
import Header from './header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/*Header  */}
      {/*Main  */}
      {/*Footer  */}
    </>
  );
};

export default Layout;

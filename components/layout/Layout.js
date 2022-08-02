import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTheme } from '@/context/ThemeContext';
import { useSession } from 'next-auth/client';

import { Container } from 'react-bootstrap';

const Navigation = dynamic(() => import('../UI/navigation/Navigation'), {
  ssr: false,
});

const BackgoundVideo = dynamic(() => import('../UI/videos/BackgoundVideo'), {
  ssr: false,
});

const Sidebar = dynamic(() => import('../UI/sidebar/Sidebar'), {
  ssr: false,
});

const Footer = dynamic(() => import('./Footer'), { ssr: false })

const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const [session] = useSession();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [navHeight, setNavHeight] = useState();
  const { pathname } = useRouter();
  const closeSidebar = () => setOpenSidebar(false);
  const toggleSidebar = () => setOpenSidebar(!openSidebar);

  useEffect(() => {
    switch (pathname) {
      case '/':
        document.body.style.overflowX = 'hidden';
        document.body.style.overflowY = 'visible';
        break;
      case '/upload':
        document.body.style.overflow = 'hidden';
        break;
      case '/auth/signin':
        document.body.style.overflow = 'hidden';
        break;
      default:
        break;
    }
  }, [pathname]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <style jsx global>
        {`
          html,
          body {
            background: ${theme.background};
            color: ${theme.fontColor};
            transition: color 0.3s ease-out 0s, background 0.3s ease-out 0s;
          }
        `}
      </style>

      <Navigation
        theme={theme}
        toggleTheme={toggleTheme}
        toggleSidebar={toggleSidebar}
        sidebarOpen={openSidebar}
        setNavHeight={setNavHeight}
      />

      <Container fluid className='p-0' id='layout' >
        {!session && pathname === '/' && <BackgoundVideo src="/video/bg.mp4" height={100} withOverlay />}

        {session && (
          <Sidebar
            openSidebar={openSidebar}
            closeSidebar={closeSidebar}
            navHeight={navHeight}
          />
        )}

        <Container style={{ marginTop: '8rem' }} fluid>
          {children}
        </Container>

      </Container>

      {!session && pathname === '/' && <Footer />}
    </>
  );
};

export default Layout;




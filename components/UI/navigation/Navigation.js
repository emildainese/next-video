import { useRef, useEffect, useState } from 'react';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import classes from './Navigation.module.scss';
import { useSession, signOut } from 'next-auth/client';
import { useMediaQuery } from '@/hooks/UseMediaQuery';
import { BREAKPOINT_MD } from '@/constants/breakpoint';
import ProfilePic from './ProfilePic';
import { useRouter } from 'next/router';

const Navigation = ({
  theme,
  toggleTheme,
  toggleSidebar,
  sidebarOpen,
  setNavHeight,
}) => {
  const collapseRef = useRef(null);
  const togglerRef = useRef(null);
  const navbarTogglerRef = useRef(null);
  const navRef = useRef(null);

  const [imgSrc, setImageSrc] = useState();
  const router = useRouter();
  const { pathname } = router;
  const md = useMediaQuery(BREAKPOINT_MD);
  const [session] = useSession();

  useEffect(() => {
    if (session) {
      setImageSrc('/users/' + session.user.image);
    }
  }, [session]);

  useEffect(() => {
    if (collapseRef.current.classList.contains('show')) {
      navbarTogglerRef.current.click();
    }
    if (sidebarOpen) {
      toggleSidebar();
    }
  }, [md]);

  useEffect(() => {
    setNavHeight(navRef.current.clientHeight);
  }, []);

  const setNavToggleClass = () =>
    pathname !== '/auth/signin' && session && classes.navbarToggler;

  const logOut = async () => {
    await signOut({
      redirect: false,
      callbackUrl: null,
    });
    localStorage.removeItem('firstRender');
    router.push('/');
  };

  return (
    <Navbar
      bg={theme.type}
      variant={theme.type}
      expand="lg"
      className={`fixed-top m-0 shadow-sm`}
      ref={navRef}
    >
      {session && (
        <span
          ref={togglerRef}
          onClick={toggleSidebar}
          style={{ cursor: 'pointer', marginLeft: '2rem' }}
          className={classes.sidebarToggle}
        >
          <i className="fas fa-bars text-primary fa-2x"></i>
        </span>
      )}
      <div className="container">
        <Link href="/">
          <a className="navbar-brand ml-3">
            <i className="fas fa-film text-primary"></i> NextVideo
          </a>
        </Link>
        <Navbar.Toggle className={setNavToggleClass()} ref={navbarTogglerRef} />
        <Navbar.Collapse ref={collapseRef}>
          <div className={`mx-0 mx-lg-auto mt-lg-0 mt-3 ${classes.search}`}>
            <Form className="d-flex">
              <FormControl
                type="text"
                placeholder="Search"
                className={`${classes.searchInput}`}
              />
              <Button type="button" className="d-lg-block d-none">
                <i className="fas fa-search"></i>
              </Button>
            </Form>
          </div>
          <Nav>
            {session ? (
              <>
                <Link href="/">
                  <a className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
                    <i className="fas fa-home text-primary"></i> Home
                  </a>
                </Link>
                <Link href="/upload">
                  <a
                    className={`nav-link ${
                      pathname === '/upload' ? 'active' : ''
                    }`}
                  >
                    <i className="fas fa-upload text-primary"></i> Upload
                  </a>
                </Link>
                <span
                  onClick={logOut}
                  className="nav-link"
                  style={{ cursor: 'pointer' }}
                >
                  <i className="fas fa-power-off text-primary"></i> Logout
                </span>
              </>
            ) : (
              <Link href="/auth/signin">
                <a
                  className={`nav-link ${
                    pathname === '/auth/signin' ? 'active' : ''
                  }`}
                >
                  <i className="fas fa-sign-in-alt text-primary"></i> Login
                </a>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <Row className={`mx-3 ${classes.sideRow}`}>
          {session && (
            <Col className="center">
              <ProfilePic src={imgSrc} />
            </Col>
          )}
          <Col className="center">
            <ThemeToggle onChange={toggleTheme} />
          </Col>
        </Row>
      </div>
    </Navbar>
  );
};

export default Navigation;

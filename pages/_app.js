import { Provider as NextAuthProvider } from 'next-auth/client';
import { Provider as ReduxProvider } from 'react-redux';
import ThemeProvider from '../context/ThemeContext';
import { useRouter } from 'next/router';
import { useStore } from '../store';
import { AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toggle/style.css';
import '../styles/index.scss';
import Layout from '../components/layout/Layout';

function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 });
  }
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const store = useStore(pageProps.initialReduxState);

  return (
    <ReduxProvider store={store}>
      <NextAuthProvider
        options={{
          clientMaxAge: 0,
          keepAlive: 0,
        }}
        session={pageProps.session}
      >
        <ThemeProvider>
          <Layout>
            <AnimatePresence
              exitBeforeEnter
              onExitComplete={handleExitComplete}
            >
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </Layout>
        </ThemeProvider>
      </NextAuthProvider>
    </ReduxProvider>
  );
}

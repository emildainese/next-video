import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useErrorAlert } from '@/hooks/UseErrorAlert';

const ActivationPage = () => {
  const {
    query: { token },
    push,
  } = useRouter();

  const [error, setError] = useErrorAlert(3000);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const activateAccount = async () => {
      setLoading(true);
      if (!token) return;
      const res = await fetch('/api/user/account/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'aplication/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.error || !data.activate) {
        setLoading(false);
        setError(data.error);
      } else {
        setLoading(false);
        push('/auth/signin');
      }
    };

    activateAccount();
  }, [token]);

  return (
    <Container className="mt-5 position-relative">
      <h1>Your account is beeing activated...</h1>
      {loading && (
        <div className="text-center">
          <Spinner animation="grow" variant="primary" />
        </div>
      )}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default ActivationPage;

import Link from 'next/link';
import { Container } from 'react-bootstrap';
import Jumbotron from '@/components/UI/Jumbotron';
import Separator from '@/components/UI/Separator';
import { useRouter } from 'next/router';

const ActivateAccount = () => {
  const {
    query: { email },
  } = useRouter();

  return (
    <Container style={{ height: 'calc(100vh - 15rem)' }} className="center">
      <Jumbotron
        title="Activate your account"
        body={`Please click the activation link we've sent to: ${email}`}
      >
        <Separator />
        <JumbotronFooter />
      </Jumbotron>
    </Container>
  );
};

export default ActivateAccount;

const JumbotronFooter = () => (
  <>
    <small>Didn't get the email ? Please check your spam folder.</small>
    <br />
    <small>
      {/* Wrong email address ? <Link href="/auth/activate/edit">Change it.</Link> */}
    </small>
  </>
);

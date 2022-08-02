import { useState, Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { getCsrfToken, getProviders, signIn } from 'next-auth/client';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useTheme } from '@/context/ThemeContext';
import Input from '@/components/UI/inputs/Input';
import ImageCrop from '@/components/UI/images/ImageCrop';
import FileInput from '@/components/UI/inputs/FileInput';
import MyModal from '@/components/UI/modal/BaseModal';
import { EXPIRE_ALERT_TIME_S } from '@/constants/time';
import { useImageUpload } from '@/hooks/UseImageUpload';
import { useErrorAlert } from '@/hooks/UseErrorAlert';
import ToggleSwitch from '@/components/UI/inputs/ToggleSwitch';
import Header from '@/components/UI/Header';

const SignIn = ({ providers, csrfToken }) => {
  const [registerMode, setRegisterMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [croppedImg, setCroppedImg] = useState();
  const [croppedPreview, setCroppedPreview] = useState(null);
  const [showGrid, setShowGrid] = useState(false);

  const [error, setError] = useErrorAlert(EXPIRE_ALERT_TIME_S);
  const router = useRouter();
  const { theme } = useTheme();

  const { imageFile, imageSrc, imageName, fileError, changeHandler } =
    useImageUpload(setShowModal);

  const toggleForm = () => {
    setRegisterMode(!registerMode);
  };

  const checkout = (result) => {
    if (!result.error && result.ok) {
      router.push('/');
    } else {
      setError(result.error);
    }
  };

  const submitCredentialHandler = async (fields) => {
    if (registerMode) {
      const formData = new FormData();

      formData.append('profilePic', croppedImg ? croppedImg : imageFile);
      for (let key in fields) {
        if (key === 'confirmPassword' || key === 'acceptTerms') continue;
        formData.append(key, fields[key]);
      }

      const res = await fetch('/api/user/register', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && !data.error) {
        router.push({
          pathname: '/auth/activate',
          query: { email: data.user.email },
        });
      } else {
        setError(`${res.statusText} - ${data.error}`);
      }
    } else {
      const result = await signIn('credentials', {
        redirect: false,
        callbackUrl: null,
        username: fields.username,
        email: fields.email,
        password: fields.password,
      });
      checkout(result);
    }
  };

  return (
    <Container className="p-3" style={signInStyle}>
      {registerMode && croppedPreview && !showModal && (
        <Row>
          <Col md={9}>
            <Header text="Register" icon="fa-user" />
          </Col>
          <Col md={3} className="p-0">
            <Header text="Preview" icon="fa-portrait" />
          </Col>
        </Row>
      )}
      <Row>
        <Col md={9} className={`mb-2 mb-md-0 mx-auto`}>
          {registerMode && !croppedPreview && !showModal && (
            <Header text="Register" icon="fa-user" />
          )}
          {!registerMode && <Header text="Login" icon="fa-sign-in-alt" />}
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          <Formik
            enableReinitialize={true}
            initialValues={toggleState(registerMode)}
            validationSchema={Yup.object().shape(
              toggleValidators(registerMode)
            )}
            onSubmit={async (fields, { setSubmitting }) => {
              try {
                await submitCredentialHandler(fields);
                setSubmitting(false);
              } catch (err) {
                console.log(err);
              }
            }}
          >
            {({
              isSubmitting,
              dirty,
              isValid,
              handleSubmit,
              getFieldProps,
              setFieldValue,
              resetForm,
            }) => (
              <Form
                className={`shadow p-5 bg-${theme.type}`}
                onSubmit={handleSubmit}
              >
                {csrfToken && (
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                )}
                {registerMode && (
                  <Fragment>
                    <FileInput
                      setFieldValue={setFieldValue}
                      onChange={changeHandler}
                      label="Profile Picture"
                      error={fileError}
                      component={FileInput}
                    />

                    {!fileError && (
                      <MyModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        title="Crop your profile image"
                      >
                        <Row>
                          <Col>
                            <ToggleSwitch
                              label="Show grid"
                              onChange={(e) => setShowGrid(e.target.checked)}
                            />
                          </Col>
                        </Row>
                        <ImageCrop
                          imageSrc={imageSrc}
                          showGrid={showGrid}
                          imageName={imageName}
                          imageType={imageFile ? imageFile.type : 'image/jpeg'}
                          croppedImg={croppedImg}
                          croppedPreview={croppedPreview}
                          setCroppedImg={setCroppedImg}
                          setCroppedPreview={setCroppedPreview}
                        />
                      </MyModal>
                    )}
                  </Fragment>
                )}
                {registerMode && (
                  <Row>
                    <Col>
                      <Field
                        type="text"
                        label="First Name"
                        name="firstName"
                        placeholder="Enter First Name"
                        component={Input}
                        required
                      />
                    </Col>
                    <Col>
                      <Field
                        type="text"
                        label="Last Name"
                        name="lastName"
                        placeholder="Enter Last Name"
                        component={Input}
                        required
                      />
                    </Col>
                  </Row>
                )}
                <Field
                  type="text"
                  label="Username"
                  name="username"
                  placeholder="Enter username"
                  className={`${registerMode && 'mt-3'}`}
                  component={Input}
                  required
                />
                {registerMode && (
                  <Field
                    type="email"
                    name="email"
                    label="Email"
                    className="mt-3"
                    placeholder="Enter Email"
                    component={Input}
                    required
                  />
                )}
                <Row>
                  <Col>
                    <Field
                      type="password"
                      name="password"
                      label="Password"
                      className="mt-3"
                      placeholder="Enter Password"
                      component={Input}
                      required
                    />
                  </Col>
                  {registerMode && (
                    <Col>
                      <Field
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        className="mt-3"
                        placeholder="Enter Confirm Password"
                        component={Input}
                        required
                      />
                    </Col>
                  )}
                </Row>
                {!registerMode ? (
                  <Form.Group className="mt-3">
                    <Link href="/auth/forgot">Forgot password ?</Link>
                  </Form.Group>
                ) : (
                  <Form.Group className="mt-3 d-flex">
                    <Form.Check
                      type="checkbox"
                      {...getFieldProps('acceptTerms')}
                      required
                    />
                    <Form.Label>
                      I accept the{' '}
                      <span className="text-primary">Term of Use</span> and{' '}
                      <span className="text-primary">Privacy Policy</span>
                    </Form.Label>
                  </Form.Group>
                )}
                <Button
                  type="submit"
                  className="my-3 w-100"
                  disabled={!(isValid && dirty) || isSubmitting}
                >
                  {registerMode ? 'Signup' : 'Signin'}
                </Button>
                <FormFooter
                  registerMode={registerMode}
                  toggleForm={toggleForm}
                  resetForm={resetForm}
                  setCroppedPreview={setCroppedPreview}
                />
              </Form>
            )}
          </Formik>
        </Col>
        {croppedPreview && !showModal && (
          <Col
            className={`mb-2 bg-${theme.type} d-flex align-items-center justify-content-center`}
            md={3}
            style={{ maxHeight: '250px' }}
          >
            <img
              className="rounded-circle"
              alt="Cropped Preview"
              width={180}
              height={180}
              style={{
                objectFit: 'cover',
                maxWidth: '100%',
              }}
              src={croppedPreview}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

const signInStyle = {
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
};

export default SignIn;

export async function getServerSideProps(context) {
  const [providers, csrfToken] = await Promise.all([
    getProviders(),
    getCsrfToken(),
  ]);

  const data = {
    providers,
    csrfToken,
  };

  return {
    props: {
      ...JSON.parse(JSON.stringify(data)),
    },
  };
}

const toggleState = (registerMode) =>
  registerMode
    ? {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    }
    : {
      username: '',
      password: '',
    };

const toggleValidators = (registerMode) => {
  return registerMode
    ? {
      firstName: Yup.string()
        .min(2, 'Must be at least 2 characters length')
        .max(15, 'Must be 15 characters or less')
        .required('First Name is required'),
      lastName: Yup.string()
        .min(2, 'Must be at least 2 characters length')
        .max(20, 'Must be 20 characters or less')
        .required('Last Name is required'),
      username: Yup.string()
        .min(3, 'Must be at least 3 characters length')
        .max(20, 'Must be 20 characters or less')
        .required('Username is required'),
      email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        // .matches(
        //   /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,15}$/,
        //   'Password must contain at leat 1 digit, 1 uppercase letter and a special character'
        // )
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      acceptTerms: Yup.bool().oneOf(
        [true],
        'Accept Term of Use and Privacy Policy is required'
      ),
    }
    : {
      username: Yup.string()
        .min(3, 'Must be at least 3 characters length')
        .max(20, 'Must be 20 characters or less')
        .required('Username is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    };
};

const FormFooter = ({
  registerMode,
  resetForm,
  toggleForm,
  setCroppedPreview,
}) => {
  return (
    <small>
      {!registerMode ? (
        <Fragment>
          Not a member ?
          <span
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => {
              resetForm();
              toggleForm();
              setCroppedPreview(null);
            }}
            className="text-primary ms-1"
          >
            Register here.
          </span>
        </Fragment>
      ) : (
        <Fragment>
          Have already an account ?
          <span
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => {
              resetForm();
              toggleForm();
              setCroppedPreview(null);
            }}
            className="text-primary ms-1"
          >
            Loging here.
          </span>
        </Fragment>
      )}
    </small>
  );
};

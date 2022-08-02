const removeSpace = (str) => {
  return str.replace(/\s+/g, '');
};

const stripTags = (str) => {
  return str.replace(/(<([^>]+)>)/gi, '');
};

const sanitizeMap = (...args) => {
  return args.map((str) => removeSpace(stripTags(str)));
};

export const sanitize = (keys, ...values) => {
  return values.reduce((acc, curr, idx) => {
    return { ...acc, [keys[idx]]: removeSpace(stripTags(curr)) };
  }, {});
};

export const validate = (registerMode, fields, setErrorMsg) => {
  const errors = [];

  if (registerMode) {
    if (fields.firstName.length === 0) {
      errors.push({
        field: 'firstName',
        message: 'First name can not be empty',
      });
    }

    if (fields.lastName.length === 0) {
      errors.push({
        field: 'lastName',
        message: 'Last name can not be empty',
      });
    }

    if (fields.username.length === 0) {
      errors.push({
        field: 'username',
        message: 'Username can not be empty',
      });
    }

    const emailRgex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRgex.test(fields.email)) {
      errors.push({
        field: 'email',
        message: 'Invalid email entered',
      });
    }

    if (fields.confirmPassword !== fields.password) {
      errors.push({
        field: 'confirmPassword',
        message: 'Password does not match',
      });
    }

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,15}$/;

    if (!passwordRegex.test(fields.password)) {
      errors.push({
        field: 'password',
        message:
          'Password must contain at leat 1 digit, 1 uppercase letter and a special character',
      });
    }
  } else {
    if (fields.username.trim().length == 0) {
      return setErrorMsg('Username can not be empty.');
    }

    if (fields.password.trim().length == 0) {
      return setErrorMsg('Password can not be empty.');
    }

    if (fields.password.trim().length < 6) {
      return setErrorMsg('Password must be at least 6 characters length.');
    }
  }
};

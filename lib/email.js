'use strict';

import nodemailer from 'nodemailer';
const nodemailerSendgrid = require('nodemailer-sendgrid');

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY,
    })
  );

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  try {
    await transporter.sendMail(message);
  } catch (err) {
    if (err.response && err.response.body && err.response.body.errors) {
      err.response.body.errors.forEach((error) =>
        console.log('%s: %s', error.field, error.message)
      );
      throw new Error(err.response.body.errors[0]);
    } else {
      console.log(err);
      throw new Error(err);
    }
  }
};

export const activationMessage = (username, activationUrl) => `
  <h2>Just one more step...</h2>
  <p>${username}</p>
  <p>
    Please click the buttom below to verify your email and activate your account.
  </p>
  <p>
    <button>
      <a href="${activationUrl}">Activate</a>
    </button>
  </p>`;

export const resetPasswordMessage = (username, resetUrl) => `
  <h2>Just one more step...</h2>
  <p>${username}</p>
  <p>
    Please click the buttom below to reset your account password.
  </p>
  <p>
    <button>
      <a href="${resetUrl}">Reset Password</a>
    </button>
  </p>`;

export const forgotPasswordMessage = (username, forgotUrl) => `
  <h2>Just one more step...</h2>
  <p>${username}</p>
  <p>
    Please click the buttom below to verify your email and reset your account password.
  </p>
  <p>
    <button>
      <a href="${forgotUrl}">Reset Password</a>
    </button>
  </p>`;

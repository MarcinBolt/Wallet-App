import Notiflix from 'notiflix';

const notifyUserEmailSenTSuccess = email => {
  Notiflix.Report.success('Verification email sent!', `Check: ${email} Inbox.`, 'OK!');
};

const notifyUserEmailResenTSuccess = email => {
  Notiflix.Report.success('Verification email sent agin!', `Check: ${email} Inbox.`, 'OK!');
};

const notifyUserEmailSenTFailure = message => {
  Notiflix.Report.failure(
    'Sending the verification email failed.',
    `Message: ${message}.`,
    'Try again',
  );
};

const notifyUserEmailVerifiedSuccess = firstName => {
  Notiflix.Report.success(
    `Hi, ${firstName}! Email is verified!`,
    'Now You have an account in Wallet App.',
    'Have fun!',
  );
};

const notifyUserProcessTSuccess = message => {
  Notiflix.Report.success('Success!', `Message: ${message} `, 'OK!');
};

const notifyUserRegistrationFailure = message => {
  Notiflix.Report.failure('Registration fail!ed.', `Message: ${message}.`, 'Try again');
};

const notifyUserEmailVerifiedFailure = message => {
  Notiflix.Report.failure('Verification fail!ed.', `Message: ${message}.`, 'Try again');
};

const notifyProcessFailure = message => {
  Notiflix.Report.failure('Something goes wrong.', `Message: ${message}.`, 'Try again');
};

const notification = {
  notifyUserEmailSenTSuccess,
  notifyUserEmailResenTSuccess,
  notifyUserEmailSenTFailure,
  notifyUserEmailVerifiedSuccess,
  notifyUserProcessTSuccess,
  notifyUserRegistrationFailure,
  notifyUserEmailVerifiedFailure,
  notifyProcessFailure,
};

export default notification;

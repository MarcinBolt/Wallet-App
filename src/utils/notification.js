import Notiflix from 'notiflix';

const notifyUserEmailSenTSuccess = email => {
  Notiflix.Report.success('Verification email sent!', `Check:${email} Inbox.`, 'OK!');
};

const notifyUserEmailSenTFailure = message => {
  Notiflix.Report.failure(
    'Sending the verification email failed.',
    `Message from server: ${message}.`,
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

const notifyUserEmailVerifiedFailure = message => {
  Notiflix.Report.failure('Registration Fail!ed.', `Message from server: ${message}.`, 'Try again');
};

const notifyLoginFailure = message => {
  Notiflix.Report.failure('Something goes wrong.', `Message from server: ${message}.`, 'Try again');
};
const notifyLogoutFailure = message => {
  Notiflix.Report.failure('Something goes wrong.', `Message from server: ${message}.`);
};

const notification = {
  notifyUserEmailSenTSuccess,
  notifyUserEmailSenTFailure,
  notifyUserEmailVerifiedSuccess,
  notifyUserEmailVerifiedFailure,
  notifyLoginFailure,
  notifyLogoutFailure,
};

export default notification;

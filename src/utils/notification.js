import Notiflix from 'notiflix';

const notifyUserEmailSenTSuccess = (email) => {
  Notiflix.Report.success(
    'Registration Success!',
    'Now You have to verify your email:',
    `${email}`,
    'Please, check verification link!',
  );
};

const notifyUserEmailSenTFailure = () => {
  Notiflix.Report.failure(
    'Sending the verification email failed.',
    'Is your email address valid?',
    'Try again',
  );
};

const notifyUserEmailVerifiedSuccess = () => {
  Notiflix.Report.success(
    'Verification success!',
    'Now You have an account in Wallet App.',
    'Have fun!',
  );
};

const notifyUserEmailVerifiedFailure = () => {
  Notiflix.Report.failure(
    'Registration Fail!ed.',
    'This Email could already exist or too short Username / e-mail / password.',
    'Try again',
  );
};

const notifyLoginFailure = () => {
  Notiflix.Report.failure(
    'Something goes wrong.',
    'Do You have an account? Check if Username and Password are correct. Please try again or contact our service.',
    'Try again',
  );
};

const notification = {
  notifyUserEmailSenTSuccess,
  notifyUserEmailSenTFailure,
  notifyUserEmailVerifiedSuccess,
  notifyUserEmailVerifiedFailure,
  notifyLoginFailure,
};

export default notification;

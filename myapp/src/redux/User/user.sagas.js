import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  signInWithEmailAndPassword,
  handleUserProfile,
  getCurrentUser,
  CreateUserWithEmailAndPassword,
  signInWithGooglePopup,
  auth,
} from "../../firebase/utils";
import userTypes from "./user.types";
import { signInSuccess, signOutUserSuccess,resetPasswordSuccess, userError} from "./user.actions";
import { getDoc } from "firebase/firestore";
import { handleResetPasswordAPI } from "./user.helpers";

export function* getSnapshotFromUserAuth(user, additionalData={}) {
  try {
    const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
    const snapshot = yield call(getDoc, userRef);
    const userData = {
      id: snapshot.id,
      ...snapshot.data(),
      createdDate: snapshot.data().createdDate?.toDate() || null,
    };
    yield put(signInSuccess(userData));
  } catch (err) {
    //console.log(err)
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    console.error("Error signing in:", err);
    alert("Failed to sign in. Please check your credentials and try again.");
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) {
      return;
    }
    yield getSnapshotFromUserAuth(userAuth);
  } catch (err) {
    //console.log(err)
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* SignOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (err) {
    //console.log(err);
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, SignOutUser);
}

export function* signUpUser({payload : {
  displayName,
  email,
  password,
  confirmPassword
}}) {
  if (password !== confirmPassword) {
    const err = ['Password Don\'t match']
    yield put(
      userError(err)
    )
    return;
  }

  try {
    const { user } = yield CreateUserWithEmailAndPassword(
      email,
      password
    );
    const additionalData =  { displayName }
    yield getSnapshotFromUserAuth(user, additionalData)

  } catch (err) {
    console.log(err);
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* resetPassword({payload : {email}}) {
  try {
   yield call(handleResetPasswordAPI, email)
    yield put(
      resetPasswordSuccess()
    )

  } catch (err) {
    yield put(
      userError(err)
    )
  }
}

export function* onResetPasswordStart () {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword)
}

export function* googleSignIn () {
  try{
    const {user} = yield call(signInWithGooglePopup());
    yield getSnapshotFromUserAuth(user);
  }catch(err) {
    console.log(err)
  }
}

export function* onGoogleSignInStart () {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
  ]);
}

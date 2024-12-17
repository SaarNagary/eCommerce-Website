import { sendPasswordResetEmail } from "../../firebase/utils";

export const handleResetPasswordAPI = (email) =>{
    /*if (!email || !/\S+@\S+\.\S+/.test(email)) {
    dispatch({
      type: userTypes.RESET_PASSWORD_ERROR,
      payload: ['Please enter a valid email address.']
    });
    return;
  }*/

  const config = {
    url: "http://localhost:5173/login", // עדכן ל-URL הנכון שלך
  };

  return new Promise((resolve, reject) =>{
     sendPasswordResetEmail(email, config)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        const err = ['Email not found, please try again'];
        reject(err);
      });
  })
}
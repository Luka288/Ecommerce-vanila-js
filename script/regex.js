export const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

export const lastNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{1,40}$/;

export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,128}$)/;

export const phoneRegex = /^((\+)33|0)[1-9](\d{2}){4}$/;

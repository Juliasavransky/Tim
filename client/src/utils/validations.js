export const isEmpty = value => value.trim() === "";

export const isNotSixChars = value => value.trim().length < 6;

export const isEmail = value => value.includes('@');


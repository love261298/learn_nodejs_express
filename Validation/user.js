import Joi from "joi";

export const signUpValidator = Joi.object({
  phone: Joi.string()
    .pattern(/^0(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])\d{7}$/)
    .messages({
      "string.pattern.base": "Số điện thoại không hợp lệ.",
      "string.empty": "Số điện thoại không được để trống.",
    }),
  name: Joi.string().required().min(3).max(255).messages({
    "string.empty": "Tên người dùng không được để trống.",
    "any.required": "Tên người dùng là bắt buộc.",
    "string.min": "Tên người dùng phải có ít nhất {#limit} ký tự.",
    "string.max": "Tên người dùng phải có ít hơn {#limit + 1} ký tự.",
  }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.empty": "Mật khẩu không được để trống.",
    "any.required": "Mật khẩu là bắt buộc.",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự.",
    "string.max": "Mật khẩu phải có ít hơn {#limit + 1} ký tự.",
  }),
  confirmPassword: Joi.string()
    .required()
    .min(6)
    .max(255)
    .valid(Joi.ref("password"))
    .messages({
      "string.empty": "Xác nhận mật khẩu không được để trống.",
      "any.required": "Xác nhận mật khẩu là bắt buộc.",
      "string.min": "Xác nhận mật khẩu phải có ít nhất {#limit} ký tự.",
      "string.max": "Xác nhận mật khẩu phải có ít hơn {#limit + 1} ký tự.",
      "any.only": "Xác nhận mật khẩu không khớp với mật khẩu.",
    }),
});

export const signInValidator = Joi.object({
  phone: Joi.string()
    .pattern(/^0(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])\d{7}$/)
    .messages({
      "string.pattern.base": "Số điện thoại không hợp lệ.",
      "string.empty": "Số điện thoại không được để trống.",
    }),
  password: Joi.string().required().min(6).max(255).messages({
    "string.empty": "Mật khẩu không được để trống.",
    "any.required": "Mật khẩu là bắt buộc.",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự.",
    "string.max": "Mật khẩu phải có ít hơn {#limit + 1} ký tự.",
  }),
});

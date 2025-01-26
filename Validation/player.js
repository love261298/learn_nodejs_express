import Joi from "joi";

export const signUpValidator = Joi.object({
    phone: Joi.string()
    .pattern(/^0(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])\d{7}$/)
    .messages({
      'string.pattern.base': 'So dien thoai khong hop le',
      'string.empty': 'Số điện thoại không được để trống.',
    }),
    name: Joi.string().required().min(3).max(255).messages({
        'string.empty' : 'userName khong duoc de trong',
        'any.required' : 'userName la bat buoc',
        'string.min' : 'userName phai co it nhat {#limit} ky tu',
        'string.max' : 'userName phai co it hon {#limit + 1} ky tu'
    }),
    password: Joi.string().required().min(6).max(255).messages({
        'string.empty' : 'password khong duoc de trong',
        'any.required' : 'password la bat buoc',
        'string.min' : 'password phai co it nhat {#limit} ky tu',
        'string.max' : 'password phai co it hon {#limit + 1} ky tu'
    }),
    confirmPassword: Joi.string().required().min(6).max(255).valid(Joi.ref('password')).messages({
        'string.empty' : 'confirmPassword khong duoc de trong',
        'any.required' : 'confirmPassword la bat buoc',
        'string.min' : 'confirmPassword phai co it nhat {#limit} ky tu',
        'string.max' : 'confirmPassword phai co it hon {#limit + 1} ky tu',
        'any.only' : 'confirmPassword khong khop voi password'
    })
})

export const signInValidator = Joi.object({
    phone: Joi.string()
    .pattern(/^0(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-4|6-9])\d{7}$/)
    .messages({
      'string.pattern.base': 'So dien thoai khong hop le',
      'string.empty': 'Số điện thoại không được để trống.',
    }),
    password: Joi.string().required().min(6).max(255).messages({
        'string.empty' : 'password khong duoc de trong',
        'any.required' : 'password la bat buoc',
        'string.min' : 'password phai co it nhat {#limit} ky tu',
        'string.max' : 'password phai co it hon {#limit + 1} ky tu'
    })
})
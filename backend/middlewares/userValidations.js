import { body } from "express-validator";


export const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("Please, provide Name")
            .isLength({ min: 3 })
            .withMessage("The name Must be more 3 letters"),
        body("email")
            .isString()
            .withMessage("Please, provide Email")
            .isEmail()
            .withMessage("Email required"),
        body("password")
            .isString()
            .withMessage("Password Required")
            .isLength({ min: 5 })
            .withMessage("The password Must be more 5 letters"),
        body("confirmpassword")
            .isString()
            .withMessage("Please, confirm Password")
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("The password is not the same")
                };
                return true;
            })

    ]
};

export const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("Please, provide Email")
            .isEmail()
            .withMessage("Email required"),
        body("password")
            .isString()
            .withMessage("Password Required")
    ]
}

export const userUpdateValidation = () => {
    return [
        body("name")
            .optional()
            .isLength({ min: 3 })
            .withMessage("The name Must be more 3 letters"),
        body("password")
            .optional()
            .isLength({ min: 5 })
            .withMessage("The password Must be more 5 letters"),
    ]
}

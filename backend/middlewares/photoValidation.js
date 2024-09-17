import { body } from "express-validator";

export const photoIsertValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("Please, Provide Image Title")
            .isString()
            .withMessage("Please, Provide Image Title")
            .isLength({ min: 3 })
            .withMessage("the title must be more 3 letters"),
        body("image").custom((value, { req }) => {
            if (!req.file) {
                throw new Error("Please, provide Photo")
            }
            return true;
        })

    ]
};

export const photoUpdateValidate = () => {
    return [
        body("title")
            .optional()
            .isString()
            .withMessage("Please, Provide Title")
            .isLength({ min: 3 })
            .withMessage("the title must be more 3 letters"),
    ]
};

export const commentValidation = () => {
    return[
        body("comment").isString().withMessage("Add coment!")
    ]
}
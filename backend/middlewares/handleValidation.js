import { validationResult } from "express-validator";

export const validate = (req,res,next) => {

    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next()
    };

    let extractedErrors = [];
    errors.array().map((err) => extractedErrors.push(err.msg));

    return res.status(422).json({
        errors:extractedErrors
    });
};

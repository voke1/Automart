import { body, validationResult } from 'express-validator';

const validateEmail = [
  body('email')
    .exists()
    .isEmail()
    .isLength({ min: 1, max: 50 })
    .withMessage('email should not be empty and should include @')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: 'email should not be empty and should include @',
      });
    }
    next();
  },
];

export default validateEmail;

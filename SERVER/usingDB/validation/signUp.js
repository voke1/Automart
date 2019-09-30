import { body, validationResult } from 'express-validator';

const validateSignUp = [
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
  body('password')
    .exists()
    .isLength({ min: 5, max: 50 })
    .withMessage('password should not be empty, should be more than five and less than 50 character')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: 'password should not be empty, should be more than five and less than 50 character',
      });
    }
    next();
  },
  body('first_name')
    .exists()
    .isLength({ min: 2, max: 50 })
    .withMessage('password should not be empty, should be more than five and less than 50 character')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: 'password should not be empty, should be more than five and less than 50 character',
      });
    }
    next();
  },
  body('last_name')
    .exists()
    .isLength({ min: 2, max: 50 })
    .withMessage('password should not be empty, should be more than five and less than 50 character')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: 'password should not be empty, should be more than five and less than 50 character',
      });
    }
    next();
  },
];

export default validateSignUp;

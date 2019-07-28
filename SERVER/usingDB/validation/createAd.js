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
  body('price')
    .exists()
    .isLength({ min: 5, max: 50 })
    .withMessage('price should not be empty, should be more than five and less than 50 character')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: 'price should not be empty, should be more than five and less than 50 character',
      });
    }
    next();
  },
  body('state')
    .exists()
    .isIn(['new', 'used'])
    .withMessage('state should not be empty, should be more than five and less than 50 character')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: 'state should not be empty, should be more than five and less than 50 character',
      });
    }
    next();
  },
  body('status')
    .exists()
    .isLength({ min: 2, max: 50 })
    .isIn(['sold', 'available'])
    .withMessage('status should not be empty, should be more than five and less than 50 character')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: 'status should not be empty, should be more than five and less than 50 character',
      });
    }
    next();
  },
  body('manufacturer')
    .exists()
    .isLength({ min: 2, max: 50 })
    .withMessage('manufacturer should not be empty, should be more than two and less than 50 character')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: 'manufacturer should not be empty, should be more than two and less than 50 character',
      });
    }
    next();
  },
  body('model')
    .exists()
    .isLength({ min: 2, max: 50 })
    .withMessage('model should not be empty, should be more than two and less than 50 character')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: 'model should not be empty, should be more than two and less than 50 character',
      });
    }
    next();
  },
];

export default validateSignUp;

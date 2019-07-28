import { body, validationResult } from 'express-validator';

const validateSignUp = [
  body('price_offered')
    .exists()
    .isLength({ min: 1, max: 50 })
    .withMessage('price_offered should not be empty and should include @')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: 'price_offered should not be empty and should include @',
      });
    }
    next();
  },
  body('status')
    .exists()
    .isLength({ min: 5, max: 50 })
    .isIn(['pending', 'accepted', 'rejected'])
    .withMessage('status should not be empty, should be more than five and less than 50 character')
    .trim(),
  (req, res, next) => {
    const errorValidation = validationResult(req);
    if (!errorValidation.isEmpty()) {
      return res.status(422).json({
        status: 422,
        error: 'description should not be empty, should be more than five and less than 50 character',
      });
    }
    next();
  },
];

export default validateSignUp;

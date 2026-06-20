import Joi from 'joi';

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const messages = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        error: {
          status: 400,
          message: 'Validation error',
          details: messages
        }
      });
    }

    req.validatedBody = value;
    next();
  };
};

export default validateRequest;

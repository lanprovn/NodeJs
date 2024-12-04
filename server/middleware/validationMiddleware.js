import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

//Job
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this route");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid job type"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError("invalid MongoDB id");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw UnauthorizedError("not authorized to access this route");
  }),
]);

/****************/
//RegisterUser
// export const validateRegisterInput = withValidationErrors([
//   // body("name").notEmpty().withMessage("name is required"),
//   body("email")
//     .notEmpty()
//     .withMessage("email is required")
//     .isEmail()
//     .withMessage("invalid email format")
//     .custom(async (email) => {
//       const user = await User.findOne({ email });
//       if (user) {
//         throw new BadRequestError("email already exists");
//       }
//     }),
//   body("password")
//     .notEmpty()
//     .withMessage("password is required")
//     .isLength({ min: 8 })
//     .withMessage("password must be at least 8 characters long"),
//   body("location").notEmpty().withMessage("location is required"),
//   body("lastName").notEmpty().withMessage("last name is required"),
// ]);

// export const validateRegisterInput = async (req, res, next) => {
//   try {
//     const { Name, email, password, location} = req.body;

//     // Kiểm tra email
//     if(!Name)
//     {
//       return next(new BadRequestError("name is required"));
//     }
//     if (!email) {
//       return next(new BadRequestError("email is required"));
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return next(new BadRequestError("invalid email format"));
//     }
//     const user = await User.findOne({ email });
//     if (user) {
//       return next(new BadRequestError("email already exists"));
//     }

//     // Kiểm tra mật khẩu
//     if (!password) {
//       return next(new BadRequestError("password is required"));
//     }
//     if (password.length < 8) {
//       return next(
//         new BadRequestError("password must be at least 8 characters long")
//       );
//     }

//     // Kiểm tra location
//     if (!location) {
//       return next(new BadRequestError("location is required"));
//     }
//     // Nếu tất cả dữ liệu hợp lệ, tiếp tục xử lý
//     next();
//   } catch (error) {
//     // Xử lý các lỗi bất đồng bộ khác
//     next(error);
//   }
// };

export const validateRegisterInput = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").notEmpty().withMessage("email is required"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Lấy lỗi đầu tiên
      const firstError = errors.array()[0];
      return next(new BadRequestError(firstError.msg));
    }
    next();
  },
];

//Login
export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);



export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("email already exists");
      }
    }),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("location").notEmpty().withMessage("location is required"),
]);
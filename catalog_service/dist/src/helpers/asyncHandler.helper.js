'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(error => next(error));
    };
};
exports.default = asyncHandler;
//# sourceMappingURL=asyncHandler.helper.js.map
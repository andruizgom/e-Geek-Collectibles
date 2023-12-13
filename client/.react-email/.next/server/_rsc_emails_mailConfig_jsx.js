"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_rsc_emails_mailConfig_jsx";
exports.ids = ["_rsc_emails_mailConfig_jsx"];
exports.modules = {

/***/ "(rsc)/./emails/mailConfig.jsx":
/*!*******************************!*\
  !*** ./emails/mailConfig.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _src_emails_mailConfig_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/emails/mailConfig.jsx */ \"(rsc)/../src/emails/mailConfig.jsx\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_src_emails_mailConfig_jsx__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9lbWFpbHMvbWFpbENvbmZpZy5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBbUQ7QUFDbkQsaUVBQWVBLGtFQUFJQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QtZW1haWwtY2xpZW50Ly4vZW1haWxzL21haWxDb25maWcuanN4P2U4NzQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1haWwgZnJvbSAnLi4vLi4vc3JjL2VtYWlscy9tYWlsQ29uZmlnLmpzeCc7XG5leHBvcnQgZGVmYXVsdCBNYWlsO1xuIl0sIm5hbWVzIjpbIk1haWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./emails/mailConfig.jsx\n");

/***/ }),

/***/ "(rsc)/../src/emails/mailConfig.jsx":
/*!************************************!*\
  !*** ../src/emails/mailConfig.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   transporter: () => (/* binding */ transporter)\n/* harmony export */ });\n/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodemailer */ \"(rsc)/../node_modules/nodemailer/lib/nodemailer.js\");\n\nconst transporter = nodemailer__WEBPACK_IMPORTED_MODULE_0__.createTransport({\n    host: \"smtp.gmail.com\",\n    port: 465,\n    secure: true,\n    auth: {\n        user: \"pfhenry8@gmail.com\",\n        pass: \"ecdg fail ybav lhkd\"\n    }\n});\ntransporter.verify().then(()=>{\n    console.log(\"Ready for send emails\");\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vc3JjL2VtYWlscy9tYWlsQ29uZmlnLmpzeCIsIm1hcHBpbmdzIjoiOzs7OztBQUFvQztBQUU3QixNQUFNQyxjQUFjRCx1REFBMEIsQ0FBQztJQUNwREcsTUFBTTtJQUNOQyxNQUFNO0lBQ05DLFFBQVE7SUFDUkMsTUFBTTtRQUNKQyxNQUFNO1FBQ05DLE1BQU07SUFDUjtBQUNGLEdBQUc7QUFFSFAsWUFBWVEsTUFBTSxHQUFHQyxJQUFJLENBQUM7SUFDeEJDLFFBQVFDLEdBQUcsQ0FBQztBQUNkIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QtZW1haWwtY2xpZW50Ly4uL3NyYy9lbWFpbHMvbWFpbENvbmZpZy5qc3g/ZjQ5MiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbm9kZW1haWxlciBmcm9tIFwibm9kZW1haWxlclwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRyYW5zcG9ydGVyID0gbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xyXG4gIGhvc3Q6IFwic210cC5nbWFpbC5jb21cIixcclxuICBwb3J0OiA0NjUsXHJcbiAgc2VjdXJlOiB0cnVlLFxyXG4gIGF1dGg6IHtcclxuICAgIHVzZXI6IFwicGZoZW5yeThAZ21haWwuY29tXCIsXHJcbiAgICBwYXNzOiBcImVjZGcgZmFpbCB5YmF2IGxoa2RcIixcclxuICB9LFxyXG59KTtcclxuXHJcbnRyYW5zcG9ydGVyLnZlcmlmeSgpLnRoZW4oKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKFwiUmVhZHkgZm9yIHNlbmQgZW1haWxzXCIpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbIm5vZGVtYWlsZXIiLCJ0cmFuc3BvcnRlciIsImNyZWF0ZVRyYW5zcG9ydCIsImhvc3QiLCJwb3J0Iiwic2VjdXJlIiwiYXV0aCIsInVzZXIiLCJwYXNzIiwidmVyaWZ5IiwidGhlbiIsImNvbnNvbGUiLCJsb2ciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/../src/emails/mailConfig.jsx\n");

/***/ })

};
;
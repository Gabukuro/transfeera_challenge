function NiceExceptionHandler(message, code = 500) {
    this.message = message;
    this.code = code;
}
NiceExceptionHandler.prototype = new Error();
NiceExceptionHandler.prototype.constructor = NiceExceptionHandler;

module.exports = NiceExceptionHandler;
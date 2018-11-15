
export default class BaseErrorHandler {
    /**
     * a queue to store (network) error message for controller to deal with
     * @type {Array}
     * @private
     */
    _errorQueue = [];

    /**
     * record new error into error quere, trigger manager
     * @param error
     */
    recordError(error) {
        this._errorQueue.push(error);
    }

    /**
     * get an error from quere to deal with
     * @return {*}
     */
    handleError(deleteError = true) {
        let ret = null;
        if (this._errorQueue.length > 0) {
            if (deleteError) {
                ret = this._errorQueue.shift();
            } else {
                ret = this._errorQueue[0];
            }
        }
        return ret;
    }
}

let _sharedErrorHandler = null;
BaseErrorHandler.getErrorHandler = () => {
    if (!_sharedErrorHandler) {
        _sharedErrorHandler = new BaseErrorHandler();
    }
    return _sharedErrorHandler;
};

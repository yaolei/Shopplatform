export default function(store) {
    return function(next) {
        return function(action) {
            return next(action);
        }
    }
} 
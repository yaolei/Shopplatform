import { BRIEF_INFO } from '../actions/briefAction';

export function brifInfo(state = '', action) {
    switch (action.type) {
        case BRIEF_INFO:
            return action.data;
        default:
            return state;
    }
}

export const BRIEF_INFO = "BRIEF_INFO";

export function setBriefInfo(info) {
    return {
        type: BRIEF_INFO,
        data: info
    };
}
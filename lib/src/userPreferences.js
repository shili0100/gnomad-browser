"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserPreferencesStore {
    constructor() {
        this.preferences = {};
    }
    loadPreferences() {
        return new Promise((resolve, reject) => {
            try {
                // @ts-expect-error TS(2345) FIXME: Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
                this.preferences = JSON.parse(localStorage.getItem('userPreferences')) || {};
                resolve();
            }
            catch (error) {
                reject(new Error('Unable to load preferences'));
            }
        });
    }
    getPreference(key) {
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return this.preferences[key];
    }
    savePreference(key, value) {
        // @ts-expect-error TS(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        this.preferences[key] = value;
        return new Promise((resolve, reject) => {
            try {
                localStorage.setItem('userPreferences', JSON.stringify(this.preferences));
                resolve();
            }
            catch (error) {
                reject(new Error('Unable to save preference'));
            }
        });
    }
}
exports.default = new UserPreferencesStore();
//# sourceMappingURL=userPreferences.js.map
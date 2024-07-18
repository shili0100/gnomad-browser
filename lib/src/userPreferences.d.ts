declare class UserPreferencesStore {
    preferences: {};
    loadPreferences(): Promise<unknown>;
    getPreference(key: any): any;
    savePreference(key: any, value: any): Promise<unknown>;
}
declare const _default: UserPreferencesStore;
export default _default;

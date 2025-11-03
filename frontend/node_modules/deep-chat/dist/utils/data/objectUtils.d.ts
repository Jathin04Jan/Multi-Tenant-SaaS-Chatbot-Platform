export declare class ObjectUtils {
    static setPropertyValueIfDoesNotExist<T>(object: T, nestedKeys: string[], value: unknown): void;
    static setPropertyValue<T>(object: T, nestedKeys: string[], value: unknown): void;
    static getObjectValue<T>(object: T, nestedKeys: string[]): object | undefined;
    static overwritePropertyObjectFromAnother<T>(target: T, source: T, nestedKeys: string[]): void;
    static isJson(obj: object): boolean;
    static assignPropertyFromOneToAnother<T extends object, K extends keyof T>(key: K, target: T, source?: Partial<T>): void;
}
//# sourceMappingURL=objectUtils.d.ts.map
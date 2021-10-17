import { Dependency } from "./dependency";

export interface PackageLock {
    name?: string;
    version?: string;
    lockfileVersion?: number;
    requires?: boolean;
    packages?: {
        [key: string]: Dependency;
    };
    dependencies?: {
        [key: string]: Dependency;
    };
}
export interface Dependency {
    version: string;
    resolved: string;
    integrity: string;
    bundled?: boolean;
    dev?: boolean;
    optional?: boolean;
    devOptional?: boolean;
    requires?: {
        [key: string]: string;
    },
    dependencies?: {
        [key: string]: Dependency;
    }
}
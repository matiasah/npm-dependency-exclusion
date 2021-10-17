import { Exclusion } from "./exclusion";

export interface Package {
    name: string;
    version: string;
    description?: string;
    main?: string;
    bin?: string;
    scripts?: {
        [key: string]: string;
    },
    author?: string;
    license?: string;
    dependencies?: {
        [key: string]: string;
    },
    devDependencies?: {
        [key: string]: string;
    },
    exclusions?: {
        [key: string]: Exclusion;
    }
}
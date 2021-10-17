import { Dependency } from "./dependency";
import { PackageLock } from "./package-lock";

export function getDevDependenciesMap(packageLockObject: PackageLock): { [key: string]: boolean } {

    // Dev dependencies map
    const isDevDependency: { [key: string]: boolean } = {};

    // If "packages" property is present
    if (packageLockObject.packages) {

        // Collect dev dependencies
        collectDevDependencies(packageLockObject.packages, isDevDependency);
    }

    // If "dependencies" properties is present
    if (packageLockObject.dependencies) {

        // Collect dev dependencies
        collectDevDependencies(packageLockObject.dependencies, isDevDependency);
    }

    // Return dev dependencies map
    return isDevDependency;
}

function collectDevDependencies(
    dependencies: { [key: string]: Dependency; },
    isDevDependency: { [key: string]: boolean; }
) {
    
    // For every dependency
    for (const [name, dependency] of Object.entries(dependencies)) {

        // If dependency is a development one
        if (dependency.dev) {

            // Mark dev dependency
            isDevDependency[name] = true;

            // If nested 'dependencies' is present
            if (dependency.dependencies) {

                // Collect nested dev dependencies
                collectDevDependencies(dependency.dependencies, isDevDependency);
            }

            // If nested 'requires' is present
            if (dependency.requires) {

                // Collect nested dev dependencies
                collectNestedDevDependencies(dependency.requires, isDevDependency);
            }
        }

    }

}
function collectNestedDevDependencies(
    dependencies: { [key: string]: string; },
    isDevDependency: { [key: string]: boolean; }
) {
    
    // For every dependency
    for (const [name, version] of Object.entries(dependencies)) {

        // Mark dev dependency
        isDevDependency[name] = true;
    }

}


import { Dependency } from "./dependency";
import { Exclusion } from "./exclusion";
import { getDevDependenciesMap } from "./get-dev-dependencies";
import { Package } from "./package";
import { PackageLock } from "./package-lock";

export function excludePackageDependencies(packageObject: Package, packageLockObject: PackageLock): PackageLock {

    // If exclusions object is present
    if (packageObject.exclusions) {

        // Get dev dependencies
        const isDevDependency: { [key: string]: boolean } = getDevDependenciesMap(packageLockObject);

        // If "packages" property is present
        if (packageLockObject.packages) {

            // Exclude dependencies
            excludeDependencies(packageLockObject.packages, packageObject.exclusions, isDevDependency);
        }

        // If "dependencies" property is present
        if (packageLockObject.dependencies) {

            // Exclude dependencies
            excludeDependencies(packageLockObject.dependencies, packageObject.exclusions, isDevDependency);
        }

    }

    // Return packageLockObject
    return packageLockObject;
}

function excludeDependencies(
    dependencies: { [key: string]: Dependency; },
    exclusions: { [key: string]: Exclusion; },
    isDevDependency: { [key: string]: boolean; }
) {
    
    // For every dependency
    for (const [name, dependency] of Object.entries(dependencies)) {

        // If dependency is excluded
        if (exclusions[name]) {

            // If it's a dev dependency
            if (isDevDependency[name]) {

                // If the dependency can be excluded
                if (exclusions[name] === 'any') {

                    // Remove from dependencies map
                    delete dependencies[name];
                    
                } else {

                    // Mark as a dev dependency
                    dependency.dev = true;
                }

            } else {

                // Exclude from dependencies map
                delete dependencies[name];
            }

        } else {

            // If nested 'dependencies' is present
            if (dependency.dependencies) {

                // Exclude nested dependencies
                excludeDependencies(dependency.dependencies, exclusions, isDevDependency);

            }

            // If nested 'requires' is present
            if (dependency.requires) {

                // Exclude nested dependencies
                excludeNestedDependencies(dependency, dependency.requires, exclusions, isDevDependency);
            }

        }

    }
    
}

function excludeNestedDependencies(
    dependency: Dependency,
    dependencies: { [key: string]: string; },
    exclusions: { [key: string]: Exclusion; },
    isDevDependency: { [key: string]: boolean; }
) {
    
    // For every dependency
    for (const [name, version] of Object.entries(dependencies)) {

        // If dependency needs to be excluded
        if (exclusions[name]) {

            // If excluded dependency is a dev dependency within a dev dependency
            if (isDevDependency[name] && dependency.dev) {

                // If exclusion is of any type
                if (exclusions[name] === 'any') {

                    // Exclude dependency
                    delete dependencies[name];

                }

            } else {

                // Exclude dependency
                delete dependencies[name];
            }

        }

    }

}


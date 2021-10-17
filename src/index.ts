import * as fs from 'fs';
import { excludePackageDependencies } from './exclude-dependencies';
import { Package } from './package';
import { PackageLock } from './package-lock';

const packageLockData: Buffer = fs.readFileSync(process.cwd() + '/package-lock.json');
const packageLockObject: PackageLock = JSON.parse(packageLockData as any);

const packageData: Buffer = fs.readFileSync(process.cwd() + '/package.json');
const packageObject: Package = JSON.parse(packageData as any);

// Exclude dependencies
excludePackageDependencies(packageObject, packageLockObject);

// Convert to string
const newPackageLockData = JSON.stringify(packageLockObject, null, 2);

// Write to file
fs.writeFileSync(process.cwd() + '/package-lock.json', newPackageLockData + '\n');
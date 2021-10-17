# npm-dependency-exclusion
This is a module for excluding dependencies in package-lock.json. It finds references to unwanted dependencies and removes them from inclusions.

## Usage in package.json
You need to define a exclusions property containing the name of the excluded dependencies in your package.json:
```json
{
  "name": "npm-dependency-exclusion",
  "version": "1.0.0",
  "description": "NPM utility command to exclude dependencies",
  "dependencies": {},
  "exclusions": {
    "lodash": "prod",
    "lodash.template": "prod"
  }
}
```

Possible values for exclusions are `prod`, which removes dependencies that are required by other dependencies (but not `devDependencies`). And `any` which excludes dependencies from both `dependencies` and `devDependencies`.

## CLI tool
Run the following command in the folder that contains your package.json file.
```
npx npm-dependency-exclusion
```

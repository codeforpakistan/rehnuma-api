## workaround for importing JS packages withtout types

For the node packages which don't have @types 
- create a file under `@types` called `any-js-package-without-types-name.d.t` 
- inside the file `declare module "any-js-package-without-types-name"`
- then `import {package} from 'any-js-package-without-types-name'`

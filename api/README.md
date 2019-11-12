### Note regarding dependencies and types

There is a conflict of some sort regarding types and the package `joi-extract-type`
On a fresh install, remove this package from the file `package.json` and install all
dependencies. Then, from the CLI, manually install `joi-extract-type`@15.0.1. This usefully
cleared the problem locally.  

Be mindful of the version.

11-NOV-2019
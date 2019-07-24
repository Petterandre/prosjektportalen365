'use strict';
const fs = require('fs');
const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const pkgDeploy = require('spfx-pkgdeploy').default;
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
build.addSuppression(`Warning - [sass] The local CSS class '-webkit-filter' is not camelCase and will not be type-safe.`);

try {
    var env = require('./config/env.json');
    pkgDeploy(build, require('./config/package-solution.json'), env);
} catch (error) {
    build.log("Skipping pkgDeploy due to missing config/env.json");
}

gulp.task('version-sync', () => {
    var pkgSolution = require('./config/package-solution.json');
    var newVersionNumber = require('./package.json').version.split('-')[0] + '.0';
    pkgSolution.solution.version = newVersionNumber;
    fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution, null, 4));
});

build.initialize(gulp);

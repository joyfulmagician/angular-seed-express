import * as gulp from 'gulp';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import { join} from 'path';

import Config from '../../config';
import { makeTsProject } from '../../utils';

const plugins = <any>gulpLoadPlugins();

/**
 * Executes the build process, transpiling the TypeScript files (excluding the spec and e2e-spec files) for the test
 * environment.
 */
export = () => {
  let tsProject = makeTsProject();
  let src = [
    'typings/index.d.ts',
    Config.TOOLS_DIR + '/manual_typings/**/*.d.ts',
    join(Config.APP_CLIENT_SRC, '**/*.spec.ts')
  ];
  let result = gulp.src(src)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.typescript(tsProject));

  return result.js
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(Config.APP_CLIENT_DEST));
};


/**
 * Remove old files, copy front-end ones.
 */

import fs from 'fs-extra';
import Logger from 'jet-logger';


try {
    // Remove current build
    fs.removeSync('./dist/');
    // Copy front-end files
    fs.copySync('./src/public', './dist/src/public');
    fs.copySync('./src/views', './dist/src/views');
} catch (err) {
    Logger.Err(err);
}

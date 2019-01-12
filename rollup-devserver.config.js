import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import rollupConfig from './rollup.config.js';

rollupConfig.plugins.concat([
  serve({ open: true, contentBase: 'public/', host: 'localhost', port: 8080 }),
  livereload(),
]);

export default rollupConfig;

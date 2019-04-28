import typescript from 'rollup-plugin-typescript2';
import tslint from 'rollup-plugin-tslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy-glob';
import replace from 'rollup-plugin-replace';

const env = JSON.stringify(process.env.NODE_ENV || 'development');

const namedExports = {
  'node_modules/react/index.js': [
    'Children', 'Component', 'PureComponent', 'createElement', 'cloneElement',
    'isValidElement', 'createFactory', 'version', 'createContext',
    'useState', 'useEffect', 'useContext', 'useRef',
  ],
  'node_modules/react-dom/index.js': [
    'findDOMNode', 'render', 'unmountComponentAtNode'
  ],
  'node_modules/react-is/index.js': [
    'isValidElementType', 'isElement', 'ForwardRef',
  ],
  'node_modules/react-redux/node_modules/react-is/index.js': [
    'isValidElementType', 'isContextConsumer',
  ]
};

// TODO reintroduce uglify for vendoring, this may warrant having a different
// file for vendor code since TypeScript can minify for us
export default {
  plugins: [
    copy([
      { files: 'node_modules/normalize.css/normalize.css', dest: 'public/' }
    ]),
    tslint({
      throwOnError: true,
      configuration: './tslint.json',
      include: [
        'lib/*.ts', 'lib/*.tsx',
        'lib/**/*.ts', 'lib/**/*.tsx',
      ]
    }),
    resolve({ // resolve must be placed before typescript to get the correct resolutions
      mainFields: [ 'module', 'main', 'browser' ],
      customResolveOptions: { moduleDirectory: 'node_modules' }
    }),
    typescript({ typescript: require('typescript'), check: !process.env.ROLLUP_WATCH }),
    replace({ ENV: env, 'process.env.NODE_ENV': env }),
    commonjs({ namedExports }),
  ],
  input: 'lib/main.tsx',
  watch: {
    include: 'lib/**',
    clearScreen: true,
  },
  output: {
    file: 'public/js/bundle.js',
    name: 'ChromeDashboard',
    format: 'iife',
    sourcemap: env === 'development' ? 'inline' : false,
    preferConst: true,
  }
};

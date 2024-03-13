import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';


export default {
    input: './src/script/',
    output: [
      {
        file: 'dist-script/script.js',
        format: 'iife',
      }
    ],
    plugins: [
      resolve({ extensions: ['.ts'] }),
      babel({
        extensions: ['.ts'],
        babelHelpers: "bundled",
        minified: true,
        comments: false,
      }),
      terser(),
    ],
};
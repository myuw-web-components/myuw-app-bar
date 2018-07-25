import { rollup } from 'rollup';
import html from 'rollup-plugin-html';
import minify from 'rollup-plugin-minify-es';

export default [
  {
    input: 'src/myuw-app-bar.js',
    plugins: [
      html({
        include: 'src/myuw-app-bar.html',
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true
        }
      })
    ],
    output: {
      file: 'dist/myuw-app-bar.js',
      name: 'MyuwAppBar',
      format: 'iife'
    }
  },
  {
    input: 'src/myuw-app-bar.js',
    plugins: [
      html({
        include: 'src/myuw-app-bar.html',
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true
        }
      }),
      minify({
        output: {
          wrap_iife: true
        }
      })
    ],
    output: {
      file: 'dist/myuw-app-bar.min.js',
      name: 'MyuwAppBar',
      format: 'iife'
    }
  },
  {
    input: 'src/myuw-app-bar.js',
    plugins: [
      html({
        include: 'src/myuw-app-bar.html',
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true
        }
      })
    ],
    output: {
      file: 'dist/myuw-app-bar.mjs',
      name: 'MyuwAppBar',
      format: 'es'
    }
  },
  {
    input: 'src/myuw-app-bar.js',
    plugins: [
      html({
        include: 'src/myuw-app-bar.html',
        htmlMinifierOptions: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true
        }
      }),
      minify()
    ],
    output: {
      file: 'dist/myuw-app-bar.min.mjs',
      name: 'MyuwAppBar',
      format: 'es'
    }
  },
];

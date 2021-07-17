'use strict';
import buble from '@rollup/plugin-buble';
import {terser} from 'rollup-plugin-terser';
import node from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import * as pkg from "./package.json";

const MIN = process.env.MIN === 'true' || false; // true/false|unset
const FORMAT = process.env.FORMAT; // JS umd|iife|esm
const INPUT = process.env.INPUTFILE;
const OUTPUTC = process.env.OUTPUTFILE;

const year = (new Date).getFullYear();

const banner =
`/*!
* SvgPath v${pkg.version} (${pkg.homepage})
* Copyright ${year} © ${pkg.author}
* Licensed under MIT (https://github.com/m310851010/svgpath/LICENSE)
*/`;

const miniBannerJS = `// SvgPath v${pkg.version} | ${pkg.author} © ${year} | ${pkg.license}-License`;

const INPUTFILE = INPUT ? INPUT : 'index.js';
const OUTPUTFILE = OUTPUTC ? OUTPUTC : 'dist/index'+(FORMAT!=='umd'?'.'+FORMAT:'')+(MIN?'.min':'')+'.js';

const OUTPUT = {
  file: OUTPUTFILE,
  format: FORMAT // or iife
};

const PLUGINS = [ 
  node({mainFields: ['jsnext','module'], dedupe: ['dommatrix']}),
  json()
];

if (FORMAT!=='esm'){
  PLUGINS.push(buble());
}

if (MIN){
  PLUGINS.push(terser({output: {preamble: miniBannerJS}}));
} else {
  OUTPUT.banner = banner;
}

if (FORMAT !== 'esm') {
  OUTPUT.name = 'svgpathToolkit';
}

export default [
  {
    input: INPUTFILE,
    output: OUTPUT,
    plugins: PLUGINS
  }
]
svgpath-toolkit
=======

> 用于 SVG path 转换的工具包

注: 本工具只针对 [path data](https://www.w3.org/TR/SVG11/paths.html#PathData) 字符串, 不能使用 svg xml


安装
-------

```bash
npm install svgpath-toolkit
```


使用方法
-------

- 通过`import ` 引用

```js
import {SvgPath} from 'svgpath-toolkit';

var transformed = SvgPath('path string')
                    .scale(0.5)
                    .translate(100,200)
                    .rel()
                    .round(1)
                    .toString();
```

- 通过`script ` 标签

```html
<script type="module">
  import {SvgPath} from 'node_modules/svgpath-toolkit/lib/index.js';
</script>
```

或者

```html
<script src="node_modules/svgpath-toolkit/index.js"></script>
<script>
  var SvgPath = svgpathToolkit.SvgPath;
</script>
```

API
---

所有方法都是链式的 (返回对象本身).


### new SvgPath(path): SvgPath

用链式方法创建新的 `SvgPath` 对象实例


### SvgPath.from(path|SvgPath): SvgPath
类似于 `Array.from()`. 从字符串或其他`SvgPath` 实例创建新的`SvgPath` 对象实例


### .abs(): SvgPath

Converts all path commands to absolute.


### .rel(): SvgPath

Converts all path commands to relative. Useful to reduce output size.


### .scale(sx [, sy]): SvgPath

Rescale path (the same as SVG `scale` transformation). `sy` = `sx` by default.


### .translate(x [, y]): SvgPath

Rescale path (the same as SVG `translate` transformation). `y` = 0 by default.


### .rotate(angle [, rx, ry]): SvgPath

Rotate path to `angle` degrees around (rx, ry) point. If rotation center not set,
(0, 0) used. The same as SVG `rotate` transformation.


### .skewX(degrees): SvgPath

Skew path along the X axis by `degrees` angle.


### .skewY(degrees): SvgPath

Skew path along the Y axis by `degrees` angle.


### .matrix([ m1, m2, m3, m4, m5, m6 ]): SvgPath

Apply 2x3 affine transform matrix to path. Params - array. The same as SVG
`matrix` transformation.


### .transform(string): SvgPath

Any SVG transform or their combination. For example `rotate(90) scale(2,3)`.
The same format, as described in SVG standard for `transform` attribute.


### .unshort(): SvgPath

Converts smooth curves `T`/`t`/`S`/`s` with "missed" control point to
generic curves (`Q`/`q`/`C`/`c`).


### .unarc(): SvgPath

Replaces all arcs with bezier curves.


### .toString(): string

Returns final path string.


### .round(precision): SvgPath

Round all coordinates to given decimal precision. By default round to integer.
Useful to reduce resulting output string size.


### .iterate(function(segment, index, x, y) [, keepLazyStack]): SvgPath

Apply iterator to all path segments.

- Each iterator receives `segment`, `index`, `x` and `y` params.
  Where (x, y) - absolute coordinates of segment start point.
- Iterator can modify current segment directly (return nothing in this case).
- Iterator can return array of new segments to replace current one (`[]` means
  that current segment should be delated).

If second param `keepLazyStack` set to `true`, then iterator will not evaluate
stacked transforms prior to run. That can be useful to optimize calculations.

license
-------

MIT. Copyright (C) [Feross Aboukhadijeh](http://feross.org), and other contributors. Originally forked from an MIT-licensed module by Romain Beauxis.

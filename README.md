# <img width="24" height="24" src="https://raw.githubusercontent.com/Siubaak/kut/master/docs/favicon.ico"/> Kut

[![](https://img.shields.io/npm/v/kut.svg?style=flat-square)](https://www.npmjs.com/package/kut)

This is a simple React-like web-view rendering library, developed when I learnt the source codes of React. Currently Kut supports two top-level methods, that's createElement and render, and also supports component-based development with class Component. Already cover some development requirements, and the [home page](https://siubaak.github.io/kut) was built based on Kut with acceptable performance. Kut improved the diff algorithm of React.

Take my hat off to [React](https://github.com/facebook/react), especially to the React Fiber. Kut is still under maintenance on my own, and will support the features like Context and Portal in the future. Free to pull request, and besides, welcome all your stars (lol).

## Usage

If you use webpack or parcel for module-based development, you could install from npm and import it. If you use babel to transform the jsx, it's better to import as React, so you don't need to change the config for babel/preset-react.

Install from npm.

```bash
npm i -S kut
```

And then import.

```js
import React from 'kut'
```

Or, you can simple source at your html file, and the minimized file can be found at [release](https://github.com/Siubaak/kut/releases). Download it and unzip, then you can find `kut/dist/min/kut.min.js` and source it as follow.

```html
<div id="root"></div>

<script type="text/javascript" src="kut.min.js"></script>
<script type="text/javascript">
const node = Kut.createElement('p', {
  style: {
    height: '50px',
    backgroundColor: '#eee',
  }
}, 'Hello World!')

Kut.render(node, document.getElementById('root'))
</script>
```

## Demo & Docs

I've made a home page for Kut, built with Kut. You can find a TodoList demo and the docs for Kut.

Just see [https://siubaak.github.io/kut](https://siubaak.github.io/kut)

## Development

If you want to contibute to Kut. Just clone it down, develop on it and pull request.

```bash
# clone from git
git clone https://github.com/Siubaak/kut
# enter the directory
cd kut
# install all dependencies
npm i

# compile the typescript and watch the change of files
npm start
# or bundle up the dev file with sourcemap by webpack
# and watch the change of files
npm run webpack
# or build the files for production
npm run build
```

## References

- [React - A declarative, efficient, and flexible JavaScript library for building user interfaces](https://github.com/facebook/react)
- [React-Tiny - Tiny implementation of React in flow](https://github.com/CodeFalling/react-tiny)
- [Anu - the React16-compat mini library](https://github.com/RubyLouvre/anu)
- [Luy - a React-like framework](https://github.com/215566435/Luy)

## License

Kut is licensed under the [MIT](https://github.com/Siubaak/kut/blob/master/LICENSE).
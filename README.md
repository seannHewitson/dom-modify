# dom-modify

### Install

```bash
$ npm install dom-modify
```

### Import
```js
// ES6
import * as modify from 'dom-modify';

// CommonJS
let modify = require('dom-modify');
```

### Usage
The moveable element requires an absolute or fixed position, and to be positioned by top and left offsets.
```css
#test{
	.position:fixed;
	top:100px;
	left:50px;
}
```
```js
//	Pass an element through as the first parameter (targetElement).
var element = document.getElementById('test');
modify(element);
//	Include a selector for the second parameter if you want the element to be repositioned when dragging a child.
//	Example: a div with a title bar.
modify(element, '.titlebar');
```

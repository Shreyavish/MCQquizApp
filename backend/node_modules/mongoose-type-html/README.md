# mongoose-type-html

An html field-type for Mongoose schemas. The field type can use [DOMPurify](https://github.com/cure53/DOMPurify) and [Sanitize-HTML](https://github.com/punkave/sanitize-html) for casting HTML values. At default only [DOMPurify](https://github.com/cure53/DOMPurify) is enabled with default options. You can easily disable or change the options from both. To know which options you can use visit their github pages and take a look there.

[![npm](https://nodei.co/npm/mongoose-type-html.png)](https://www.npmjs.com/package/mongoose-type-html)
<!-- [![Build Status](https://travis-ci.org/CSoellinger/mongoose-type-html.svg?branch=master)](https://travis-ci.org/konsumer/mongoose-type-html) -->

## usage

This will cast html, correctly:

```js
var mongoose = require('mongoose');
require('mongoose-type-html');

// Using with default options: dompurify = true / sanitizehtml = false
var UserSchema = new mongoose.Schema({
    description: mongoose.SchemaTypes.Html
});

// Using with both options on true: dompurify = true / sanitizehtml = true
var UserSchema = new mongoose.Schema({
    description: {
        type: mongoose.SchemaTypes.Html,
        dompurify: true, // You can pass an object with dompurify config too. True uses default options.
        sanitizehtml: true // You can pass an object with sanitizehtml config too. True uses default options.
    }
});
```

You can also use the stuff in `String` type:

```js
var UserSchema = new mongoose.Schema({
    description: { type: mongoose.SchemaTypes.Html, required: true }
});
```

You can also use it as an array:


```js
var UserSchema = new mongoose.Schema({
    descriptions: [{type: mongoose.SchemaTypes.Html}]
});
```

In typescript you only have to import it instead of requiring.

```typescript
import 'mongoose-type-html';
```

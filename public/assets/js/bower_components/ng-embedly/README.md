# ng-embedly

This is a simple directive wrapping [Embed.ly](http://embed.ly/) services.

## Usage

* Install `ng-embedly`.
```bash
$> bower install ng-embedly
```

* Include `ng-embedly.js` in your `index.html`.
```html
<script type="text/javascript" src="bower_components/ng-embedly/ng-embedly.js"></script>
```

* Set `ngEmbedly` as a dependency of you app.
```javascript
var app = angular.module('app', ['ngEmbedly']);
```

* Configure your API key.
```javascript
app.config(['ngEmbedlyServiceProvider', function(ngEmbedlyServiceProvider) {
    ngEmbedlyServiceProvider.setKey("<yourKeyHere>");
}]);
```

* Embed stuff!
```html
<ng-embedly href="http://somthing.com"></ng-embedly>
<a href="http://something.else.com" />
```

* Also, you can define a template for your embed.
    * In the configuration.
    * In your embed tag.

```javascript
app.config(['ngEmbedlyServiceProvider', function(ngEmbedlyServiceProvider) {
    ngEmbedlyServiceProvider.setTemplate("<h1 ng-bind='name'></h1><span ng-bind-html='html'></span>")
}]);
```
```html
<ng-embedly href="http://somthing.com" template="<h1 ng-bind='name'></h1><span ng-bind-html='html'></span>"></ng-embedly>
```
Templates defined inside the embed tags are used in priority.

## Licensing

ng-embedly
Copyright (C) 2014 Paul Joannon

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
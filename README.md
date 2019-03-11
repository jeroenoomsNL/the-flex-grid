# The Flex Grid

The Flex Grid is a lightweight 12 columns grid, build with CSS3 feature flexbox. The grid is made for modern browsers, no support for dinosaurs. The max-width of the grid and the width of the gutter are easily customizable by the globals in the SASS file.

Vendor prefixes are added for the last 2 versions of the most used webbrowers using autoprefixer. This can be changed in gulpfile.js

[http://jeroenoomsnl.github.io/the-flex-grid]

## Install

```
npm install the-flex-grid
```

```
bower install the-flex-grid
```

## Fluid flexbox grid

```
<div class="grid">
    <div class="row">
        <div class="col-12"></div>
    </div>

    <div class="row">
        <div class="col-3"></div>
        <div class="col-9"></div>
    </div>

    <div class="row">
        <div class="col-4"></div>
        <div class="col-8"></div>
    </div>

    <div class="row">
        <div class="col-6"></div>
        <div class="col-6"></div>
    </div>
</div>
```

## Responsive flexbox grid

```
<div class="grid">
    <div class="row">
        <div class="col-large-12 col-medium-6"></div>
    </div>

    <div class="row">
        <div class="col-large-3 col-medium-6 col-small-12"></div>
        <div class="col-large-9 col-medium-9 col-small-12"></div>
    </div>

    <div class="row">
        <div class="col-large-4"></div>
        <div class="col-large-8"></div>
    </div>

    <div class="row">
        <div class="col-large-6"></div>
        <div class="col-large-6"></div>
    </div>
</div>
```

## More features

See the [demo page] for all the other features like reverse order and alignment.

## Usage of this source

After cloning the repository:

```
npm install
```

Build the project:

```
gulp
```

Watch and auto refresh while editing:

```
gulp watch
```

[http://jeroenoomsnl.github.io/the-flex-grid]: http://jeroenoomsnl.github.io/the-flex-grid
[demo page]: http://jeroenoomsnl.github.io/the-flex-grid

# The Flex Grid

The Flex Grid is an lightweight 12 columns grid, build with CSS3 feature flexbox. The grid is made for modern browsers, no support for dinosaurs. The max-width of the grid and the with of the gutter are easily customizable by the globals in the SASS file.

Vendor prefixes are added for the last 2 versions of the most used webbrowers using autoprefixer. This can be changed in gulpfile.js

The grid CSS can be found at /demo/styles/grid.css

## Fluid grid

```
<div class="row">
    <div class="col-12">
        .col-12
    </div>
</div>

<div class="row">
    <div class="col-3">
        .col-3
    </div>
    <div class="col-9">
        .col-9
    </div>
</div>

<div class="row">
    <div class="col-4">
        .col-4
    </div>
    <div class="col-8">
        .col-8
    </div>
</div>

<div class="row">
    <div class="col-6">
        .col-6
    </div>
    <div class="col-6">
        .col-6
    </div>
</div>
```

## Responsive grid

```
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
```

## More features

View index.html for a demo of all the features like reverse order and alignment.

## Usage

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







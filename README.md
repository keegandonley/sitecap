
<div align="center">

## SiteCap
[![forthebadge](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com)

</div>

Simple CLI for capturing screenshots of websites in a straightforward and repeatable way.

### Setup

```
npm install -g sitecap
```

### Usage
```
  Usage: sitecap [options]

  Options:

    -V, --version          output the version number
    -s, --site <site>      The website to capture
    -w, --width <width>    The viewport width
    -h, --height <height>  The viewport height
    -o, --output <output>  The output file name
    -r, --retina           Render in retina resolution
    -h, --help             output usage information
```
Basic uage: 
```
sitecap --site https://keegandonley.com
```
Dimensions:
```
sitecap --site https://keegandonley.com --width 1000 --height 300
```

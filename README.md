
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
  Options:

    -V, --version          output the version number
    -s, --site <site>      The website to capture
    -W, --width <width>    The viewport width
    -H, --height <height>  The viewport height
    -o, --output <output>  The output file name
    -r, --retina           Render in retina resolution
    -i, --interactive      Open an interactive browser before saving
    -v, --verbose          Turn on verbose output
    -h, --help             output usage information
```
**Basic usage:**
```
sitecap --site https://keegandonley.com
```
**Dimensions:**
```
sitecap --site https://keegandonley.com --width 1000 --height 300
```

**Interactive:**

Launch the browser and interact with the site before capturing the screenshot
```
sitecap --site https://keegandonley.com --interactive
```

# MPEG-DASH MPD parser

# Overview

This module is a simple MPEG-DASH MPD manifest parser for multiple purposes.
This module is using [xml-js](https://github.com/nashwaan/xml-js) module to convert an XML formatted MPD manifest file to a JSON object so that you can easily handle MPEG-DASH MPD elements for your manifest parser/manipulation applications.

As of now, there is no pre-defined functions in this DashMPD class for manipulation. Some built-in functions for standard and/or popular manifest manipulation will be implemented in this class sooon.

## Usage

```JavaScript
import { DashMPD } from 'dash-mpd';

const your_manifest_string = '...';
const dashManifest = new DashMPD();
dashManifest.parse(your_manifest_string);
manifestJson = dashManifest.mpd;

// operate your manifest manipulation over manifestJson JSON object

console.log(JSON.stringify(manifestJson));

const mpdXml = dashManifest.getMPD();
console.log(mpdXml);
```

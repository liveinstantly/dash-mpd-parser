/**
 * package-test/esm/index.js
 */
/**
 * Copyright 2021 LiveInstantly, LLC - Shigeyuki Fukushima <github@liveinstantly.com>
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fetch from 'node-fetch';
import { DashMPD } from '@liveinstantly/dash-mpd-parser';

// MPEG-DASH MPD manifest files for these tests is fetched from the reference player's list:
// https://reference.dashif.org/dash.js/v4.2.1/samples/dash-if-reference-player/index.html

const URL1 = 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd';

const dashManifest = new DashMPD();
const response = await fetch(URL1);
const body = await response.text();
dashManifest.parse(body);

let manifestJson = dashManifest.getJSON();
console.log(JSON.stringify(manifestJson));

const result = dashManifest.getMPD();
console.log(result);
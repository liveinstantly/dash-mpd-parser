/**
 * package-test/cjm/index.js
 */
/**
 * Copyright 2021 LiveInstantly, LLC - Shigeyuki Fukushima <shige@liveinstantly.com>
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

const fetch = require('node-fetch');
const DashMPD = require('@liveinstantly/dash-mpd-parser').DashMPD;

const URL1 = 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd';


(async () => {
    const dashManifest = new DashMPD();
    const response = await fetch(URL1);
    const body = await response.text();
    dashManifest.parse(body);

    let manifestJson = dashManifest.getJSON();
    console.log(JSON.stringify(manifestJson));

    const result = dashManifest.getMPD();
    console.log(result);
})();

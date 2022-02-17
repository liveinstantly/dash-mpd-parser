/**
 * src/DashMPD.ts
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

import { xml2json, json2xml } from 'xml-js';
import Dash from './DashMpdConstants';

export class DashMPD {
    mpd: any;
    parse(mpdXml: string): any {
        const jsonManifestString = xml2json(mpdXml, {
            compact: true,
            spaces: 4,
            alwaysArray: [
                Dash.PROGRAM_INFORMATION,
                Dash.BASEURL,
                Dash.LOCATION,
                Dash.PERIOD,
                Dash.METRICS,
                Dash.ESSENTIAL_PROPERTY,
                Dash.SUPPLEMENTAL_PROPERTY,
                Dash.UTC_TIMING,
                Dash.EVENT_STREAM,
                Dash.ADAPTATION_SET,
                Dash.SUBSET,
                Dash.EMPTY_ADAPTATION_SET,
                Dash.GROUP_LABEL,
                Dash.PRESELECTION,
                Dash.ACCESSIBILITY,
                Dash.ROLE,
                Dash.RATING,
                Dash.VIEWPOINT,
                Dash.CONTENT_COMPONENT,
                Dash.REPRESENTATION,
                Dash.SUB_REPRESENTATION,
                Dash.FRAME_PACKING,
                Dash.AUDIO_CHANNEL_CONFIGURATION,
                Dash.CONTENT_PROTECTION,
                Dash.INBAND_EVENT_STREAM,
                Dash.SWITCHING,
                Dash.RANDOM_ACCESS,
                Dash.LABEL,
                Dash.RANGE,
                Dash.REPORTING,
                Dash.EVENT,
            ],
            nativeType: true,
            nativeTypeAttributes: true,
            attributesKey: "@",
        });
        console.log(jsonManifestString);
        this.mpd = JSON.parse(jsonManifestString);
        return this.mpd;
    }

    getMPD(): string {
        const jsonManifestString = JSON.stringify(this.mpd);
        return json2xml(jsonManifestString, {
            compact: true,
            ignoreComment: true,
            spaces: 1,
            attributesKey: "@",
        });
    }
}
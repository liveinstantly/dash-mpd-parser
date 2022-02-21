/**
 * src/DashMPD.ts
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

import { xml2json, json2xml } from 'xml-js';
import { DashConstants as Consts } from './DashMPDConstants';

const AT = '@';
const AUDIO = 'audio';
const VIDEO = 'video';
export class DashMPD
{
    private mpd: any;
    //consts = Consts;

    parse(mpdXml: string): void {
        const jsonManifestString = xml2json(mpdXml, {
            compact: true,
            spaces: 4,
            alwaysArray: Consts.ALWAYS_ARRAY_ELEMENTS,
            nativeType: true,
            nativeTypeAttributes: true,
            attributesKey: AT
        });
        this.mpd = JSON.parse(jsonManifestString);
    }

    getJSON(): any {
        return this.mpd;
    }

    setJSON(mpdJson: any) {
        this.mpd = mpdJson;
    }

    getMPD(): string {
        const jsonManifestString = JSON.stringify(this.mpd);
        return json2xml(jsonManifestString, {
            compact: true,
            ignoreComment: true,
            spaces: 1,
            attributesKey: AT
        });
    }

    filterVideoRenditionByBandwidth(ranges: [number, number][]): void {
        function filterFn(element: any) {
            let result = false;
            ranges.forEach((range) => {
                if (range[0] <= element[AT][Consts.ATTR_BANDWIDTH] && element[AT][Consts.ATTR_BANDWIDTH] <= range[1]) {
                    result = true;
                }
            });
            return result;
        }
        this.mpd[Consts.MPD][Consts.PERIOD].forEach((period: any) => {
            period[Consts.ADAPTATION_SET].forEach((adaptationSet: any) => {
                if (adaptationSet[AT][Consts.ATTR_CONTENT_TYPE] == VIDEO) {
                    let filteredRenditions = adaptationSet[Consts.REPRESENTATION].filter(filterFn);
                    adaptationSet[Consts.REPRESENTATION] = filteredRenditions;
                }
            });
        });
    }
}

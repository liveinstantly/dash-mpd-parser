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

import { DashConstants as Consts } from './DashMPDConstants';
import X2JS from './X2JS';
import { MEDIA_TYPE_VIDEO, MEDIA_TYPE_AUDIO, MIME_TYPE_VIDEO_PREFIX } from './RFC6838Types';

const AT = '@';
const Attr = function(name: string): string {
    return AT + name;
};

export class DashMPD {
    private mpd: any;
    private indent: number;
    //consts = Consts;

    constructor() {
        this.indent = 0;
    }

    parse(mpdXml: string): void {
        const x2js = new X2JS({
            attributePrefix: AT,
            useDoubleQuotes: true,
            arrayAccessFormPaths: Consts.ALWAYS_ARRAY_ELEMENTS,
            nativeTypeAttributes: true
        });
        this.mpd = x2js.xml_str2json(mpdXml);
    }

    getJSON(): any {
        return this.mpd;
    }

    setJSON(mpdJson: any) {
        this.mpd = mpdJson;
    }

    getMPD(): string {
        const x2js = new X2JS({
            attributePrefix: AT,
            useDoubleQuotes: true,
            space: this.indent
        });
        return x2js.json2xml_str(this.mpd);
    }

    setIndent(space: number) {
        this.indent = space;
    }

    private attr(name: string): string {
        return AT + name;
    }

    filterVideoRenditionByBandwidth(ranges: [number, number][]): void {
        function filterFnForVideoAdaptationSet(element: any) {
            let result = false;
            ranges.forEach((range) => {
                if (
                    range[0] <= element[Attr(Consts.ATTR_BANDWIDTH)] &&
                    element[Attr(Consts.ATTR_BANDWIDTH)] <= range[1]
                ) {
                    result = true;
                }
            });
            return result;
        }
        function filterFnForUnknownAdaptationSet(element: any) {
            const _mimeType = element[Attr(Consts.ATTR_MIME_TYPE)]
                ? element[Attr(Consts.ATTR_MIME_TYPE)]
                : '';
            if (!_mimeType.startsWith(MIME_TYPE_VIDEO_PREFIX)) {
                return true;
            }
            let result = false;
            ranges.forEach((range) => {
                if (
                    range[0] <= element[Attr(Consts.ATTR_BANDWIDTH)] &&
                    element[Attr(Consts.ATTR_BANDWIDTH)] <= range[1]
                ) {
                    result = true;
                }
            });
            return result;
        }

        this.mpd[Consts.MPD][Consts.PERIOD].forEach((period: any) => {
            period[Consts.ADAPTATION_SET].forEach((adaptationSet: any) => {
                const _contentType = adaptationSet[this.attr(Consts.ATTR_CONTENT_TYPE)]
                    ? adaptationSet[this.attr(Consts.ATTR_CONTENT_TYPE)]
                    : '';
                const _mimeType = adaptationSet[this.attr(Consts.ATTR_MIME_TYPE)]
                    ? adaptationSet[this.attr(Consts.ATTR_MIME_TYPE)]
                    : '';
                if (_contentType == MEDIA_TYPE_VIDEO || _mimeType.startsWith(MIME_TYPE_VIDEO_PREFIX)) {
                    let filteredRenditions = adaptationSet[Consts.REPRESENTATION].filter(filterFnForVideoAdaptationSet);
                    adaptationSet[Consts.REPRESENTATION] = filteredRenditions;
                } else if (_contentType === '' && _mimeType === '') {
                    let filteredRenditions = adaptationSet[Consts.REPRESENTATION].filter(
                        filterFnForUnknownAdaptationSet
                    );
                    adaptationSet[Consts.REPRESENTATION] = filteredRenditions;
                }
            });
        });
    }
}

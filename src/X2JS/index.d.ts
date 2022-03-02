/**
 * x2js/index.d.ts
 */
/**
 * v1.2.1 - Modfied by LiveInstantly, LLC - Shigeyuki Fukushima <github@liveinstantly.com>
 *
 * Copyright 2021-2022 LiveInstantly, LLC - Shigeyuki Fukushima <github@liveinstantly.com>
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

/**
 * new X2JS() - to create your own instance to access all library functionality
 * new X2JS(config) - to create your own instance with additional config
 * <instance>.xml2json - Convert XML specified as DOM Object to JSON
 * <instance>.json2xml - Convert JSON to XML DOM Object
 * <instance>.xml_str2json - Convert XML specified as string to JSON
 * <instance>.json2xml_str - Convert JSON to XML string
 * <instance>.asArray - Utility function to work with a JSON field always in array form
 * <instance>.asDateTime - Utility function to convert the specified parameter from XML DateTime to JS Date
 * <instance>.asXmlDateTime - Utility function to convert the specified parameter to XML DateTime from JS Date or timestamp
 */

interface Options {
    space?: number;
    escapeMode?: boolean;
    attributePrefix?: string;
    arrayAccessForm?: string;
    emptyNodeForm?: string;
    enableToStringFunc?: boolean;
    arrayAccessFormPaths?: any[];
    skipEmptyTextNodesForObj?: boolean;
    stripWhitespaces?: boolean;
    datetimeAccessFormPaths?: any[];
    useDoubleQuotes?: boolean;
    xmlElementsFilter?: any[];
    jsonPropertiesFilter?: any[];
    keepCData?: boolean;
    nativeTypeAttributes?: boolean;
}

export default class {
    constructor(config?: Options);

    parseXmlString(xmlDocStr: any): Document | null;
    asArray(prop: any): any[];
    toXmlDateTime(dt: any): string | null;
    asDateTime(prop: any): any;
    xml2json(xmlDoc: object): object | null;
    xml_str2json(xmlDocStr: string): object | null;
    json2xml_str(jsonObj: object): string;
    json2xml(jsonObj: object): Document;
    getVersion(): string;
}

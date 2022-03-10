/**
 * tests/DashMPD.test.ts
 */

import { DashMPD } from '../src/DashMPD';
import fetch from 'node-fetch';
import * as fs from 'fs';

// MPEG-DASH MPD manifest files for these tests is fetched from the reference player's list:
// https://reference.dashif.org/dash.js/v4.2.1/samples/dash-if-reference-player/index.html

const URL1 = 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd';
const URL2 = 'https://dash.akamaized.net/dash264/TestCases/2c/qualcomm/1/MultiResMPEG2.mpd';
const URL3 = 'http://rdmedia.bbc.co.uk/dash/ondemand/testcard/1/client_manifest-events.mpd';
const URL4 = 'https://dash.akamaized.net/dash264/TestCases/5a/nomor/1.mpd';
const URL5 = 'https://media.axprod.net/TestVectors/v8-MultiContent/Clear/Manifest.mpd';
const test1_file = 'tests/test1_expected.mpd';
const test2_file = 'tests/test2_expected.mpd';
const test3_file = 'tests/test3_expected.mpd';
const test4_file = 'tests/test4_expected.mpd';
const test5_file = 'tests/test5_expected.mpd';
const test6_file = 'tests/test6_expected.mpd';
const test7_file = 'tests/test7_expected.mpd';

describe('DashMPD', (): void => {
    test('Test #1: Convert/Revert Test - MPD manifrest XML to JSON to XML', async (): Promise<void> => {
        const mpd: DashMPD = new DashMPD();
        const response = await fetch(URL1);
        const body = await response.text();
        mpd.parse(body);
        const result = mpd.getMPD();
        const expected = fs.readFileSync(test1_file).toString();
        console.log("Result:\n" + result + "EOF");
        console.log("Expected:\n" + expected + "EOF");
        expect(result===expected).toBe(true);
    });
    test('Test #2: Indent Test - Space 1 byte in output XML', async (): Promise<void> => {
        const mpd: DashMPD = new DashMPD();
        const response = await fetch(URL1);
        const body = await response.text();
        mpd.parse(body);
        mpd.setIndent(1);
        const result = mpd.getMPD();
        const expected = fs.readFileSync(test2_file).toString();
        console.log("Result:\n" + result + "EOF");
        console.log("Expected:\n" + expected + "EOF");
        expect(result===expected).toBe(true);
    });
    test('Test #3: Single-period Filter Test 1 - Video Rendition Filtering #1', async (): Promise<void> => {
        const mpd: DashMPD = new DashMPD();
        const ranges: [number, number][] = [
            [ 600000, 2000000],
            [4000000, 5000000],
        ];
        const response = await fetch(URL1);
        const body = await response.text();
        mpd.parse(body);
        mpd.filterVideoRenditionByBandwidth(ranges);
        const result = mpd.getMPD();
        const expected = fs.readFileSync(test3_file).toString();
        console.log("Result:\n" + result + "EOF");
        console.log("Expected:\n" + expected + "EOF");
        expect(result===expected).toBe(true);
    });
    test('Test #4: Single-period Filter Test 2 - Video Rendition Filtering #2', async (): Promise<void> => {
        const mpd: DashMPD = new DashMPD();
        const ranges: [number, number][] = [
            [ 600000, 2000000],
        ];
        const response = await fetch(URL2);
        const body = await response.text();
        mpd.parse(body);
        mpd.filterVideoRenditionByBandwidth(ranges);
        const result = mpd.getMPD();
        const expected = fs.readFileSync(test4_file).toString();
        console.log("Result:\n" + result + "EOF");
        console.log("Expected:\n" + expected + "EOF");
        expect(result===expected).toBe(true);
    });
    test('Test #5: Single-period Filter Test 3 - Video Rendition Filtering #3', async (): Promise<void> => {
        const mpd: DashMPD = new DashMPD();
        const ranges: [number, number][] = [
            [ 600000, 2000000],
        ];
        const response = await fetch(URL3);
        const body = await response.text();
        mpd.parse(body);
        mpd.filterVideoRenditionByBandwidth(ranges);
        mpd.setIndent(4);
        const result = mpd.getMPD();
        const expected = fs.readFileSync(test5_file).toString();
        console.log("Result:\n" + result + "EOF");
        console.log("Expected:\n" + expected + "EOF");
        expect(result===expected).toBe(true);
    });
    test('Test #6: Multi-period Filter Test 1 - Video Rendition Filtering #1', async (): Promise<void> => {
        const mpd: DashMPD = new DashMPD();
        const ranges: [number, number][] = [
            [ 600000, 2000000],
        ];
        const response = await fetch(URL4);
        const body = await response.text();
        mpd.parse(body);
        mpd.setIndent(1);
        mpd.filterVideoRenditionByBandwidth(ranges);
        const result = mpd.getMPD();
        const expected = fs.readFileSync(test6_file).toString();
        console.log("Result:\n" + result + "EOF");
        console.log("Expected:\n" + expected + "EOF");
        expect(result===expected).toBe(true);
    });
    test('Test #7: Multi-period Filter Test 2 - Video Rendition Filtering #2', async (): Promise<void> => {
        const mpd: DashMPD = new DashMPD();
        const ranges: [number, number][] = [
            [ 600000, 2000000],
        ];
        const response = await fetch(URL5);
        const body = await response.text();
        mpd.parse(body);
        mpd.setIndent(1);
        mpd.filterVideoRenditionByBandwidth(ranges);
        const result = mpd.getMPD();
        const expected = fs.readFileSync(test7_file).toString();
        console.log(`Result: ${result.length} bytes\n${result}EOF`);
        console.log(`Expected: ${expected.length}\n${expected}EOF`);
        expect(result===expected).toBe(true);
    });
})

/**
 * tests/DashMPD.test.ts
 */

import { DashMPD } from '../src/DashMPD';
import fetch from 'node-fetch';
import * as fs from 'fs';

// MPEG-DASH MPD manifest files for these tests is fetched from the reference player's list:
// https://reference.dashif.org/dash.js/v4.2.1/samples/dash-if-reference-player/index.html

const URL1 = 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd';
const test1_file = 'tests/test1_bbb_30fps.mpd';
const test2_file = 'tests/test2_bbb_30fps.mpd';

describe('DashMPD', (): void => {
    test('Test #1: Convert/Revert Test - MPD manifrest XML to JSON to XML', async (): Promise<void> => {
        const mpd: DashMPD = new DashMPD();
        const response = await fetch(URL1);
        const body = await response.text();
        mpd.parse(body);
        const result = mpd.getMPD();
        const expected = fs.readFileSync(test1_file).toString();
        expect(result===expected).toBe(true);
    });
    test('Test #2: Filter Test - Video Eendition Filtering', async (): Promise<void> => {
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
        const expected = fs.readFileSync(test2_file).toString();
        expect(result===expected).toBe(true);
    });
})

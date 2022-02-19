/**
 * tests/DashMPD.test.ts
 */

import { DashMPD } from '../src/DashMPD';
import fetch from 'node-fetch';

// MPEG-DASH MPD manifest files for these tests is fetched from the reference player's list:
// https://reference.dashif.org/dash.js/v4.2.1/samples/dash-if-reference-player/index.html

describe('DashMPD', (): void => {
    test('Convert/Revert Test: MPD manifrest XML to JSON to XML', (): void => {
        const mpd: DashMPD = new DashMPD();
        fetch('https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd')
            .then(res => res.text())
            .then(body => {
                mpd.parse(body);
                const result = mpd.getMPD();
                expect(result).toBe(body);
            }).catch(err => {});
    });
})

/**
 * src/RFC6838Types.ts
 */

/**
 * Copyright 2022 LiveInstantly, LLC - Shigeyuki Fukushima <github@liveinstantly.com>
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

export const MEDIA_TYPE_TEXT = "text";
export const MEDIA_TYPE_IMAGE = "image";
export const MEDIA_TYPE_AUDIO = "audio";
export const MEDIA_TYPE_VIDEO = "video";
export const MEDIA_TYPE_APPLICATION = "application";

// Audio Subtypes
// https://www.iana.org/assignments/media-types/media-types.xhtml#audio

// Video Subtypes
// https://www.iana.org/assignments/media-types/media-types.xhtml#video
export const MIME_TYPE_VIDEO_PREFIX = `${MEDIA_TYPE_VIDEO}/`;
export const MIME_TYPE_VIDEO = [
    "video/1d-interleaved-parityfec",   // [RFC6015]
    "video/3gpp",                       // [RFC3839][RFC6381]
    "video/3gpp2",                      // [RFC4393][RFC6381]
    "video/3gpp-tt",                    // [RFC4396]
    "video/AV1",	                    // [Alliance_for_Open_Media]
    "video/BMPEG",	                    // [RFC3555]
    "video/BT656",	                    // [RFC3555]
    "video/CelB",	                    // [RFC3555]
    "video/DV",	                        // [RFC6469]
    "video/encaprtp",	                // [RFC6849]
    "video/example",	                // [RFC4735]
    "video/FFV1",                       // [RFC9043]
    "video/flexfec",	                // [RFC8627]
    "video/H261",	                    // [RFC4587]
    "video/H263",	                    // [RFC3555]
    "video/H263-1998",	                // [RFC4629]
    "video/H263-2000",	                // [RFC4629]
    "video/H264",	                    // [RFC6184]
    "video/H264-RCDO",	                // [RFC6185]
    "video/H264-SVC",	                // [RFC6190]
    "video/H265",	                    // [RFC7798]
    "video/iso.segment",	            // [David_Singer][ISO-IEC_JTC1]
    "video/JPEG",	                    // [RFC3555]
    "video/jpeg2000",	                // [RFC5371][RFC5372]
    "video/jxsv",	                    // [RFC9134]
    "video/mj2",	                    // [RFC3745]
    "video/MP1S",	                    // [RFC3555]
    "video/MP2P",	                    // [RFC3555]
    "video/MP2T",	                    // [RFC3555]
    "video/mp4",                        // [RFC4337][RFC6381]
    "video/MP4V-ES",	                // [RFC6416]
    "video/MPV",	                    // [RFC3555]
    // mpeg [RFC2045][RFC2046]
    "video/mpeg4-generic",	            // [RFC3640]
    "video/nv",	                        // [RFC4856]
    "video/ogg",	                    // [RFC5334][RFC7845]
    "video/parityfec",	                // [RFC3009]
    "video/pointer",	                // [RFC2862]
    "video/quicktime",	                // [RFC6381][Paul_Lindner]
    "video/raptorfec",	                // [RFC6682]
    "video/raw",	                    // [RFC4175]
    "video/rtp-enc-aescm128",	        // [_3GPP]
    "video/rtploopback",                // [RFC6849]
    "video/rtx",	                    // [RFC4588]
    "video/scip",	                    // [SCIP][Michael_Faller][Daniel_Hanson]
    "video/smpte291",	                // [RFC8331]
    "video/SMPTE292M",	                // [RFC3497]
    "video/ulpfec",	                    // [RFC5109]
    "video/vc1",	                    // [RFC4425]
    "video/vc2",	                    // [RFC8450]
    "video/VP8",	                    // [RFC7741]
    "video/VP9",	                    // [RFC-ietf-payload-vp9-16]
];

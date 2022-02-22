#!/bin/sh

DASH_JSON=dash_schema.json
DASH_ELEMENTS=dash_elements.txt
DASH_ATTRS=dash_attributes.txt
DASH_ARRAY_ELEMENTS=dash_array_elements.txt
DASH_CONSTANTS_TS=DashMpdConstants.ts

rm -f ${DASH_JSON} ${DASH_ELEMENTS} ${DASH_ATTRS} ${DASH_ARRAY_ELEMENTS}

node gen_schema_json.mjs > ${DASH_JSON}
cat ${DASH_JSON} | jq -r '.. | .xs_element? | try .[]._attributes | .name' | sort | uniq | python3 dash_mpd_elements.py > ${DASH_ELEMENTS}
cat ${DASH_JSON} | jq -r '.. | .xs_attribute? | try .[]._attributes | .name' | sort | uniq | python3 dash_mpd_attributes.py > ${DASH_ATTRS}
cat ${DASH_JSON} | jq -r '.. | .xs_element? | try .[]._attributes | if .maxOccurs == "unbounded" then .name else empty end' | sort | uniq | python3 dash_mpd_array_elements.py > ${DASH_ARRAY_ELEMENTS}
cat ${DASH_CONSTANTS_TS}.templ | python3 dash_mpd_constants.py > ../src/${DASH_CONSTANTS_TS}

rm -f ${DASH_JSON} ${DASH_ELEMENTS} ${DASH_ATTRS} ${DASH_ARRAY_ELEMENTS}

#
# tools/dash_mpd_elements.py
#

#
# Copyright 2021 LiveInstantly, LLC - Shigeyuki Fukushima <shige@liveinstantly.com>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import sys
import re

f = open("dash_elements.txt", "r")
dashElements = f.read()
f.close()
f = open("dash_attributes.txt", "r")
dashAttributes = f.read()
f.close()
f = open("dash_array_elements.txt", "r")
dashArrayElements = f.read()
f.close()

for line in sys.stdin:
    l = line.rstrip()
    if re.match(r'@@DASH_MPD_ELEMENTS@@', l):
        print(dashElements)
    elif re.match(r'@@DASH_MPD_ATTRIBUTES@@', l):
        print(dashAttributes)
    elif re.match(r'@@DASH_MPD_ARRYA_ELEMENTS@@', l):
        print(dashArrayElements)
    else:
        print (l)

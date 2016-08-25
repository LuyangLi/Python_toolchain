#!/bin/python

import os
import re

# for more information on regex please refers to this guide: https://docs.python.org/2/library/re.html

file_path = "d:\scpts\web"
pattern_src = r'(.*)pcap'
pattern_dist = r'filtered(.*)pcap'

pattern_src_obj = re.compile(pattern_src)

filelist = os.listdir(file_path)

for filename in filelist:

	match = pattern_src_obj.match(filename)
	print "match = " , match
	if match:
		print "pattern matched for" , filename
	else:
		print "pattern Not matched for" , filename

#pattern_src_obj = re.compile(pattern_dist)

#for filename in filelist:

#	match = pattern_src_obj.match(filename)
#	print "match = " , match
#	if match:
#		print "pattern matched for" , filename
#	else:
#		print "pattern Not matched for" , filename

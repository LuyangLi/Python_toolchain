#!/bin/python

# Modified from http://www.tutorialspoint.com/python/python_multithreading.htm
# 20160824 stable version

import threading
import time
import os
import random

exitFlag = 0
threadNum = 10 # Number of total threads.
file_path = "D:\scpts\\temp3\\" # working path
out_path = "d:\scpts\out\\"
outcome = []

class myThread (threading.Thread):
    def __init__(self, threadID, name, inputs):
        threading.Thread.__init__(self)
        self.threadID = threadID
        self.name = name
        self.inputs = inputs
    def update_inputs(self, inputs):
    	self.inputs = inputs
    def run(self):
        print "Starting " + self.name
        print "The input for this thread is: " + self.inputs
        
        #put your command here.
        #os.system("tshark -r %s%s -Y \"dns\" -w %sfiltered_%s" % (file_path,self.inputs,out_path,self.inputs))
        
        print "Exiting " + self.name
        outcome.append("%s" % self.inputs)
        

# Get the list here.

filelist = os.listdir(file_path)
list_size = len(filelist)
current_pos = 0

master = []
# Create new threads
print "list_size = %d" % list_size
for x in xrange(0,threadNum):
    master[x] = myThread(x, "Worker-%d" % x, "%s" % (filelist[current_pos]))
    master[x].start()
    current_pos += 1

while current_pos < list_size:
    x = 0
    for x in xrange(0,threadNum):
        if master[x].isAlive():
            print "x = %d" % x
            print "thread %s is busy." % master[x].name
            time.sleep(1)
            x = x - 1
            continue
        else:
            if current_pos >= list_size:
                print "current_pos = %d, jump." % current_pos
                break

            print "x = %d" % x
            print "current_pos = %d" % current_pos
            master[x] = myThread(x, "Worker-%d" % x, "%s" % (filelist[current_pos]))
            master[x].start()
            current_pos += 1

time.sleep(3)
print outcome
#!/bin/python
from __future__ import print_function


class display(object):
    """functions for status display"""
    lines = [] # y axis
    def __init__(self, xlimit = 80, ylimit = 20):
        super(display, self).__init__()
        
class Line(object):
		
	@staticmethod
	def banner(xlimit, content=''):
		overhead = 2
		return ('+{:=^%d}+' % (xlimit-overhead)).format(content)

	@staticmethod
	def log(xlimit, content=''):
		overhead = 4
		return ('| {: <%d} |' % (xlimit-overhead)).format(content)

	@staticmethod
	def msg(xlimit, header='', content=''):
		overhead = 4
		return ('| {: <%d} |' % (xlimit-overhead)).format(content)

xlimit = 75
print(Line.banner(xlimit,"Multi-threading batch scripts"))
print(Line.log(xlimit,"Multi-threading batch scripts, I wanted this to be very "))
print(Line.banner(xlimit))
		


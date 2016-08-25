#!/bin/python

from __future__ import print_function
import time
import sys # argv, stdout

default_log_path = "d:\\toolchain\logger.log"

def diff_now(start):
	' This function returns a time diff value in (double) seconds '
	try:
		diff = time.time() - start
		return diff
	except Exception, e:
		raise e

def str_short_now_local():
	' This function returns a local timestamp string in HH:MM:SS format '
	return time.strftime("%H:%M:%S", time.localtime())

def str_short_now_gmt():
	' This function returns an gmt timestamp string in HH:MM:SS format '
	return time.strftime("%H:%M:%S UTC", time.gmtime())

def str_long_now_local():
	' This function returns a local timestamp string in HH:MM:SS format '
	return time.strftime("%y-%m-%d %H:%M:%S", time.localtime())

def str_long_now_gmt():
	' This function returns an gmt timestamp string in HH:MM:SS format '
	return time.strftime("%y-%m-%d %H:%M:%S UTC", time.gmtime())

def str_diff(stop, start):
	""" This function returns time diff string in 00d 00h 00m 00s 
		if stop < start, a negative sign would appear at the beginning.
	"""
	diff = int(stop - start)
	sign = ""
	if diff < 0:
		diff = -diff
		sign = "-"
	S = diff % 60
	M = (diff / 60) % 60
	H = (diff / 3600) % 24
	D = diff / 86400

	if D != 0: # More than a day
		return "%s%02dd %02dh %02dm %02ds" % (sign, D, H, M, S)
	else:
		if H != 0: # less than a day but more than an hour
			return "%s%02dh %02dm %02ds" % (sign, H, M, S)
		else: # less than an hour
			return "%s%02dm %02ds" % (sign, M, S)


class loggerWorker(object):
	"""docstring for loggerWorker"""
	def __init__(self, 
		log_path = default_log_path, 
		append = True, 
		display_level = "INFO"):

		super(loggerWorker, self).__init__()
		self.log_path = default_log_path
		self.append = append
		try:
			if self.append:
				self.log_obj = open(self.log_path, "a+")
			else:
				self.log_obj = open(self.log_path, "w+")
			self.actived = True

		except Exception, e:
			self.actived = False
			raise e

	def log_info(self, fmt, *args):
		line = "[INF] %s>" % str_long_now_local()
		sys.stdout.write((line + fmt + "\n") % args)
		self.log_obj.write((line + fmt + "\n") % args)
	def log_debug(self, fmt, *args):
		line = "[DBG] %s>" % str_long_now_local()
		sys.stdout.write((line + fmt + "\n") % args)
		self.log_obj.write((line + fmt + "\n") % args)
	def log_warn(self, fmt, *args):
		line = "[WRN] %s>" % str_long_now_local()
		sys.stdout.write((line + fmt + "\n") % args)
		self.log_obj.write((line + fmt + "\n") % args)
	def log_err(self, fmt, *args):
		line = "[ERR] %s>" % str_long_now_local()
		sys.stdout.write((line + fmt + "\n") % args)
		self.log_obj.write((line + fmt + "\n") % args)

	def kill(self):
		try:
			self.log_obj.close()
			print("fcolsed = %s" % self.log_obj.closed)
		except Exception, e:
			raise e
		


print("trying to initialise the logger at %s" % default_log_path)

tempLog = loggerWorker()
tempLog.log_info("This is a new line: %d, epoch = %s", 123, time.time())
tempLog.log_debug("some debug messege")
tempLog.log_warn("Things ain't good...")
tempLog.log_err("Huston, we have a problem at %s", str_long_now_gmt())
tempLog.kill()



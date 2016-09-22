import os

firstLineLabel = True
filterColumn = 6
openFileName = 'MNL_Cells_lte.csv'

source = open(openFileName, 'r')

columnLable = source.readline()



for line in source:
	fields = line.split(',')
	if os.path.isfile(openFileName + '_filtering_' + fields[filterColumn-1] + '.csv'):
		dest = open((openFileName + '_filtering_' + fields[filterColumn-1] + '.csv'), 'a+')
		dest.write(line)
	else:
		dest = open((openFileName + '_filtering_' + fields[filterColumn-1] + '.csv'), 'a+')
		dest.write(columnLable)
		dest.write(line)
	dest.close()

source.close()


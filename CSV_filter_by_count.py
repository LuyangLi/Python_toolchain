import os

firstLineLabel = True
#filterColumn = 6
batchMax = 200
openFileName = 'MNL_Sites_lte.csv'

source = open(openFileName, 'r')

columnLable = source.readline()

iteration = 1
i = 1
dest = open((openFileName + '_batch_' + str(iteration) + '.csv'), 'a+')
dest.write(columnLable)

for line in source:
	if i >= batchMax and line != "": # create a new file and i == 1
		dest.close()
		iteration += 1
		dest = open((openFileName + '_batch_' + str(iteration) + '.csv'), 'a+')
		dest.write(columnLable)
		dest.write(line)
		i = 1
	elif line == "":
		dest.close()
	else:
		dest.write(line)
		i += 1

source.close()


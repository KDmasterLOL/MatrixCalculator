# Create, edit & delete files online
from functools import reduce
from math import sqrt


def make_markdown_table(array):
    """Input: Python list with rows of table as lists
               First element as header.
        Output: String to put into a .md file

    Ex Input:
        [["Name", "Age", "Height"],
         ["Jake", 20, 5'10],
         ["Mary", 21, 5'7]]
    """

    markdown = "\n" + str("| ")

    for e in array[0]:
        to_add = " " + str(e) + str(" |")
        markdown += to_add
    markdown += "\n"

    markdown += "|"
    for i in range(len(array[0])):
        markdown += str("-------------- | ")
    markdown += "\n"

    for entry in array[1:]:
        markdown += str("| ")
        for e in entry:
            to_add = str(e) + str(" | ")
            markdown += to_add
        markdown += "\n"

    return markdown + "\n"


res = []
for n in range(1, 16):
    res.append(round(pow(35 / 36, n), 4))
sum_X = reduce(lambda x, y: x + y, res)
over_x = sum_X / 15

sigma = sqrt(reduce(lambda x, y: x + pow(y - over_x, 2), res) / 15)

print(sigma, reduce(lambda x, y: x + pow(y - over_x, 2), res))


# print(make_markdown_table([range(1,len(res+1)),res]))

# AC
import math

n = input()
string_length_limit = 100000
alpha = 0
result = ""
while True:
    if n < string_length_limit:
        break
    rt = int(math.sqrt(n))
    add = ((chr(97+alpha)+chr(97+alpha+1))*rt)[:-1]
    alpha += 2
    string_length_limit -= len(add)
    result += add
    n -= rt*rt

add = chr(97+alpha)+chr(97+alpha+1)+chr(97+alpha+2)
alpha += 3
result += add*(n/3) + add[:n%3]

print result


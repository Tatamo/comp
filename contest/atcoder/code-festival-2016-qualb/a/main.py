s = raw_input()
rs = "CODEFESTIVAL2016"
result = 0
for i, c in enumerate(s):
    if(c != rs[i]) :
        result += 1
print result


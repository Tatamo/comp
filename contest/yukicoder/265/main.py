#UNDONE
n = input()
d = input()
s = raw_input()

print n, d, s

a = [0 for x in xrange(d+1)]

digits = [str(x+1) for x in xrange(9)]

def diff(xdim, times) :
    if(times == 0) :
        return (1, xdim)
    if(xdim == 0) : # x^0を微分しようとした場合0に
        return (0, 0)
    result = diff(xdim-1, times-1)
        return (xdim * result[0], result[1])

class Parse:
    def __init__(self) :
    def parse(self, index=0, d=0, xdim=0, coef=1) :
        if s[index] == "d" and s[index+1] == "{" :
            parse(index+2, d+1, xdim, coef)
        elif s[index] in digits :
            parse(index+1, d, xdim, int(s[index]))
        elif s[index] == "x" :
            parse(index+1, d, xdim+1, coef)
        elif s[index] == "*" :
            parse(index+1, d, xdim, coef)
        elif s[index] == "+" :
            tmp = diff(xdim, d)
                a[tmp[1]] += coef*tmp[0]


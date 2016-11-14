#TLE

# print (lambda f: (lambda x: f(lambda y: x(x)(y)))(lambda x: f(lambda y: x(x)(y))))(lambda f: lambda n: n%2+f(n/2) if n>0 else 0)(input()*2)%10045358091004535809

n = input()*2
result = 0;
while(n>0):
    result += n&1
    n >>= 1
print result%10045358091004535809

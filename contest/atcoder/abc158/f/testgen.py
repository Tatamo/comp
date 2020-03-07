import random
#n = random.randint(1, 10**5)
n = 200000
print n

for i in xrange(n):
    print random.randint(-10**9, 10**9), random.randint(1, 10**9)

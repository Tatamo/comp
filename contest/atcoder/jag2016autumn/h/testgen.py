import random
w = 0
h = 0
while(w%2 == 0):
    w = random.randint(1, 10**5)
while(h%2 == 0):
    h = random.randint(1, 3)
k = random.randint((w+1)/2, (w+1)/2 * ((h+1)/2))
#k = (w+1)/2 * ((h+1)/2) - 2
print w, h, k
n = random.randint(0, 10**4)
print n

for i in xrange(n):
    print random.randint(1, w), random.randint(1, h)


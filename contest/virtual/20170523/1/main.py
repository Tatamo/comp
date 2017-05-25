# ARC062 C
n = input()
t = []
a = []
c_t = 1
c_a = 1
for i in xrange(n):
    p,q = map(int, raw_input().split())
    t.append(p)
    a.append(q)

for i in xrange(n):
    if t[i] >= c_t and a[i] >= c_a:
        c_t = t[i]
        c_a = a[i]
    else:
        m = max(-(-c_t/t[i]), -(-c_a/a[i]))
        c_t = t[i]*m
        c_a = a[i]*m

print c_t+c_a


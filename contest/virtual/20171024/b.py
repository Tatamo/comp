n, x = map(int, raw_input().split())
h =  map(int, raw_input().split())
a = [[] for i in xrange(n)]
for i in xrange(n-1) :
    p1, p2 = map(int, raw_input().split())
    a[p1-1].append(p2-1)
    a[p2-1].append(p1-1)

def dfs(pos, back) :
    length = 1
    skip = h[pos] != 1
    for to in a[pos] :
        if to == back :
            continue
        tmp = dfs(to, pos)
        if not tmp[1] :
            skip = False
            length += tmp[0]
    if skip :
        length = 0
    return (length, skip)

print max((dfs(x-1, -1)[0] - 1) * 2, 0)


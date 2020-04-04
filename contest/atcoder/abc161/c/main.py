# -*- coding: utf-8 -*-
n, k = map(int, input().split())
print(min(n%k, -n%k))
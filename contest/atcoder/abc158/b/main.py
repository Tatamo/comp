n, a, b = map(int, input().split())

result = 0
result += n // (a+b)
result += min(a, n%(a+b))
print(result)
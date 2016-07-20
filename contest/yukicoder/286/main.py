# coding: utf-8
# WA
import random

# GA

n = input()
m = []
for i in range(n):
    m.append((i,input()))

def generateGene():
    tmp = []
    table = m[:]
    for x in xrange(n):
	i = random.randint(0,len(table)-1)
	tmp.append(table[i])
	del(table[i])
    return tmp

class Individual:
    def __init__(self, gene):
        self.gene = gene
	self.value = 0
	self.eval()
    def eval(self):
	discount = 0
	self.value = 0
	for id,c in self.gene:
	    self.value += max(c-discount,0)
	    discount = (discount+c)%1000

class Solver:
    def __init__(self, data):
        self.NUM_POP = 74 # 少なくとも2以上かつ偶数にして
        self.GENERATION = 300
        self.MUTANTRATE_RATE = 50 # ‰
        self.data = data

    def swap_mutantrate(self, pop):
        # 突然変異を発生させる
        # 交換
        for i,s in enumerate(pop):
            if(i<2) : # トップ2個体はそのまま保持
                continue
            rand = random.randint(1,1000)
            if(rand <= self.MUTANTRATE_RATE):
                # ランダムな遺伝子2つを入れ替える
                a,b = (random.randint(0,len(self.data)-1),random.randint(0,len(self.data)-1)) # 選択位置が重複しないとは言っていない
                tmp = s.gene[a]
                s.gene[a] = s.gene[b]
                s.gene[b] = tmp
                s.eval()

    def insert_mutantrate(self, pop):
        # 突然変異を発生させる
        # 挿入
        for i,s in enumerate(pop):
            if(i<2) : # トップ2個体はそのまま保持
                continue
            rand = random.randint(1,1000)
            if(rand <= self.MUTANTRATE_RATE):
                # ランダムな場所から要素を抜き出し、ランダムな場所に再挿入
                a,b = (random.randint(0,len(self.data)-1),random.randint(0,len(self.data)-1)) # 選択位置が重複しないとは言っていない
                tmp = s.gene[a]
                del(s.gene[a])
                s.gene = s.gene[:b]+[tmp]+s.gene[b:]
                s.eval()


    def crossover(self, pop, prob_table):
            # 2個体pickする
            count = 0
            prob_sum = sum(prob_table)
            r1 = random.randint(0, prob_sum)
            r2 = random.randint(0, prob_sum)
            parent1 = parent2 = None
            for i,s in enumerate(pop):
                count += prob_table[i]
                if(count>=r1):
                    parent1 = s
                if(count>=r2):
                    parent2 = s
                if(parent1 != None and parent2 != None):
                    break
            children = self.pmx(parent1, parent2)
            #print [s.gene for s in (parent1,parent2,children[0], children[1])]
            return children
    #Partially-mapped crossover http://homepage3.nifty.com/ono-t/GA/GA-order.html#PMX
    def pmx(self, parent1, parent2):
        a,b = (random.randint(0,len(self.data)),random.randint(0,len(self.data)))
        first, second = min(a,b), max(a,b)
        child1 = Individual(parent1.gene[:])
        child2 = Individual(parent2.gene[:])
        # まず選択部分を交叉する
        for i in xrange(first, second):
            child1.gene[i] = parent2.gene[i]
            child2.gene[i] = parent1.gene[i]
        c1m = child1.gene[first:second]
        c2m = child2.gene[first:second]

        # 交叉対象に含まれた要素を、対応する要素に変更する
        for i in xrange(len(self.data)):
            for ii in xrange(second-first):
                if(child1.gene[i] == c1m[ii]):
                    child1.gene[i] = c2m[ii]
                if(child2.gene[i] == c2m[ii]):
                    child2.gene[i] = c1m[ii]

        child1.eval()
        child2.eval()
        return (child1, child2)
    def solve(self):
        # 最初の個体群をランダム生成
        pop = [Individual(generateGene()) for x in xrange(self.NUM_POP)]
        for gc in xrange(self.GENERATION):

            min_val = sum([c for i, c in self.data])
            max_val = -1
            top_index = -1
            top2_index = -1

            # 評価補助テーブル生成
            for i,s in enumerate(pop):
               # print "max:" , max_val, "min:", min_val, ",", s.gene, s.value
                if(s.value < min_val):
                    min_val = s.value
                    top2_index = top_index
                    top_index = i
                if(s.value > max_val):
                    max_val = s.value


            #print "top:", min_val
            pickup_table = [0]*self.NUM_POP
            for i in xrange(self.NUM_POP):
                pickup_table[i] = max_val - pop[i].value + 1 # 0にならないよう1足す
            #print pickup_table

            # 評価の高さに基づいた確率により個体を交叉させ新個体を生成
            left = self.NUM_POP - 2
            top_s = Individual(pop[top_index].gene[:])
            top2_s = Individual(pop[top2_index].gene[:])
            # トップ2個体はそのまま残す
            new_pop = [top_s, top2_s]

            while(left>0):
                new_pop += self.crossover(pop, pickup_table)
                # 生成した新個体をテーブルに追加
                left -= 2
            # 突然変異
            self.insert_mutantrate(new_pop)
            pop = new_pop

        top = pop[0] 
        for s in pop:
            #print [g[0] for g in s.gene]
            if(s.value < top.value):
                top = s
        #print [s.value for s in pop]

        print top.value


Solver(m).solve()


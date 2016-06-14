#include<iostream>
#include<algorithm>

#define ANS(n) {cout << n << endl; return 0;}

using namespace std;

typedef long long ll;

int* cloneTree(int* tr){
	int *clone = new int[3];
	for(int i=0; i<3; i++){
		clone[i] = tr[i];
	}
	return clone;
}

bool check(int* tr){
	if(tr[0] == tr[1] || tr[1] == tr[2] || tr[2] == tr[0]) return false;
	if(tr[0] < tr[1] && tr[1] > tr[2]) return true;
	if(tr[0] > tr[1] && tr[1] < tr[2]) return true;
	return false;
}

// AC
int main(){
	int d;
	cin >> d;

	int *h = new int[3];
	for(int i=0; i<3; i++){
		cin >> h[i];
	}

	// 最初から条件を満たしている
	if(check(h)) ANS(0)
	else if(d==0) ANS(-1) // むり

	bool flg_skip = false;

	// all same
	if(h[0] == h[1] && h[1] == h[2]){
		if(h[0] == 0) ANS(-1) // むり
		else if(h[0] - d > 0) ANS(3)
		else ANS(-1)
	}

	// 左右どちらかが飛び出していて残り2つは同じ
	else if( (h[0] == h[1] && h[0] < h[2]) ||
		(h[1] == h[2] && h[0] > h[1]) ){
		if(h[1] == 0) ANS(-1)
		else ANS(1)
	}

	// 左右どちらかだけ低い
	else if( (h[0] == h[1] && h[0] > h[2]) ||
		(h[1] == h[2] && h[0] < h[1]) ){
		if(min(h[0], h[2]) == 0){
			if(h[1]-d >0) ANS(1)
			else ANS(-1)
		}
		else {
			if(h[1]-d != min(h[0], h[2])) ANS(1) // 低くない方の左右端を削る
			else ANS(2)
		}
	}
	
	// 真ん中だけが飛び出している
	else if(h[0] == h[2]){
		// 真ん中が大きい
		if(h[0] < h[1]){
			if(h[0] == 0) ANS(-1)
			else ANS(1)
		}
		// 真ん中が小さい
		else{
			// 真ん中が0
			if(h[1] == 0){
				if(h[0]-d <= 0) ANS(-1)
				else ANS(1)
			}
			else{
				if(h[0]-d > h[1]) ANS(1)
				else { // 階段状
					if(h[0]-d <= 0) ANS(-1)
					else if(h[0]-d == h[1]) ANS(2)
					else ANS(3)
				}
			}
		}
	}
	// 階段状
	else if((h[0] > h[1] && h[1] > h[2]) ||
			(h[0] < h[1] && h[1] < h[2]) ){
		int result=-1;
		int cnt=0;
		int c_h = h[1];
		int* clone = cloneTree(h);

		int lower = h[0]<h[2]?0:2;
		int l_h = h[lower];
		int higher = h[0]>h[2]?0:2;
		int h_h = h[higher];

		if(l_h == 0){
			int tmp;
			tmp = (h_h - c_h) /d + 1; // 高いところ削る
			if(h_h - d*tmp == c_h){
				if(h_h-d*(tmp+1) > 0) ANS(tmp+1)
				else ANS(-1)
			}
			else if(h_h - d*tmp <= 0) ANS(-1)
			else ANS(tmp)
		}
		int tmp;
		tmp = (c_h - l_h) / d + 1; // 真ん中削る
		int tmp2;
		tmp2 = (h_h - c_h) / d + 1; // 高いところ削る
		if(h_h - d*tmp2 == c_h){ // 削ったら真ん中と同じ高さになった
			if(h_h - d*(tmp2+1) != l_h) tmp2 = tmp2+1; // もう1回削ったらいけた
			else{ // もう1回削ったら低い方と同じ高さになった
				tmp2 = tmp2+2; // さらに1回削ればいけるんじゃね
			}
		}
		result = tmp;
		if(tmp2 != -1) result = min(result, tmp2);
		ANS(result)


		cnt = 0;
		clone = cloneTree(h);
		while(h_h>0) {// 高い方削ってみる
			cnt++;
			h_h -= d;
			if(h_h < 0) h_h = 0;
			clone[higher] = h_h;
			if(check(clone)){
				tmp=min(cnt,tmp);
				break;
			}
		}
		ANS(tmp)
	}

	// 多分ここには来ない
	ANS(-1);

}


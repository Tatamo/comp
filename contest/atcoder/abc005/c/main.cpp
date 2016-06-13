#include<iostream>
#include<queue>

using namespace std;

// AC
int main(){
	int t,n,m;
	cin >> t;
	cin >> n;
	queue<int> a;
	for(int i=0; i<n; i++){
		int tmp;
		cin >> tmp;
		a.push(tmp);
	}
	cin >> m;
	queue<int> b;
	for(int i=0; i<m; i++){
		int tmp;
		cin >> tmp;
		b.push(tmp);
	}

	bool flg = true;
	while(!a.empty()){
		if(b.empty()){
			// 客をすべて捌いた
			break;
		}
		int takoyaki = a.front();
		a.pop();
		int customer = b.front();
		if(takoyaki <= customer && takoyaki + t >= customer){
			// 売れる
			b.pop();
		}
		else if(takoyaki > customer){
			// 売れない客が発生
			flg = false;
			break;
		}
	}
	if(!b.empty()) flg = false;

	if(flg){
		cout << "yes" << endl;
	}
	else {
		cout << "no" << endl;
	}

	return 0;
}

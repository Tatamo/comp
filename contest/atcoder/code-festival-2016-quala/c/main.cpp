#include<iostream>
#include<utility>
#include<string>
#include<vector>

using namespace std;
#define DBG(x) cerr << #x << ": " << x << endl
// http://genkisugimoto.com/jp/blog/procon/2015/04/15/print-debug-technique-in-cpp.html
template<typename T1, typename T2> ostream& operator<<(ostream& s, const pair<T1, T2>& p) {return s << "(" << p.first << ", " << p.second << ")";}

template<typename T> ostream& operator<<(ostream& s, const vector<T>& v) { for (int i = 0; i < v.size(); ++i) { s << v[i]; if (i < v.size() - 1) s << "\t"; } return s; }

typedef long long ll;

// 
int main(){
	string s;
	cin >> s;
	int k;
	cin >> k;
	int l = s.length();
	vector<int> a(l);
	for(int i=0; i<l; i++){
		a[i] = s[i]-'a';
	}
	for(int i=0; i<l; i++){
		if(a[i] == 0) continue; // 最初からaなら処理しないほうがよい
		if(26-a[i] <= k){
			int d = 26-a[i];
			k-=d;
			//k -= 26-a[i];
			a[i] = 0;
			DBG(d);
			DBG(k);
		}
	}
	if(k>0){
		k%=26;
		a[l-1] = (a[l-1]+k)%26;
	}

	for(int i=0; i<s.length(); i++){
		cout << (char)(a[i]+97);
	}
	cout << endl;

	return 0;
}


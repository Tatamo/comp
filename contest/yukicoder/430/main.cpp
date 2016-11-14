#include<iostream>
#include<utility>
#include<vector>
#include<string>

using namespace std;
#define cerr cerr << "[DBG] "
#define DBG(x) cerr << #x << ": " << x << endl
// http://genkisugimoto.com/jp/blog/procon/2015/04/15/print-debug-technique-in-cpp.html
template<typename T1, typename T2> ostream& operator<<(ostream& s, const pair<T1, T2>& p) {return s << "(" << p.first << ", " << p.second << ")";}

template<typename T> ostream& operator<<(ostream& s, const vector<T>& v) { for (int i = 0; i < v.size(); ++i) { s << v[i]; if (i < v.size() - 1) s << "\t"; } return s; }

typedef long long ll;
typedef unsigned long long ull;

const ull B=100000007;

// 蟻本p332写経
int count(string s, string c){
	int result = 0;
	int sl = s.length();
	int cl = c.length();
	if(cl > sl) return 0;

	// t=B^cl
	ull t = 1;
	for(int i=0; i<cl; i++) t*=B;

	// ハッシュ計算
	ull ch=0, sh=0;
	for(int i=0; i<cl; i++) ch = ch*B+c[i];
	for(int i=0; i<cl; i++) sh = sh*B+s[i];

	// 数える
	for(int i=0; i+cl<=sl; i++){
		if(ch == sh) result++;
		if(i+cl < sl) sh = sh*B + s[i+cl] - s[i]*t; // sのハッシュを1文字文ずらす
	}
	return result;
}

// AC
int main(){
	string s;
	cin >> s;
	int m;
	cin >> m;
	ll result = 0;
	for(int i=0; i<m; i++){
		string c;
		cin >> c;
		result += count(s, c);
	}

	cout << result << endl;

	return 0;
}


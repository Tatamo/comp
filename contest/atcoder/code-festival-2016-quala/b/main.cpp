#include<iostream>
#include<utility>
#include<vector>

using namespace std;
#define DBG(x) cerr << #x << ": " << x << endl
// http://genkisugimoto.com/jp/blog/procon/2015/04/15/print-debug-technique-in-cpp.html
template<typename T1, typename T2> ostream& operator<<(ostream& s, const pair<T1, T2>& p) {return s << "(" << p.first << ", " << p.second << ")";}

template<typename T> ostream& operator<<(ostream& s, const vector<T>& v) { for (int i = 0; i < v.size(); ++i) { s << v[i]; if (i < v.size() - 1) s << "\t"; } return s; }

typedef long long ll;

// AC
int main(){
	int n;
	cin >> n;
	int result = 0;
	vector<int> a(n+1);
	for(int i=1; i<=n; i++){
		cin >> a[i];
		int zibun = i;
		int suki = a[i];
		if(suki > zibun){
			continue;
		}
		else { // 自分の番号より好きな相手の番号のほうが小さい
			if(a[suki] == zibun){
				result++;
			}
		}
	}
	cout << result << endl;

	return 0;
}


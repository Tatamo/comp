#include<iostream>
#include<utility>
#include<vector>

using namespace std;
#define cerr cerr << "[DBG] "
#define DBG(x) cerr << #x << ": " << x << endl
// http://genkisugimoto.com/jp/blog/procon/2015/04/15/print-debug-technique-in-cpp.html
template<typename T1, typename T2> ostream& operator<<(ostream& s, const pair<T1, T2>& p) {return s << "(" << p.first << ", " << p.second << ")";}

template<typename T> ostream& operator<<(ostream& s, const vector<T>& v) { for (int i = 0; i < v.size(); ++i) { s << v[i]; if (i < v.size() - 1) s << "\t"; } return s; }

typedef long long ll;

// AC
int main(){
	int n;
	cin >> n;
	int result;
	for(int i=0; i<n; i++){
		int x,y;
		cin >> x >> y;
		int tmp = y-x;
		if(i==0) result = tmp;
		if(tmp <= 0 || result != tmp) goto FAILED;
	}

	cout << result << endl;
	return 0;
FAILED:
	cout << -1 << endl;
	return 0;
}


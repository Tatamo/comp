#include<iostream>
#include<utility>
#include<vector>

using namespace std;
#define cerr cerr << "[DBG] "
#define DBG(x) cerr << #x << ": " << x << endl
// http://genkisugimoto.com/jp/blog/procon/2015/04/15/print-debug-technique-in-cpp.html
template<typename T1, typename T2> ostream& operator<<(ostream& s, const pair<T1, T2>& p) {return s << "(" << p.first << ", " << p.second << ")";}

template<typename T> ostream& operator<<(ostream& s, const vector<T>& v) { for (int i = 0; i < (int)v.size(); ++i) { s << v[i]; if (i < (int)v.size() - 1) s << "\t"; } return s; }

typedef long long ll;
typedef pair<int, int> ip;

// AC
int main(){
	int n,m;
	cin >> n >> m;
	vector<ip> bar;
	bar.reserve(n);
	for(int i=0; i<n; i++){
		int l, r;
		cin >> l >> r;
		bar.push_back(make_pair(l,r));
	}
	vector<int> d(m, 0);
	for(int i=0; i<n; i++){
		d[bar[i].first] += 1;
		if(bar[i].second+1 < m){
			d[bar[i].second+1] -= 1;
		}
	}
	//DBG(d);
	vector<int> s(m);
	int c = 0;
	for(int i=0; i<m; i++){
		c += d[i];
		s[i] = c;
	}
	//DBG(s);
	vector<int> count((m+1)/2, 0);
	for(int i=0; i<(int)count.size(); i++){
		count[i] += s[i];
		count[i] += s[m-1-i];
	}
	//DBG(count);
	for(int i=0; i<(int)count.size(); i++){
		if(count[i] > 2) {
			cout << "NO" << endl;
			return 0;
		}
	}
	cout << "YES" << endl;
	return 0;
}


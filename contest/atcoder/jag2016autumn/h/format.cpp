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

// UNDONE
int main(){
	int w, h, k;
	cin >> w >> h >> k;
	int n;
	cin >> n;
	vector<pair<int, int> > r;
	for(int i=0; i<n; i++){
		int x, y;
		cin >> x >> y;
		bool flg = true;
		for(int ii=0; ii<r.size(); ii++){
			if(r[ii].first == x && r[ii].second == y){
				flg = false;
				break;
			}
		}
		if(flg) r.push_back(make_pair(x,y));
	}
	cout << w << " " <<  h << " " << k << endl;
	cout << r.size() << endl;
	for(int i=0; i<r.size(); i++){
		cout << r[i].first << " " << r[i].second << endl;
	}

	return 0;
}


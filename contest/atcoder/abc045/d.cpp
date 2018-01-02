#include<iostream>
#include<utility>
#include<string>
#include<vector>
#include<map>

using namespace std;
#define cerr cerr << "[DBG] "
#define DBG(x) cerr << #x << ": " << x << endl
// http://genkisugimoto.com/jp/blog/procon/2015/04/15/print-debug-technique-in-cpp.html
template<typename T1, typename T2> ostream& operator<<(ostream& s, const pair<T1, T2>& p) {return s << "(" << p.first << ", " << p.second << ")";}

template<typename T> ostream& operator<<(ostream& s, const vector<T>& v) { for (int i = 0; i < v.size(); ++i) { s << v[i]; if (i < v.size() - 1) s << "\t"; } return s; }

typedef long long ll;

main(){
	ll h, w, n;
	cin >> h >> w >> n;
	vector<pair<int,int>> v;
	for(int i=0;i<n;i++){
		int a,b;
		cin >> a >> b;
		v.push_back(make_pair(a-1,b-1));
	}
	map<pair<ll,ll>, ll> m;
	for(int i=0;i<n;i++){
		for(int dy=-1;dy<=1;dy++){
			for(int dx=-1;dx<=1;dx++){
				ll fx = v[i].second + dx;
				ll fy = v[i].first + dy;
				if(fx <= 0 || fx >= w-1 ||
						fy <= 0 || fy >= h-1) continue;
				auto p = make_pair(fx,fy);
				if(m.find(p)!=m.end()){
					m[p]++;
				}
				else{
					m[p]=1;
				}
			}
		}
	}
	vector<ll> result(10,0);
	ll sum = 0;
	for(auto itr=m.begin(); itr!=m.end();itr++){
		result[itr->second] += 1;
		sum++;
	}
	result[0] = (h-2)*(w-2)-sum;

	for(int i=0; i<10; i++){
		cout << result[i] << endl;
	}
}

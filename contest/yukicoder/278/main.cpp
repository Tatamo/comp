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

// AC
int main(){
	ll n;
	cin >> n;
	// n:偶数→ n/2の約数の総和
	// n:奇数→ nの約数の総和
	ll m;
	if(n%2 == 0){
		m = n/2;
	}
	else {
		m = n;
	}

	ll x = m;
	vector<pair<ll, ll>> c;
	for(ll i=2; i*i<=m; i++){
		if(m%i != 0) {
			continue;
		}
		ll cnt = 0;
		while(x%i == 0){
			x /= i;
			cnt+=1;
		}
		c.push_back(make_pair(i,cnt));
	}
	if(x > 1) {
		bool flg = true;
		for(int i=0; i<(int)c.size(); i++){
			if(c[i].first == x){
				c[i].second += 1;
				flg = false;
				break;
			}
		}
		if(flg){
			c.push_back(make_pair(x, 1));
		}
	}
	//cerr << c << endl;

	ll result = 1;
	for(ll i=0; i<(int)c.size(); i++){
		ll p = c[i].first;
		ll cnt = c[i].second;

		ll tmp = 1;
		ll x = 0;
		for(ll ii=0; ii<=cnt; ii++){
			x += tmp;
			if(ii<cnt) tmp *= p;
		}
		result *= x;
	}

	cout << result << endl;

	return 0;
}


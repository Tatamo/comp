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

ll gcd(ll a, ll b){
	if(a>b) swap(a,b);
	ll r;
	while((r=a%b)!=0){
		a = b;
		b = r;
	}
	return b;
}

int main(){
	int n;
	ll z;
	cin >> n >> z;
	auto a = vector<ll>(n);
	for(int i=0; i<n; i++){
		cin >> a[i];
	}

	ll result = 1;
	auto g = vector<ll>(n);
	for(int i=0; i<n; i++){
		g[i] = gcd(z, a[i]);
		result = result/gcd(result,g[i])*g[i];
	}

	cout << result << endl;
	return 0;
}


#include<iostream>
#include<utility>
#include<vector>
#include<algorithm>

using namespace std;
#define cerr cerr << "[DBG] "
#define DBG(x) cerr << #x << ": " << x << endl
// http://genkisugimoto.com/jp/blog/procon/2015/04/15/print-debug-technique-in-cpp.html
template<typename T1, typename T2> ostream& operator<<(ostream& s, const pair<T1, T2>& p) {return s << "(" << p.first << ", " << p.second << ")";}

template<typename T> ostream& operator<<(ostream& s, const vector<T>& v) { for (int i = 0; i < v.size(); ++i) { s << v[i]; if (i < v.size() - 1) s << "\t"; } return s; }

typedef long long ll;

// AC
int main(){
	int w,h;
	cin >> w >> h;
	vector<int> p(w);
	vector<int> p_sorted(w);
	ll sp = 0;
	for(int i=0; i<w; i++){
		cin >> p[i];
		p_sorted[i] = p[i];
		sp += p[i];
	}
	sort(p_sorted.begin(), p_sorted.end());
	vector<int> q(h);
	vector<int> q_sorted(h);
	for(int i=0; i<h; i++){
		cin >> q[i];
		q_sorted[i] = q[i];
	}
	sort(q_sorted.begin(), q_sorted.end());

	vector<ll> q_sum(h+1);
	q_sum[0] = 0;
	for(int i=0; i<h; i++){
		q_sum[i+1] = q_sum[i]+q_sorted[i];
	}

	ll result = sp+q_sum[h];
	for(int i=0; i<w; i++){
		int index = lower_bound(q_sorted.begin(), q_sorted.end(), p_sorted[i]) - q_sorted.begin();
		result += (ll)p_sorted[i]*(h-index);
		result += q_sum[index];
	}
	cout << result << endl;
	return 0;
}


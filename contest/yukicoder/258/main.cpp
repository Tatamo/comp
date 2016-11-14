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
	int n;
	cin >> n;
	vector<int> v(n);
	for(int i=0; i<n; i++){
		cin >> v[i];
	}

	// dp[i]:i番目の寿司を食う場合の最大の美味しさの合計とその寿司列
	vector< pair< int, vector<int> > > dp(n);
	// init dp
	for(int i=0; i<n; i++){
		vector<int> sushilist;
		dp[i] = make_pair(0, sushilist);
	}

	for(int i=0; i<n; i++){
		if(i==0 || i==1){
			dp[i].first = v[i];
			dp[i].second.push_back(i);
		}
		else if(i==2){
			dp[i].first = dp[i-2].first + v[i];
			dp[i].second = dp[i-2].second;
			dp[i].second.push_back(i);
		}
		else{
			if(dp[i-2] >= dp[i-3]){
				dp[i].first = dp[i-2].first + v[i];
				dp[i].second = dp[i-2].second;
				dp[i].second.push_back(i);
			}
			else {
				dp[i].first = dp[i-3].first + v[i];
				dp[i].second = dp[i-3].second;
				dp[i].second.push_back(i);
			}
		}
	}

	int result_index = 0;
	int result_sum;
	vector<int> sushilist;
	if(n>1){
		if(dp[n-2].first >= dp[n-1].first){
			result_index = n-2;
		}
		else{
			result_index = n-1;
		}
	}
	result_sum = dp[result_index].first;
	sushilist = dp[result_index].second;
	cout << result_sum << endl;
	for(int i=0; i<(int)sushilist.size(); i++){
		cout << sushilist[i]+1 << " ";
	}
	cout << endl;

	return 0;
}


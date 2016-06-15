#include<iostream>
#include<vector>
#include<algorithm>

using namespace std;

const int INF=1<<30;

// AC
// 解説よみました
int main(){
	int n;
	cin >> n;
	vector<int> c(n);
	for(int i=0; i<n; i++){
		cin >> c[i];
	}
	vector<int> dp(n+1, INF);
	dp[0] = -INF;

	for(int i=0; i<n; i++){
		int index = distance(dp.begin(), lower_bound(dp.begin(), dp.end(), c[i]));
		dp[index] = min(dp[index], c[i]);
	}
	int max_length = distance(dp.begin(), lower_bound(dp.begin(), dp.end(), INF)) -1;
	int result = n - max_length;
	cout << result << endl;
	return 0;
}

#include<iostream>
#include<utility>
#include<vector>
#include<queue>

using namespace std;
#define cerr cerr << "[DBG] "
#define DBG(x) cerr << #x << ": " << x << endl
// http://genkisugimoto.com/jp/blog/procon/2015/04/15/print-debug-technique-in-cpp.html
template<typename T1, typename T2> ostream& operator<<(ostream& s, const pair<T1, T2>& p) {return s << "(" << p.first << ", " << p.second << ")";}

template<typename T> ostream& operator<<(ostream& s, const vector<T>& v) { for (int i = 0; i < (int)v.size(); ++i) { s << v[i]; if (i < (int)v.size() - 1) s << "\t"; } return s; }

typedef long long ll;
typedef pair<int, int> ip;
typedef priority_queue<ip, vector<ip>, greater<ip>> pq_ip;

// AC
int main(){
	int n;
	cin >> n;
	pq_ip pq;
	for(int i=0; i<n; i++){
		int tmp;
		cin >> tmp;
		pq.push(make_pair(tmp, 0));
	}

	vector<int> enemy = vector<int>(n);
	for(int i=0; i<n; i++){
		cin >> enemy[i];
	}

	pq_ip copy_pq = pq;
	int result_min = n+1;
	for(int d=0; d<n; d++){
		int max_battle = 0;
		pq = copy_pq;
		for(int i=0; i<n; i++){
			int index = (i+d)%n;
			ip mons = pq.top();
			pq.pop();
			//cerr << "battle " << mons.first << "lv, count:" << mons.second << endl; 
			mons.first += enemy[index]/2;
			mons.second++;
			pq.push(mons);
			if(mons.second>max_battle){
				max_battle = mons.second;
			}
		}
		if(max_battle < result_min){
			result_min = max_battle;
		}
	}
	cout << result_min << endl;

	return 0;
}


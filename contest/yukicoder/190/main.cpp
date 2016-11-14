#include<iostream>
#include<utility>
#include<vector>
#include<algorithm>

using namespace std;
#define cerr cerr << "[DBG] "
#define DBG(x) cerr << #x << ": " << x << endl
// http://genkisugimoto.com/jp/blog/procon/2015/04/15/print-debug-technique-in-cpp.html
template<typename T1, typename T2> ostream& operator<<(ostream& s, const pair<T1, T2>& p) {return s << "(" << p.first << ", " << p.second << ")";}

template<typename T> ostream& operator<<(ostream& s, const vector<T>& v) { for (int i = 0; i < (int)v.size(); ++i) { s << v[i]; if (i < (int)v.size() - 1) s << "\t"; } return s; }

typedef long long ll;

// AC
int main(){
	cin.tie(0);
	ios::sync_with_stdio(false);
	int n;
	cin >> n;
	vector<int> a(2*n);
	for(int i=0; i<2*n; i++){
		cin >> a[i];
	}
	sort(a.begin(),a.end());
	// dry
	int index = 0;
	int rindex = 2*n-1;
	int c_dry = 0;
	while(index<rindex){
		int hum = a[index]+a[rindex]; 
		if(hum < 0){
			c_dry+=1;
			index+=1;
			rindex-=1;
		}
		else{
			rindex-=1;
		}
	}
	// wet
	index = 0;
	rindex = 2*n-1;
	int c_wet = 0;
	while(index<rindex){
		int hum = a[index]+a[rindex]; 
		if(hum > 0){
			c_wet+=1;
			index+=1;
			rindex-=1;
		}
		else{
			index+=1;
		}
	}
	// moist
	index = 0;
	rindex = 2*n-1;
	int c_moist = 0;
	while(index<rindex){
		int hum = a[index]+a[rindex]; 
		if(hum == 0){
			c_moist+=1;
			index+=1;
			rindex-=1;
		}
		else if(hum < 0){
			index+=1;
		}
		else if(hum > 0){
			rindex-=1;
		}
	}
	cout << c_dry << " " << c_wet << " " << c_moist << endl;
	return 0;
}


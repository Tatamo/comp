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

#define divisor 2019

main(){
    string s;
	cin >> s;
    vector<int> a;
    int n=s.size();
    for(int i=0;i<n;i++){
        a.push_back(s[i]-'0');
    }
    int curr[divisor];
    int prev[divisor];
    for(int i=0;i<divisor;i++){
        curr[i]=prev[i]=0;
    }

    int result = 0;
    for(int i=0;i<n;i++){
        curr[a[i]]++;
        if(i!=0){
            for(int ii=0;ii<divisor;ii++){
                if(prev[ii]==0) continue;
                int rem=(ii*10+a[i])%divisor;
                curr[rem]+=prev[ii];
            }
        }
        result+=curr[0];
        for(int ii=0;ii<divisor;ii++){
            prev[ii]=curr[ii];
            curr[ii]=0;
        }
    }

	cout << result << endl;
}
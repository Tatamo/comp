#include<iostream>
#include<utility>
#include<string>
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
	int n, a, b;
	cin >> n >> a >> b;
	string s;
	cin >> s;
	int count_a = 0;
	int count_b = 0;
	for(int i=0; i<n; i++){
		char c = s[i];
		if(c == 'c'){
			cout << "No" << endl;
		}
		else if(count_a + count_b >= a + b){
			cout << "No" << endl;
		}
		else{
			if(c == 'a'){
				cout << "Yes" << endl;
				count_a++;
			}
			else if(c == 'b'){
				if(count_b < b){
					cout << "Yes" << endl;
					count_b++;
				}
				else{
					cout << "No" << endl;
				}
			}
		}
	}


	return 0;
}


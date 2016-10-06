#include<iostream>
#include<string>
#include<algorithm>

using namespace std;

// AC
int main(){
	string s;
	cin >> s;
	int cnt_t, cnt_r, cnt_e;
	cnt_t = 0;
	cnt_r = 0;
	cnt_e = 0;
	for(int i=0; i<s.length(); i++){
		if(s[i] == 't'){
			cnt_t++;
		}
		else if(s[i] == 'r'){
			cnt_r++;
		}
		else if(s[i] == 'e'){
			cnt_e++;
		}
	}
	cnt_e/=2;
	int result = min(min(cnt_t, cnt_r), cnt_e);
	cout << result << endl;
	return 0;
}

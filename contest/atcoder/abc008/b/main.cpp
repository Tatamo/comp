#include<iostream>
#include<string>
#include<vector>
#include<utility>

using namespace std;

// AC
int main(){
	int n;
	cin >> n;
	vector<pair<string, int> > s;
	for(int i=0; i<n; i++){
		bool flg = true;
		string tmp;
		cin >> tmp;
		for(int ii=0; ii<s.size(); ii++){
			if(s[ii].first == tmp){
				s[ii].second += 1;
				flg = false;
				break;
			}
		}
		if(flg){
			s.push_back(make_pair( tmp, 1 ));
		}
	}

	pair<string, int> result = make_pair("",-1);
	for(int i=0; i<s.size(); i++){
		if(s[i].second > result.second) result = s[i];
	}

	cout << result.first << endl;
	return 0;
}

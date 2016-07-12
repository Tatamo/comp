#include<iostream>
#include<iomanip>
#include<vector>

using namespace std;

// AC(read commentary)
int main(){
	int n;
	cin >> n;
	vector<int> c(n);
	for(int i=0; i<n; i++){
		cin >> c[i];
	}
	vector<int> d(n, 0);
	for(int i=0; i<n; i++){
		for(int ii=0; ii<n; ii++){
			//if(i==ii) continue;
			if(c[i]%c[ii]==0){
				d[i]+=1;
			}
		}
	}
	double result = 0;
	for(int i=0; i<n; i++){
		result += ((double)((d[i]+1)/2))/(double)d[i];
	}
	cout << fixed << setprecision(7) << result << endl;
	return 0;
}

#include<iostream>

using namespace std;

typedef long long ll;

// AC
int main(){
	int n;
	cin >> n;

	ll *z = new ll[n];
	for(int i=0; i<n; i++){
		cin >> z[i];
	}

	cout << z[n-1] << "/" << z[0] << endl;
	return 0;
}

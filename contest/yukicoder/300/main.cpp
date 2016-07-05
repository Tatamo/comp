#include <iostream>
#include <vector>

using namespace std;

typedef long long ll;

// AC
int main(){
	ll x;
	cin >> x;

	vector<ll> p;

	ll i=2;
	ll n=x;
	while(i*i<=n){
		if(n==1) break;
		if(!(n%i)) {
			n /= i;
			bool flg = false;
			for(int ii=0;ii<p.size();ii++){
				if(p[ii] == i){
					p.erase(p.begin()+ii);
					flg = true;
					break;
				}
			}
			if(!flg){
				p.push_back(i);
			}
			i=2;
		}
		else{
			i++;
		}
	}
	if(n!=1) {
		bool flg = false;
		for(int ii=0;ii<p.size();ii++){
			if(p[ii] == n){
				p.erase(p.begin()+ii);
				flg = true;
				break;
			}
		}
		if(!flg){
			p.push_back(n);
		}
	}


	ll result = 1;
	for(int i=0; i<p.size(); i++){
		result*=p[i];
	}

	cout << result << endl;
}

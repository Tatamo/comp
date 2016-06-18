#include<iostream>

using namespace std;

typedef long long ll;

// long longなのでlog10だと怖い気がした(未検証)
int getdigit(ll n){
	int result = 1;
	while(n>9){
		n /= 10;
		result += 1;
	}
	return result;
}

// get number of acceptable digits
int getad(int num){
	if(num >= 0 && num <= 3){
		return num+1;
	}
	else if(num <= 8){
		// num==4: 0,1,2,3
		// num==5: 0,1,2,3,5
		// etc...
		return num;
	}
	else if(num == 9){
		return 8; // 0,1,2,3,5,6,7,8
	}
	else {
		cerr << "invalid number" << endl;
		return -1;
	}
}

ll getTopDigit(ll n, int d){
	for(int i=0; i<d-1; i++){
		n/=10;
	}
	return n;
}

ll delTopDigit(ll n, int d){
	ll tmp = getTopDigit(n, d);
	for(int i=0; i<d-1; i++){
		tmp *= 10;
	}
	return n-tmp;
}

ll banned(ll n){
	ll result = 0;
	int d = getdigit(n);
	ll nn = n;
	int X = getad(9); // 0,1,2,3,5,6,7,8 -> 8
	while(d>0){
		if(d>1){
			ll top = getTopDigit(nn, d);
			if(top != 0){
			
				ll tmp = getad(top-1);
				for(int i=0; i<d-1; i++){
					tmp *= X;
				}
				result += tmp;
			}
			if(top == 4 || top == 9) break;
			nn = delTopDigit(nn, d);
			d--;
		}
		else{
			result += getad(nn);
			d--;
		} 
	}
	result -= 1; // 0が含まれてしまっているため(後で打ち消しあうので、なくても問題ではない)
	result = n-result;
	return result;
}

// AC
int main(){
	ll a,b;
	cin >> a >> b;
	ll b_a = banned(a-1);
	ll b_b = banned(b);
	cout << b_b - b_a << endl;

	return 0;
}

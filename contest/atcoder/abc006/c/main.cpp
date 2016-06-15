#include<iostream>

using namespace std;

// AC
int main(){
	int n, m;
	cin >> n >> m;


	int c_l2, c_l3, c_l4;
	c_l2 = n;
	c_l3 = 0;
	c_l4 = 0;

	if(n*2 > m || n*4 < m){ // 足の数が少なすぎる or 多すぎる
		cout << "-1 -1 -1" << endl;
		return 0;
	}
	else if(m <= n*3){ // 2と3だけで作れる
		c_l3 = m - n*2;
		c_l2 -= c_l3;
	}
	else {
		c_l3 = n;
		c_l2 = 0;

		c_l4 = m-n*3;
		c_l3 -= c_l4;
	}

	cout << c_l2 << " " << c_l3 << " " << c_l4 << endl;
	return 0;
}


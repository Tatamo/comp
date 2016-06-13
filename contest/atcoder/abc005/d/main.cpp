#include<iostream>

using namespace std;

// AC
int main(){
	int n;
	cin >> n;
	// 1行ごとの左からの累積和
	int **d = new int*[n];
	for(int i=0; i<n; i++){
		d[i] = new int[n];
	}
	for(int i=0; i<n; i++){
		for(int ii=0; ii<n; ii++){
			int tmp;
			cin >> tmp;
			if(ii==0){
				d[i][ii] = tmp;
			}
			else{
				d[i][ii] = d[i][ii-1] + tmp;
			}
		}
	}

	/*
	// dbg
	for(int i=0; i<n; i++){
		for(int ii=0; ii<n; ii++){
			cout << d[i][ii] << " ";
		}
		cerr << endl;
	}
	*/

	// 全ての長方形パターンで美味しさの合計を探索
	// less than 50^5 == 3.125e+8
	// たぶんぎりぎりいける

	int *tastegood = new int[n*n+1];
	for(int i=0; i<=n*n; i++){
		tastegood[i] = 0;
	}

	// y=0, yy=0, x=1, xx=1 -> wrong
	for(int x=0; x<n; x++){
		for(int y=0; y<n; y++){
			for(int xx=x; xx<n; xx++){
				for(int yy=y; yy<n; yy++){
					int area = (xx-x+1) * (yy-y+1);
					int tmp = 0;
					for(int i=y; i<=yy; i++){
						if(x==0){
							tmp += d[i][xx];
						}
						else{
							tmp += d[i][xx] - d[i][x-1];
						}
					}
					if(tastegood[area] < tmp){
						tastegood[area] = tmp; // おいしい
					}
					//cerr << "area " << area << ": " << tmp << endl;
				}
			}
		}
	}

	/*
	for(int i=0;i<=n*n;i++){
		cerr << tastegood[i] << " ";
	}
	cerr << endl;*/

	// solve
	int q;
	cin >> q;
	for(int i=0; i<q; i++){
		int p;
		cin >> p;
		int result = 0;
		for(int ii=0;ii<=p; ii++){
			if(result < tastegood[ii]) result = tastegood[ii];
		}
		cout << result << endl;
	}

	return 0;
}

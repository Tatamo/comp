#include<iostream>
#include<utility>
#include<algorithm>

using namespace std;

// AC
// 並列バブルソート
int main(){
	int n;
	cin >> n;

	int *l = new int[n];
	for(int i=0; i<n; i++){
		l[i] = i+1;
	}
	bool flg_all_sorted = false;
	bool flg_all_sorted_prev = false;
	for(int q=0; q<n; q++){ // クエリはn回以内に終了する (while(true)でもいい)
		// send query
		int offset = q%2;
		cout << "? ";
		for(int i=0; i<n; i++){
			if(i*2+2+offset<=n){
				cout << l[i*2+1+offset - 1] << " " << l[i*2+2+offset - 1] << " ";
			}
			else {
				cout << "0 0 ";
			}
		}
		cout << endl; // 出力をflush

		// get answer
		flg_all_sorted_prev = flg_all_sorted;
		flg_all_sorted = true;
		for(int i=0; i<n; i++){
			char tmp;
			cin >> tmp;
			if(tmp == '>'){ // swap
				int index = i*2+1+offset;
				//cerr << "swap " << index << " and " << index+1 << endl;
				swap(l[index - 1], l[index+1 - 1]);
				flg_all_sorted = false;
			}
		}
		if(flg_all_sorted && flg_all_sorted_prev){
			break; // おわり
		}
	}

	// answer
	cout << "! ";
	for(int i=0; i<n; i++){
		cout << l[i] << " ";
	}
	cout << endl;

	return 0;
}

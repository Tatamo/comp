#include<iostream>
#include<utility>
#include<vector>
#include<algorithm>

using namespace std;
#define cerr cerr << "[DBG] "
#define DBG(x) cerr << #x << ": " << x << endl
// http://genkisugimoto.com/jp/blog/procon/2015/04/15/print-debug-technique-in-cpp.html
template<typename T1, typename T2> ostream& operator<<(ostream& s, const pair<T1, T2>& p) {return s << "(" << p.first << ", " << p.second << ")";}

template<typename T> ostream& operator<<(ostream& s, const vector<T>& v) { for (int i = 0; i < v.size(); ++i) { s << v[i]; if (i < v.size() - 1) s << "\t"; } return s; }

typedef long long ll;

typedef pair<int, int> ip;

// with help of izuru, solorab
// AC
int main(){
	int w, h, k;
	cin >> w >> h >> k;
	int n;
	cin >> n;
	vector<ip> dogs(n); // (Y, X)
	for(int i=0; i<n; i++){
		ip tmp;
		cin >> tmp.second >> tmp.first;
		dogs[i] = tmp;
	}
	sort(dogs.begin(), dogs.end());

	ll cnt_cost_1 = 0;
	ll cnt_cost_2 = 0;

	// 最初は全部コスト1を敷くと仮定
	cnt_cost_1 = (w+1)/2 * ((h+1)/2 - 1) ;

	ip decided = make_pair(1, -1); // (Y, X) (1,1)から右に、そして下に確定させていく 上の家基準
	for(int i=0; i<n; i++){
		if(i+1<n && dogs[i].first == dogs[i+1].first && dogs[i].second == dogs[i+1].second) continue;
		if(dogs[i].first %2 == 1) {
			// Y座標奇数の犬は無視
			continue;
		}
		if(dogs[i].first == decided.first+1 &&
				dogs[i].second <= decided.second+1){
			// 既に確定しているところの犬なので無視
			continue;
		}
		if(dogs[i].first != decided.first+1){ // 新しいY座標に入った
			decided.first = dogs[i].first-1;
			decided.second = -1;
		}
		if(dogs[i].second %2 == 1) { // X座標奇数:家の真下
			ip house = make_pair(dogs[i].first-1, dogs[i].second);
			if(i+1<n &&
					dogs[i+1].first == dogs[i].first &&
					dogs[i+1].second == dogs[i].second + 1){
				// 右隣にも犬がいる
				if(decided.first == house.first &&
						decided.second == house.second-2){
					// 左には管を通せない(既に確定している)
					// 管を真下に通す(コスト2)
					cnt_cost_1 -= 1;
					cnt_cost_2 += 1;
				}
				else{
					// 管を左側にクロスさせて通す(コスト1)
				}
				decided.first = house.first;
				decided.second = house.second;
			}
			else{
				// 右隣には犬がいない
				if(dogs[i].second == w){ // そもそもこれ以上右に家があるのか
					// ない(右端)
					if(decided.first == house.first &&
							decided.second == house.second-2){
						// 左には管を通せない(既に確定しているので)
						// 管を真下に通す(コスト2)
						cnt_cost_1 -= 1;
						cnt_cost_2 += 1;
					}
					else{
						// 管を左側にクロスさせて通す(コスト1)
					}
					decided.first = house.first;
					decided.second = house.second;
				}
				else{
					// 右端以外
					if(decided.first == house.first &&
							decided.second == house.second-2){ // まず左に通せるか確かめる
						// 左には管を通せない(既に確定しているので)
						// 右にクロスさせて通すのでコスト1
						// 一つ右の家まで確定
						decided.first = house.first;
						decided.second = house.second + 2;
					}
					else{
						// 左右両方に管を通せる
						// このような場合は犬が存在しないものとして扱ってよい
						// decidedを更新しないことに注意する
					}
				}
			}
		}
		else if(dogs[i].second %2 == 0) { // X座標偶数
			// decidedだけ更新(犬の左上まで)
			// 次の家は左方向には通せない
			ip house = make_pair(dogs[i].first-1, dogs[i].second-1);
			decided.first = house.first;
			decided.second = house.second;
		}
	}

	int cnt_k = k - (w+1)/2;

	if(cnt_k < 0) goto FAILED;
	if(cnt_cost_2 > cnt_k){
		cnt_cost_2 -= cnt_k;
		cnt_k = 0;
	}
	else{
		cnt_k -= cnt_cost_2;
		cnt_cost_2 = 0;
	}

	if(cnt_cost_1 > cnt_k){
		cnt_cost_1 -= cnt_k;
		cnt_k = 0;
	}
	else{
		cnt_k -= cnt_cost_1;
		cnt_cost_1 = 0;
	}

	cout << cnt_cost_2 * 2 + cnt_cost_1<< endl;
	return 0;
FAILED:
	cout << -1 << endl;
	return 0;
}


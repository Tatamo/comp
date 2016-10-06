#include<iostream>
#include<utility>
#include<vector>
#include<set>

using namespace std;
#define cerr cerr << "[DBG] "  
#define DBG(x) cerr << #x << ": " << x << endl
// http://genkisugimoto.com/jp/blog/procon/2015/04/15/print-debug-technique-in-cpp.html
template<typename T1, typename T2> ostream& operator<<(ostream& s, const pair<T1, T2>& p) {return s << "(" << p.first << ", " << p.second << ")";}

template<typename T> ostream& operator<<(ostream& s, const vector<T>& v) { for (int i = 0; i < v.size(); ++i) { s << v[i]; if (i < v.size() - 1) s << "\t"; } return s; }

typedef long long ll;

struct Coin{
	int x;
	int y;
};

// for set
bool operator<(const Coin &a, const Coin &b){
	if(a.x==b.x){
		return a.y < b.y;
	}
	return a.x < b.x;
}

typedef set<Coin>::iterator CSItr;

// yukicoder problems/476 No.202
// AC
int main(){
	int n;
	cin >> n;
	vector<Coin> coins(n);
	for(int i=0; i<n; i++){
		Coin c;
		cin >> c.x >> c.y;
		coins[i] = c;
	}
	set<Coin> field;
	for(int i=0; i<n; i++){
		//DBG(i);
		int cx = coins[i].x;
		int cy = coins[i].y;
		if(field.empty()){
			field.insert(coins[i]);
		}
		else{
			Coin low, up;
			low.x = cx-20;
			low.y = cy;
			up.x = cx+20;
			up.y = cy;
			//cerr << "low: " << low.x << "," << low.y << endl;
			CSItr begin = field.lower_bound(low);
			CSItr end = field.upper_bound(up);
			bool flg_collided = false; // true : not collided
			for(CSItr itr = begin; itr!=end; itr++){
				ll dx = cx - itr->x;
				ll dy = cy - itr->y;
				//DBG(dx);
				//DBG(dy);
				if(dx*dx + dy*dy < 20*20){
					DBG(dx*dx+dy*dy);
					flg_collided = true;
					break;
				}
			}
			//DBG(flg_collided);
			if(!flg_collided) {
				field.insert(coins[i]);
			}
		}
	}
	cout << field.size() << endl;

	return 0;
}


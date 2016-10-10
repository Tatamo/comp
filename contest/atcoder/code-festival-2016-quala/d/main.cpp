#include<iostream>
#include<utility>
#include<vector>

using namespace std;

#define INF (10e8)

#define DBG(x) cerr << #x << ": " << x << endl
// http://genkisugimoto.com/jp/blog/procon/2015/04/15/print-debug-technique-in-cpp.html
template<typename T1, typename T2> ostream& operator<<(ostream& s, const pair<T1, T2>& p) {return s << "(" << p.first << ", " << p.second << ")";}

template<typename T> ostream& operator<<(ostream& s, const vector<T>& v) { for (int i = 0; i < v.size(); ++i) { s << v[i]; if (i < v.size() - 1) s << "\t"; } return s; }

typedef long long ll;
typedef pair<int, int> ip;

int** table;
ip** buffer;

ip check3filled(int x, int y, int w, int h){
	ip result = make_pair(-1, -1);
	if(x<0 || y<0 || x+1>=w || y+1>=h){
		return result;
	}
	int c=0;
	int dx[4] = {0, 0, 1, 1};
	int dy[4] = {0, 1, 0, 1};
	int rx = -1;
	int ry = -1;
	for(int i=0; i<4; i++){
		if(table[y+dy[i]][x+dx[i]] != INF){
			c++;
		}
		else{
			if(rx == -1){
				rx = dx[i];
				ry = dy[i];
			}
		}
	}
	buffer[x][y].first = c;
	buffer[x][y].second = 1;
	if(c==3) {
		result.first = rx;
		result.second = ry;
	}
	return result;
}


// UNDONE
int main(){
	int h, w;
	cin >> h >> w;
	table = new int*[h];
	buffer = new ip*[h];
	for(int i=0; i<h; i++){
		table[i] = new int[w];
		buffer[i] = new ip[w];
		for(int ii=0; ii<w; ii++){
			table[i][ii] = INF;
			buffer[i][ii] = make_pair(0,0);
		}
	}
	int n;
	cin >> n;
	int* r = new int[n];
	int* c = new int[n];
	int* a = new int[n];
	for(int i=0; i<n; i++){
		cin >> r[i] >> c[i] >> a[i];
		r[i]--; c[i]--;
		table[r[i]][c[i]] = a[i];
	}

	for(int i=0; i<n; i++){
		int y = r[i];
		int x = c[i];
		
		int dx[4] = {0, 0, -1, -1};
		int dy[4] = {0, -1, 0, -1};
		for(int d=0; d<4; d++){
			ip rest = check3filled(x, y, w, h);
			if(rest.first == -1) continue;
			int tmp = INF;
			if(rest.first == 0){
				if(rest.second == 0){
					table[y][x] = table[y+1][x+1] - table[y][x+1] - table[y+1][x];
					if(table[y][x] < 0) goto FAILED;
				}
				else{
					table[y+1][x] = table[y][x+1] - table[y][x] - table[y+1][x+1];
					if(table[y+1][x] < 0) goto FAILED;
				}
			}
			else{
				if(rest.second == 0){
					table[y][x+1] = table[y+1][x] - table[y][x] - table[y+1][x+1];
					if(table[y][x+1] < 0) goto FAILED;
				}
				else{
					table[y+1][x+1] = table[y][x] - table[y+1][x] - table[y][x+1];
					if(table[y+1][x+1] < 0) goto FAILED;
				}
			}
			buffer[y][x].first = 4;
		}
	}

	/*
	for(int i=0; i<h; i++){
		for(int ii=0; ii<w; ii++){
			cout << table[i][ii] << ",";
		}
		cout << endl;
	}
	*/
	cout << "Yes" << endl;

	return 0;
FAILED:
	cout << "No" << endl;
	return 0;
}


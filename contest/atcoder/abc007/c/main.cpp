#include<iostream>
#include<queue>

using namespace std;


typedef struct{
	int x;
	int y;
	int c;
} Position;

Position pos(int x, int y, int c){
	Position tmp;
	tmp.x = x;
	tmp.y = y;
	tmp.c = c;
	return tmp;
}

// AC
int main(){
	int h,w;
	cin >> h >> w;
	int sy, sx;
	cin >> sy >> sx;
	int gy, gx;
	cin >> gy >> gx;
	sx-=1;
	sy-=1;
	gx-=1;
	gy-=1;
	int **c = new int*[h];
	for(int i=0; i<h; i++){
		c[i] = new int[w];
		for(int ii=0; ii<w; ii++){
			 char tmp;
			 cin >> tmp;
			 if(tmp == '.'){
				 c[i][ii] = -1;
			 }
			 else if(tmp == '#'){
				 c[i][ii] = -2;
			 }
		}
	}
	queue<Position> q;
	q.push( pos(sx, sy, 0) );
	while(!q.empty()){
		// 周囲は壁で囲まれていることが保証されているため、範囲外チェックは不要
		Position p = q.front();
		q.pop();
		if(c[p.y][p.x] != -1) continue; // キュー内で待っている間に既に処理されている可能性がある
		c[p.y][p.x] = p.c;
		if(p.x == gx && p.y == gy) goto ENDLOOP;
		int dxl[4] = {-1, 1, 0, 0};
		int dyl[4] = {0, 0, -1, 1};
		for(int i=0; i<4; i++){
			int dx = dxl[i];
			int dy = dyl[i];
			int tmp = c[p.y+dy][p.x+dx];

			// 処理順の関係上tmp > p.cとなることはない
			if(tmp == -1){
				q.push( pos(p.x+dx, p.y+dy, p.c+1) );
			}
		}
	}
ENDLOOP:
	cout << c[gy][gx] << endl;

	return 0;
}

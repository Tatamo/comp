#include<iostream>
#include<queue>

using namespace std;

typedef priority_queue<int, vector<int>, greater<int> > pq_g;

// AC
int main(){
	int n;
	cin >> n;
	pq_g pq;
	for(int i=0; i<n; i++){
		int tmp;
		cin >> tmp;
		pq.push(tmp);
	}
	cout << pq.top() << endl;
	return 0;
}

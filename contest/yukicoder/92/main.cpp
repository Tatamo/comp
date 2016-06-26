#include <iostream>
#include <vector>
#include <utility>
#include <map>
#include <algorithm>

#define DBG(x) cerr << x << endl

using namespace std;

class Graph{
    public:
        vector<pair<int, int> >edges;
        Graph(){
        }
        void setEdge(int id, int cost){
            edges.push_back(make_pair(id, cost));
        }
};

vector<Graph> g;
vector<int> d;

map<int, Graph> search(){
    int count = 0;
    map<int, Graph> s;
    for(int i=1; i<g.size(); i++){
        s.insert(map<int, Graph>::value_type(i, g[i]));
    }
    map<int, Graph> s_next;
    for(int c=0; c<d.size(); c++){
        for(auto itr = s.begin(); itr!=s.end(); itr++){
            for(int i=0; i < itr->second.edges.size(); i++){
                int cost = itr->second.edges[i].second;
                if(cost == d[count]){
                    int index = itr->second.edges[i].first;
                    s_next.insert(map<int, Graph>::value_type(index, g[index]));
                }
            }
        }
        s = s_next;
        s_next.clear();
        count += 1;
    }
    return s;
}

// AC
int main(){
    int n,m,k;
    cin >> n >> m >> k;

    for(int i=0; i<=n; i++){
        g.push_back(Graph());
    }
    for(int i=0; i<m; i++){
        int a, b, c;
        cin >> a >> b >> c;
        g[a].setEdge(b, c);
        g[b].setEdge(a, c);
    }

    for(int i=0; i<k; i++){
        int tmp;
        cin >> tmp;
        d.push_back(tmp);
    }

/*
    for(int i=0; i<g.size(); i++){
        for(int ii=0; ii<g[i].edges.size(); ii++){
            DBG(g[i].edges[ii].first);
            DBG(g[i].edges[ii].second);
            DBG("");
        }
    }
*/

    map<int, Graph> result = search();
    cout << result.size() << endl;
    for(auto itr=result.begin(); itr!=result.end(); itr++){
        cout << itr->first << " ";
    }
    cout << endl;

}

// http://jag2016autumn.contest.atcoder.jp/submissions/922203

#include <iostream>
#include <vector>
#include <algorithm>
#include <array>
#include <set>
#include <map>
#include <queue>
#include <tuple>
#include <unordered_set>
#include <unordered_map>
#include <functional>
#include <cassert>
#define repeat(i,n) for (int i = 0; (i) < (n); ++(i))
#define repeat_from(i,m,n) for (int i = (m); (i) < (n); ++(i))
#define repeat_reverse(i,n) for (int i = (n)-1; (i) >= 0; --(i))
#define repeat_from_reverse(i,m,n) for (int i = (n)-1; (i) >= (m); --(i))
#define whole(f,x,...) ([&](decltype((x)) y) { return (f)(begin(y), end(y), ## __VA_ARGS__); })(x)
typedef long long ll;
using namespace std;
template <class T> void setmax(T & a, T const & b) { if (a < b) a = b; }
template <class T> void setmin(T & a, T const & b) { if (b < a) a = b; }
template <typename T, typename X> auto vectors(T a, X x) { return vector<T>(x, a); }
template <typename T, typename X, typename Y, typename... Zs> auto vectors(T a, X x, Y y, Zs... zs) { auto cont = vectors(a, y, zs...); return vector<decltype(cont)>(x, cont); }
template <typename T> T input(istream & in) { T a; in >> a; return a; }
const int dy[] = { -1, 1, 0, 0 };
const int dx[] = { 0, 0, 1, -1 };
bool is_on_field(int y, int x, int h, int w) { return 0 <= y and y < h and 0 <= x and x < w; }
const int inf = 1e9+7;
int main() {
    // input
    int w, h, k; cin >> w >> h >> k; h /= 2;
    int n; cin >> n;
    vector<set<int> > f(h);
    repeat (i,n) {
        int x, y; cin >> x >> y; -- x; -- y;
        if (y % 2 == 0) continue;
        y /= 2;
        f[y].insert(x);
    }
    k -= w/2+1;
    if (k < 0) {
        // output
        cout << -1 << endl;
    } else {
        // compute
        int acc = 0;
        repeat (y,h) {
            vector<int> dp = vectors(inf, w+1);
            dp[0] = 0;
            repeat (x,w) {
                if (x % 2 == 0) {
                    ;             setmin<int>(dp[x+1], dp[x]   +     f[y].count(x));
                    if (x-2 >= 0) setmin<int>(dp[x+1], dp[x-2] + 2 * f[y].count(x-1));
                } else {
                    dp[x+1] = dp[x];
                }
            }
            assert (dp[w] != inf);
            acc += dp[w];
        }
        int ans = h * (w/2+1) + acc;
        ans -= 2 * min(acc, k);
        k   -=     min(acc, k);
        ans -=     min(ans, k);
        k   -=     min(ans, k);
        // output
        cout << ans << endl;
    }
    return 0;
}

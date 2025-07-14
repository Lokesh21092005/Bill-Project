#include<bits/stdc++.h>
using namespace std;

const int N = 1e5 + 5, LOG = 17;
vector<int> g[N];
int up[N][LOG], d[N], par[N];
vector<long long> val;

void dfs(int u, int p) {
    par[u] = p;
    for (int i = 1; i < LOG; i++)
        up[u][i] = up[up[u][i - 1]][i - 1];
    for (int v : g[u])
        if (v != p) d[v] = d[u] + 1, up[v][0] = u, dfs(v, u);
}

int lca(int u, int v) {
    if (d[u] < d[v]) swap(u, v);
    for (int i = LOG - 1; i >= 0; i--)
        if ((d[u] - d[v]) >> i & 1) u = up[u][i];
    if (u == v) return u;
    for (int i = LOG - 1; i >= 0; i--)
        if (up[u][i] != up[v][i]) u = up[u][i], v = up[v][i];
    return up[u][0];
}

long long solve(int u, int v) {
    int l = lca(u, v);
    vector<long long> path;
    while (u != l) path.push_back(val[u]), u = par[u];
    vector<long long> temp;
    while (v != l) temp.push_back(val[v]), v = par[v];
    path.push_back(val[l]);
    reverse(temp.begin(), temp.end());
    for (auto x : temp) path.push_back(x);

    long long res = path[0], cur = path[0];
    for (int i = 1; i < path.size(); i++) {
        cur = max(path[i], cur + path[i]);
        res = max(res, cur);
    }
    return res;
}

int main() {
    ios::sync_with_stdio(0);
    cin.tie(0);

    int n, q, u, v;
    cin >> n;
    for (int i = 0; i < n - 1; i++) cin >> u >> v, g[u].push_back(v), g[v].push_back(u);
    val.resize(n + 1);
    for (int i = 1; i <= n; i++) cin >> val[i];
    up[1][0] = 1, dfs(1, -1);
    cin >> q;
    while (q--) cin >> u >> v, cout << solve(u, v) << '\n';
}

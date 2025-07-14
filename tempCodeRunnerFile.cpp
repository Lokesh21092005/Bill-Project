#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

int f(vector<int>& a, vector<int>& b) {
    int n = a.size(), c = 0;
    for (auto v : {a, b}) {
        vector<int> t(n);
        t[n / 2] = v[n / 2];
        for (int i = n / 2 - 1; i >= 0; --i) {
            t[i] = t[i + 1] + 1;
            c += abs(t[i] - v[i]);
        }
        for (int i = n / 2 + 1; i < n; ++i) {
            t[i] = t[i - 1] + 1;
            c += abs(t[i] - v[i]);
        }
    }
    return c;
}

int main() {
    int n;
    cin >> n;
    vector<int> a(n), b(n);
    for (int i = 0; i < n; ++i) cin >> a[i];
    for (int i = 0; i < n; ++i) cin >> b[i];
    cout << f(a, b) << endl;
    return 0;
}



#include <bits/stdc++.h>
#define int long long int

using namespace std;

int prmtr(int l, int b) {
  return 2*(l+b);
}

signed main() {
  int totalAr = 0,
      ribbon = 0;

  // Clean input beforehand
  // cat 2.txt | sed 's/x/ /g' > 2-cpp.txt
  freopen("2-cpp.txt", "r", stdin);
  int l, w, h;
  while(cin >> l >> w >> h) {
    totalAr += 2*l*w + 2*w*h + 2*h*l + min(min(l*w, l*h), w*h);
    ribbon += min(min(prmtr(l, w), prmtr(l, h)), prmtr(w, h)) + l*w*h;
  }

  cout << totalAr << endl;
  cout << ribbon << endl;
}

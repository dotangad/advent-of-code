#include <bits/stdc++.h>

using namespace std;

int count(string s, char c) {
  int cnt = 0;
  for(int i = 0; i < s.length(); i++) {
    if(s[i] == c) cnt++;
  }

  return cnt;
}

int main() {
  int one = 0, two = 0;

  // Clean input beforehand
  // cat 2.txt | sed 's/-/ /g' | sed 's/://g' > 2-cpp.txt
  freopen("2-cpp.txt", "r", stdin);
  for(int i = 0; i < 1000; i++) {
    int m, n;
    char c;
    string pass;
    cin >> m >> n >> c >> pass;
    
    int cnt = count(pass, c);
    if(cnt <= n && cnt >= m) one++;
    if((pass[m - 1] == c) != (pass[n - 1] == c)) two++;
  }

  cout << one << endl;
  cout << two << endl;
}

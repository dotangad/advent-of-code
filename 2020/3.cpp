#include <bits/stdc++.h>
#define int long long int

using namespace std;

int slope(vector<string> input, int rt, int dwn) {
  int ROW_LEN = input[0].length();

  int trees = 0;
  for(int i = dwn, j = rt; i < input.size(); i += dwn) {
    if(input[i][j] == '#') trees++;
    j += rt;
    j %= ROW_LEN;
  }

  return trees;
}

signed main() {
  freopen("3.txt", "r", stdin);

  vector<string> input;
  string l;
  while(cin >> l) {
    input.push_back(l);
  }

  int two = slope(input, 1, 1) * slope(input, 3, 1) *
            slope(input, 5, 1) * slope(input, 7, 1) *
            slope(input, 1, 2);
  
  cout << slope(input, 3, 1) << endl;
  cout << two << endl;
}


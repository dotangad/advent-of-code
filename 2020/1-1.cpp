#include <bits/stdc++.h>
#include <vector>

using namespace std;

int main() {
  freopen("1.txt", "r", stdin);
  vector<int> input;
  int l;
  while(cin >> l) {
    input.push_back(l);
  }

  for(int i = 0; i < input.size(); i++) {
    int n = 2020 - input[i];
    vector<int>::iterator it = find(input.begin(), input.end(), n);
    if(it == input.end()) {
      continue;
    }

    cout << input[i] * n << endl;
    return 0;
  }
}

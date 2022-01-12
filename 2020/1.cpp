#include <bits/stdc++.h>

using namespace std;

vector<int> read_file(string fname) {
  freopen(fname.c_str(), "r", stdin);
  vector<int> input;
  int l;
  while(cin >> l) {
    input.push_back(l);
  }

  return input;
}

int one(vector<int> input, int sum = 2020, int skip = -1) {
  for(int i = 0; i < input.size(); i++) {
    if(i == skip) continue;

    int n = sum - input[i];
    vector<int>::iterator it = find(input.begin(), input.end(), n);
    if(it != input.end()) {
      return input[i] * n;
    }
  }

  return 0;
}

int two(vector<int> input) {
  for(int i = 0; i < input.size(); i++) {
    int n = one(input, 2020 - input[i], i);
    if(n != 0) {
      return n * input[i];
    }
  }

  return 0;
}

int main() {
  vector<int> input = read_file("1.txt");

  cout << one(input) << endl;
  cout << two(input) << endl;
}

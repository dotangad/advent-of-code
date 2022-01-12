#include <bits/stdc++.h>

using namespace std;

vector<int> read_file(string fname) {
  // https://stackoverflow.com/questions/347949/how-to-convert-a-stdstring-to-const-char-or-char
  freopen(fname.c_str(), "r", stdin);
  vector<int> input;
  int l;
  while(cin >> l) {
    input.push_back(l);
  }

  return input;
}

int main() {
  vector<int> input = read_file("1.txt");

  for(int i : input) {
    cout << i << endl;
  }
}

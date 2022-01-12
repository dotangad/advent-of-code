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

  for(int i = 0; i < input.size(); i++) {
    for(int j = 0; j < input.size(); j++) {
      if(i == j) continue;
      
      int n = 2020 - input[i] - input[j];
      vector<int>::iterator it = find(input.begin(), input.end(), n);
      if(it == input.end()) {
        continue;
      }

      cout << input[i] * input[j] * n << endl;
      return 0;
    }
  }
}

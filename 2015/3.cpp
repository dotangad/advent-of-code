#include <bits/stdc++.h>

using namespace std;

int main() {
  set<string> visited_one;
  set<string> visited_two;
  int x_one = 0,
      y_one = 0,
      x_two_s = 0,
      y_two_s = 0,
      x_two_r = 0,
      y_two_r = 0,
      n = 0;

  visited_one.insert("0  0");
  visited_two.insert("0  0");

  // Clean input beforehand
  freopen("3.txt", "r", stdin);
  char c;
  while(cin >> c) {
    if(c == '^') y_one++;
    if(c == 'v') y_one--;
    if(c == '>') x_one++;
    if(c == '<') x_one--;

    ostringstream s_one;
    s_one << y_one << "  " << x_one;
    string addr = s_one.str();

    visited_one.insert(addr);

    if(n % 2 == 0) {
      if(c == '^') y_two_s++;
      if(c == 'v') y_two_s--;
      if(c == '>') x_two_s++;
      if(c == '<') x_two_s--;

      ostringstream s_two;
      s_two << y_two_s << "  " << x_two_s;
      string addr_two = s_two.str();

      visited_two.insert(addr_two);
    } else {
      if(c == '^') y_two_r++;
      if(c == 'v') y_two_r--;
      if(c == '>') x_two_r++;
      if(c == '<') x_two_r--;

      ostringstream s_two;
      s_two << y_two_r << "  " << x_two_r;
      string addr_two = s_two.str();

      visited_two.insert(addr_two);
    }

    n++;
  }

  cout << visited_one.size() << endl;
  cout << visited_two.size() << endl;
}

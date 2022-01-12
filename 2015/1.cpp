#include <bits/stdc++.h>

using namespace std;

int main() {
  int counter = 0,
      pos = 1,
      basementPos = 0;

  freopen("1.txt", "r", stdin);
  char c;
  while (cin >> c) {
    if(c == '(') counter++;
    if(c == ')') counter--;
    if(counter == -1 && basementPos == 0) {
      basementPos = pos;
    }
    pos++;
  }

  cout << counter << endl;
  cout << basementPos << endl;
}

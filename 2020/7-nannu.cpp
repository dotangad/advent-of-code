#include <bits/stdc++.h>
#define pb push_back
#define mp make_pair
#define fr first
#define sc second
#define clr(a) memset(a, 0, sizeof(a))
#define sz(x) x.size()
#define printvector(arr) for (auto it = arr.begin(); it != arr.end(); ++it) cout<<*it<<" "; cout<<endl;
#define REP(i, n) for (int i = 0; i < n; i++)
#define FOR(i, x, y) for (int i = x; i < y; i++)
#define DEC(i, x, y) for (int i = x; i >= y; i--)
#define all(v) v.begin(), v.end()
#define min3(a, b, c) min(a, min(b, c))
#define max3(a, b, c) max(a, max(b, c))
#define alla(a, n) a, a + n
#define gcd(a, b) __gcd(a, b)
#define lcm(a, b) (a * b)/gcd(a, b)
#define int long long int
#define ull unsigned long long
#define printarray(arr, n) for(int i= 0;i<n;i++) cout<<arr[i]<<' '; cout<<endl;
#define printvecpairs(vec) for(auto it: vec) cout<<it.fr<<' '<<it.sc<<endl;
#define initdp(a) memset(a, -1, sizeof(a));
#define endl '\n'

using namespace std;
const int MOD = 1e9 + 7;
const int INF = 2e15;
const int MAXN = 1e5 + 5;

int fastexpo(int b, int exp){
    if(exp == 0) return 1;
    if(exp == 1) return b;
    int ans = (fastexpo(b,exp/2) % MOD);
    ans *= ans;
    ans %= MOD;
    if(exp % 2 == 1){
        ans *= b;
    }
    ans %= MOD;
    return ans;
}

map<string, int> conv;
vector<pair<int, int> > adj[MAXN];
map<int, string> nice;


int dfs(int s){
    int ans = 1;
	for(auto it: adj[s]){
		ans += it.fr*dfs(it.sc);
	}
    return ans;
}

signed main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    #ifndef ONLINE_JUDGE
    freopen("input.txt", "r", stdin);
    #endif
    int t = 585;
    set<string> st;
    vector<vector<string> > ok;
    while(t--){
    	string s;
    	cin>>s;
    	vector<string> vec;
    	string curr = "";
    	for(char c: s){
    		if(c == ','){
    			
    			if(vec.size() != 0) st.insert(curr.substr(1, curr.size()-1));
                else st.insert(curr);
                vec.pb(curr);
    			curr= "";
    		} else {
    			curr += c;
    		}
    	}
    	vec.pb(curr);
    	ok.pb(vec);
        printvector(vec);
    }
    int cnt = 1;
    for(auto it: st){
    	conv[it] = cnt;
        nice[cnt] = it;
    	cnt++;
    }
    for(auto it: ok){
    	for(int i= 1;i<it.size();i++){
    		string tmp = "";
    		for(int j = 1;j<it[i].size();j++){
    			tmp += it[i][j];
    		}
    		adj[conv[it[0]]].pb(mp(it[i][0]-'0', conv[tmp]));
    	}
    }
    cout<<dfs(conv["shinygoldbag"])<<endl;
    // cout<<ans-1<<endl;
    return 0;
}





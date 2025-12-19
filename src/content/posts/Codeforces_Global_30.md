---
title: Codeforces_Global_30
published: 2025-12-19
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---



# Codeforces Global Round 30 (Div. 1 + Div. 2)

链接
https://codeforces.com/contest/2164

4题，Ranking 1.5k

## A题


只需要判断数组是否存在k,或者存在<k,也存在>k,做一下判断

```c++
void solve()
{
    int n;cin>>n;
    ve<int>a(n+1);
    for(int i=1;i<=n;i++) cin>>a[i];
    int x;cin>>x;
    int op=0,id1=0,id2=0;
    for(int i=1;i<=n;i++)
    {
        if(a[i]==x) op=1;
        if(a[i]>x) id1=1;
        if(a[i]<x) id2=1;
    }
    if(op||(id1&&id2))
    {
        cout<<"Yes\n";
    }
    else cout<<"No\n";
}
```

## B题

猜结论，猜测，出现的概率很大，对第i个位置，暴力向后跑100次
```c++
void solve()
{
    int n;cin>>n;
    ve<int>a(n+1);
    for(int i=1;i<=n;i++) cin>>a[i];
    ve<int>f;
    for(int i=1;i<=n;i++)
    {
        if(a[i]%2==0) f.push_back(a[i]);
    }
    if(f.size()>=2) 
    {
        cout<<f[0]<<" "<<f[1]<<'\n';
        return ;
    }
    else 
    {
        for(int i=1;i<=n;i++)
        {
            for(int j=i+1;j<=min(n,i+100);j++)
            {
                if((a[j]%a[i])%2==0)
                {
                    cout<<a[i]<<" "<<a[j]<<'\n';
                    return ;
                }
            }
        }
    }
    cout<<"-1\n";
}
```
## C题


做法比较麻烦。肯定有更简单的做法


对数组a扔到小顶堆。然后数组，b,c做按照b升序的排序。
然后线段树维护数组c的区间最大值，以及最大值的下标，优先用数组a最小的，然后在数组b二分出a所能击败的位置id，查询区间[1,id]的最大值，更新小顶堆。随后修改击败位置的下标。
```c++
struct my_tree
{
    // 区间和
    #define kl (k<<1)
    #define kr (k<<1|1)

    struct node
    {
        int l, r, sum,id;
    };

    vector<node> tree;
    my_tree(int x)
    {
        tree = vector<node>(x*4+10);
    }

    void pushup(node& kk, const node& kkl, const node& kkr)
    {
        if(kkl.sum>kkr.sum) kk.sum=kkl.sum,kk.id=kkl.id;
        else kk.sum=kkr.sum,kk.id=kkr.id;
    }
    void pushup(int k)
    {
        pushup(tree[k], tree[kl], tree[kr]);
    }

    void build(int k, int l, int r, ve<int>& a)
    {
        tree[k]={l,r};
        if (l == r)
        {
            tree[k].sum = a[l];
            tree[k].id=l;
            return;
        }
        int mid = (l + r) >> 1;
        build(kl, l, mid, a);
        build(kr, mid + 1, r, a);
        pushup(k);
    }

    // 区间修改 // 区间替换 
    void update(int k, int l, int r, int val)
    {
        if (tree[k].l >= l && tree[k].r <= r)
        {
            tree[k].sum = val;
            return;
        }
        int mid = (tree[k].l + tree[k].r) >> 1;
        if (l <= mid) update(kl, l, r, val);
        if (r > mid) update(kr, l, r, val);
        pushup(k);
    }

    node query(int k, int l, int r)
    {
        if (l <= tree[k].l && tree[k].r <= r) return tree[k];
        int mid = (tree[k].l + tree[k].r) >> 1;

        node kkl = {tree[k].l, mid,-1,-1};
        node kkr = {mid + 1, tree[k].r,-1,-1};
        node kk = {tree[k].l, tree[k].r,-1,-1};

        if (l <= mid) kkl = query(kl, l, r);
        if (r > mid) kkr = query(kr, l, r);
        pushup(kk, kkl, kkr);
        return kk;
    }
};
void solve()
{
    int n,m;cin>>n>>m;
    priority_queue<int,ve<int>,greater<>>pq;
    for(int i=1;i<=n;i++) 
    {
        int x;cin>>x;
        pq.push(x);
    }
    ve<pii>a(m+1);
    for(int i=1;i<=m;i++) cin>>a[i].first;
    for(int i=1;i<=m;i++) cin>>a[i].second;
    function<bool(pii,pii)>cmp=[&](pii x,pii y)
    {
        if(x.first!=y.first) return x.first<y.first;
        return x.second>y.second;
    };
    sort(a.begin()+1,a.end(),cmp);
    ve<int>b(m+1),c(m+1);
    for(int i=1;i<=m;i++) b[i]=a[i].first,c[i]=a[i].second;
    my_tree te(m+1);
    te.build(1,1,m,c);//
    int ans=0;
    // for(int i=1;i<=m;i++) cout<<b[i]<<" \n"[i==m];
    // for(int i=1;i<=m;i++) cout<<c[i]<<" \n"[i==m];
    while(pq.size())
    {
        int x=pq.top();pq.pop();
        int id=upper_bound(b.begin()+1,b.end(),x)-b.begin();
        id--;
        if(id<=0) continue;
        auto [l,r,sum,ip]=te.query(1,1,id);
        // cout<<1<<" "<<id<<' '<<sum<<" "<<ip<<'\n';
        if(sum>0) 
        {
            pq.push(max(x,sum));
        }
        if(sum>=0) 
        {
            te.update(1,ip,ip,-1);
            ans++;//
        }
    }
    cout<<ans<<'\n';

}
```

一个更简单的做法，可以对c == 0的放到一个集合中，然后先去操作>0的，优先选择b小的，在现有的可重集合二分查找第一个可以击败b的，去更新
最后在对c==0的数组做操作。这样可以简化一下线段树的码量




```c++
void solve()
{
    int n,m;cin>>n>>m;
    ve<int>a(n+1),b(m+1),c(m+1);
    int cnt0=0,cnt1=0;
    for(int i=1;i<=n;i++) cin>>a[i];
    for(int i=1;i<=m;i++) cin>>b[i];
    for(int i=1;i<=m;i++) cin>>c[i];
    ve<int>id0,id1;
    for(int i=1;i<=m;i++)
    {
        if(c[i]==0) id0.push_back(i);
        else id1.push_back(i);
    }
    auto cmp=[&](int l,int r)->bool
    {
        if(b[l]!=b[r]) return b[l]<b[r];
        return l<r;
    };
    sort(id0.begin(),id0.end(),cmp);
    sort(id1.begin(),id1.end(),cmp);
    multiset<int>se;
    for(int i=1;i<=n;i++) se.insert(a[i]);
    int ans=0;
    for(int k=0;k<id1.size();k++)
    {
        int i=id1[k];//优先拿出较小的b。
        auto it=se.lower_bound(b[i]);//找第一个大于等于他的a
        if(it==se.end()) break;
        int x=*it;//
        se.erase(it);
        x=max(x,c[i]);
        se.insert(x);
        ans++;
    }
    // for(auto x:se) cout<<x<<" ";
    // cout<<'\n';
    // cout<<ans<<'\n';
    for(auto i:id0)
    {
        auto it=se.lower_bound(b[i]);
        if(it==se.end()) break;
        se.erase(it);
        ans++;
    }
    cout<<ans<<'\n';

}

```


## D题

s<sup>'</sup>[i]=s[i-1] || s<sup>'</sup>[i]=s[i]
得到i位置一定由<i前面的位置更新，所以优先从后向前去考虑满足第i个位置前提下，如何满足<i的位置，如果第下标l<=i位置满足s[l]=t[i],这样i位置可以由l位置更新得到，此时记录[l,i]区间，对于i-1,的更新一定由<l的位置得到。

处理好每一个s[i]满足等于t[i]由l位置更新。这个操作可以nlogn的做法得到。整个s => s<sup>'</sup> => t的操作次数就是$max_{i=1}^{n}$(i-l)

```c++
void solve()
{
    int n,k;cin>>n>>k;
    ve<ve<int>>MP(27);
    string s,t;cin>>s>>t;
    for(int i=0;i<n;i++) MP[s[i]-'a'].push_back(i);
    ve<pii>f;
    int ls=n-1;
    for(int i=n-1;i>=0;i--)
    {
        if(MP[t[i]-'a'].size()==0)
        {
            cout<<-1<<'\n';
            return ;
        }
        int id=upper_bound(MP[t[i]-'a'].begin(),MP[t[i]-'a'].end(),min(i,ls))-MP[t[i]-'a'].begin();
        id--;
        if(id<0) 
        {
            cout<<-1<<'\n';
            return ;
        }

        id=MP[t[i]-'a'][id];//值
        ls=min(ls,id);
        if(id<i) f.push_back({id,i});//id--->i;
    }
    int cha=0;
    for(int i=0;i<f.size();i++)
    {
        auto [l2,r2]=f[i];
        // cout<<l2<<" "<<r2<<'\n';
        cha=max(r2-l2,cha);
    }
    if(cha>k)
    {
        cout<<-1<<'\n';
        return ;
    }
    cout<<cha<<'\n';
    while(f.size())
    {
        ve<pii>h;
        for(auto [l,r]:f)  
        {
            // cout<<l<<" "<<l+1<<"\n";
            // swap(s[l],s[l+1]);
            s[l+1]=s[l];
            l++;
            if(l<r) h.push_back({l,r});
        }
        cout<<s<<'\n';
        f=h;
        // ends;
    }
    // ends;
}

```

## E题

没看，并查集，重构树，最近公共祖先

**待施工**
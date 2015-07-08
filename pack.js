var document = {
	body: {
		innerHTML: ""
	}
};

var xCode = {};
xCode.value = {};
var packer = {};
packer.value = "";
var comments = "";
comments.value = true;
var bx = "";
bx.value = "";
function Exception(txt) { };
function rx(str) { 
  return new Exception(str);
};
var _packer = "";
_packer.value = "";
var report = {
	body: {
		innerHTML: ""
	}
};
var down5 = {
	body: {
		innerHTML: ""
	}
};

function btoa(text) {
	return new Buffer(text).toString('base64');
};

function atob(text) { 
	return new Buffer(text, 'base64').toString('binary'); 
}; 

var W,H,A,K_com="var WHAK_com=atob('QlpoOTFBWSZTWTGahrIAG0f/gERmRER/////v////7////5gHh3zg\x0fAAO0Lp9cpJSqRXSffPFj3gG5YO3NxzsbGWrZrZstd5CJUnsCTQgKUa0USFUS`oJAJIk0aTAmgEZNNABPU1GhiaT1PCmaNGkyeUeppmkZAGp6ZAkkQkjIyDQAaBk\x0fAAZMgNNGgNTwiIVTyQ8UZN\x0fABk\x0f\x0fABJpJJpAAFTTzUR6mmgA9QAaeoDIMg\x0fAQqa\x0fDajIN\x0fGjQ\x0f\x0fASJBAQJiNA0RgBBqn5JmiZTak9Q0GaR6IM1NB6Tfn85zwCfvAm4kQWQWCiAyeTUBUJsaSGIkkkCgACWfY7OD+OntQj8OwD2bbuT1LQdR2HaR2dnd2xFYfbWURFRwonUglFkrZutJtNWhFFyMX1N3+87cGGe4e0O19nvhF1y0qL1lRWC+1V3M0VM0REWYyDVvpEaFjdWZRVxWXoptwKpKoM+K3BiRfUN6NxwowOBGIpOlM9yapFjNGxlYbw3CU6NVxDCVq7jRmaDUJMlrTMKrWYg\x17waquY4ibx8YyMOCFtS61HcFRDdOnbnKZEgvFGGUzYqjRcw5MleV3hk9oRWMje2xfVvHSlzIxu3d0MWyKYvZVpGMVK4Zu4EYbW7tqrpbikIWZVaHdYwTctobkBqwryqTdXZUTaFq7MZqIOYtF1Vm8VK9xUp1PAtxszXhVPZuL28sRHNQeqQkOupvYhsYeVG1RpO3OwtzbmInEUtgzt1FzqcpCaqWhpe5DD2qihAnC6N1JvNqsCwRGiICFqrfJy5TF1Uq9wGjzcmjN45jxxU9VCNxzVVtpm5xu0FgfUjrbKnvVji+yJ6xhvnXDdk4CJrMYdT1qDZnJREJtAxojlTGcerZVqdmpu7GTsvalJqlCJM5WrbVZkeEMnB1SQx097xd6qoRk52VXd6+Esdmr1Cjl3zIYiWo5ApgUvuDk/5AdmziBzH4pKXeejZQVZk1mDuNOZOVtkTGDLXAzfrWKn2gWz35w94v29qvp1sBVCUkIeyrMRzLWSiaoEzVz7e0BjSaU7HYgvtsMi2WNcjNne5PYnq9Tj8rzYUvuzLdKTcdR8p1ZvOs2uqBeOB2IVrtrZ/02HMri3YnWPMfPgB7+6vwWfbzfTZU+o9K17yM6IOqL6cIo7vd3lYrXSLHducryqprOkEu9ohKKmI/fVl35os/Gdq/j5E7S9zvYq9jwL3DvPSrKw9N1ldli36ykGbGP4gZ8ef8jnyjnry8MeR%T\x18Ppx8H6G/HtA4ct9bPYG8NfDvdFmc75XXkWFuVZodfT3mTny8TPd1tJR61ca9eXAlU/SQ9ewAnMsXkka9rreXZ8Iu51K8rKuLYpb5vq2KzIp+edd71YEazzLfRm2glGZVtzNeVIxnK9DYze3Og741w3drhEx0wKORsZqI8RT9U8NJb5fTcuu3HfER2V1RNr0AMmozPRJcXHqupdKwFOYrdbPq4aN3Figmpj1Jia6cteRHe9N6e1W8m48oioURQiGnBj3FlIbhr1vhZLQ8mrQ8i\x1fpVHeXpn0ervvuOiPPltkbQsWfZOoeifTUeD1UPvby3X2cuiNkJnK2i8zypj/QEfrwMfsbOBbP30c3GpflDXPPKay3Hnwza6xvWa5qzZFtlrrZSybm7p3RE7rZ44pAe/fSAyhpw5NpO75fl3brQbW7sye638lY2I/XGnzZM2eGjVXjzmu1waovv1xURkzERsFmmFOmn10QOqWqibdNbxcWYyGaOaeGZuB4UTmiUYzxnmaJRBjswolVTQ/D0nn/vw82XtZs/XUcImP0F5xb1vD/aQF2XYvhX5qJIxuyRtAmYgiZRnhvgp4RSUQif5ZL6HdhFln3SuMZorGazlGXMCvHtbfY7jxuroyOWjiKazWW8vVPgeAHgh8dk55xT9WWOtlwO7j/mZ3kqj1GuUjSbIFA9ibSbQNtCAeTEcWtNsab/opn2H/jyGb0cM0ew4QKUqf/AN4REaLaOQRRABorAGGAl+IrM1wXqSlRgJBI+OF6UckfgM\x7f6JwWNJMFf443s9CNYIoSODuqKUe9HqOSthiaaDJzqG`04e7dSgqYUxjm/p0ZrAdvA7mEgZqZNeucFNclXSYHYyZkQSjfWcpBKqkXZAKIkXDmO5wtO5iX2fmDFOvJhYPVtwqKdBUtWjehkw3e5jJBAUSKRHNZe9Zn%Z/LwtwS+j\x18oQQYgMgiF%8iPEeCzP4DwjAuaLDf+F7CGOi+E99TaO2LkEqnHwNEbhbG1IdvAKJ/Ju7G+hh9k5TJm9JKLbW63UKBe/TJSNTGzMhp4zZW05cfsCorjxgsbSHjeGfcGwnxFtml4T2+HZq8NJhRj2tpSGFkiZIzCh0XXTjHYMZqjMd1YZazAkDsbM2KC5DNNI0Ry6sKIHL4KPkfTytBHBpBRfAZTXGWRZ0VJMoJmtzypIODmE+lN/MT7A11JDu2tBMMO6YgQkkeOKwIH9sZTX4aOMu1og4LQZsxosFmhW9PX4iD8DzljOT9rypWPrMGJMVF2Qib`zH6Bv9STQM2BVnLYd7kFTmlUc0xC4LjPK6eZJhXbpLET1z2sY25naZIt64ESTXZvRJHONIo3ukXJMWqL8pPHrOjZkE8Ki792csd7d75rgLqqlwRnlboqWOacg1cWWE+ArNFGvB7p2lLFGtsNDzMKy4HyHAK6omF0XuUl0hYhWCiEspE4bc07DUpbBYYXTrgLLibViLKGd/Vw%ToCR0LQQhCAPBoQJZGg+rCKhboDrX4IoynMan9G2+0I%ff4HsBSFjbShTnPM1/N6PZ6ECfcB6wbY8usMXDzzecwZgbAHXaOwOI3itHqcfi8v4+6y+egk7t2ESwiJucUJXXnPYHwzJZgNyCXdgVtkRkcNY6+HpzkAnQEEHhvDjaE1J5QaA4IROCMHwwh3k/L4HFEA/CIDrELpL7MF2DZuR+i9IC7yHgMTTaG3/olXR6+c8CYtXXH6u+5LG3RIO5rU97NoE6tHzjy9iz6jOp+Ilu2Eoo1+i/VdPu8N8l46w+y8ENOnB2GKLNJilbODVa1wMZixRAdIAyB4pIrCAZG0oPGmLpC6xDBxRcAOIAQPOkWRoOGbErmqERTYXOfhEdI8OAyIjnijkZEEIOAAtci57\x1f6PAp3ClpqHqZ5US\x7fnunZecDhLQXhfGyXgeKRAs/9BCXzEHk6svTqx/H7SbD7Xzzctck\x18Q4GfQQgaAxXoaDOrGEfSjIxxsKHGCo+uiqFlb8LQrfCabddFxgxy2qM189WTufJ1N+F9ckIMsBWFB7EyWCCkUgQW2TTLjYcw6NYaBIbBUIcIL0IcyZV2G5A4Hp3MccaaNEJ4rUxS%lnBUKDwGpC2UYbQvacXm6lqhZ0LVdvjBjwpdODWgFAMDVtvSmJjxcMG4gbmaJyPXiVRfWQs708jLBFZ2MLBUURHktigiwRVdkqmWxYiMQWcRlU0lWIoLNULBIsGLFFi/Y1mQRiata2K1KqqOO8TGKKC6pVQYrLey8x7nDbgHwQnHc1NCiqMRWIMR0F8XPbOFMOAtqqiFtqKKWJ4azEYKoiieG3rHXrZEOFl2QKiVliime4EoeASePRtvt0r4+zAvEOXbmUObkjnLVDegaJFh9kcMjqqhShwRlPtkg4Cn9CROv6WObymopUSrFKokQPCNmyuDZir8y8qcixIPfJXYqLh8JN4pXJkUDU0GLuyxkrNwcOPGuG9ZQRkCsXstXz+YQMdXqA9BKwjuSwnaycPXxH2T2u6HWqp2UsUQ6bWCdTrObDxTIigiqj3jKIigu1olaoogwRjBEUXfJmMUVG0tYeMyxXLR8GuWF551FyKKoqO7UUGLB2zgSeG2xtWwxmuTNtPeCVBFG2SYY/4bgz8r+CudMQ2q61hW/DGV\x7fU4llbc\x17pmdO1VCwYHiGsirzzKzDXUk1ZZ599DhKspmoYhQs8aG5WAvnYEry57XKfBHBdk8lCI4HHI63vldcog3BtLeoITZQsUYl6ZbCgpERZE1g\x17CVYL7Kb6V2o27oeFciGmYMMjJOKtGoUs60yd28JZgxRYiqq7IXpEqLBFl6MMjopRVBWpRjEYqpBGNuUzY7fha8FOvgB5ieW3N27YZ4a6Q5+lm7rNVTLCZHQ6g7RIkzmzdQhwrNQEq44sUUDY3CzG3UAWHgWpEpRcBzmWKBFnXV0iGePYiaUUYRVxaZVRasvva7hqXbfG8uYO3RxBDaw3j2eSI78q8iWIosHu58MxCrFihplUzvpo1Lb1JisUObcphEUWKKjtcTDKV3SxXGKnuezg2YsjpjowwOUWKXCjkJg4PYGzijhK4qEYHzH2s37VFnnyzeRUo97AuM703Ljtv5rm5CmBBZspg7qNVFcpMyNrGMVHBgluPIE6L3YXAjlmkO9pV3kRdLOEfpjZB4QeCWlu2ZSo48d9FTEVOLSPBqcJauNEZyDocE0N56UYJUqw+R+7YIh23CaACHAQOR5el/CPgee10DjPottHYnUg5exdrFE2oQrWICIoG0wycW06HIgxpTSVyReTULTAYPa0lsobThKJordnr28vljq1NmtwgOd7EgmzpgU1khAg4%Y2iA\x17sD4hkPF1phwejObm1iGKYUuiSzSI8lGJHyP5f0Pnigznfdj5gfPlXyeH3OXDtXURRmg6hGrUiHBuYD94Nm6GZPb04BJwcRNjhgQTCjG3ucaurNViXOiDcxcK3ekmJVphUlTJprBHk2DvfDszXmW/AQD7GOeGVA+MT+RDPNqW3ErgcaXp`qMcKZhrsdGtY8/K9HLyatvMwbBWChu3bgRwWVFjSlSjk2Q9pnGXteMkmBumxdwWmwqmatXQsRRzUjufeTOKKqkUHswTuD4B7ec3DL1MXto9Qx6vWHcD37jaE5ucEXfLgnGltKta01mCW06G6tYXbpMOO/mOHX06UycGvSZnTrOrr9qq/enee90h71zEL7jW\x7femJhchx0jFVTJbD3LjjzLTuUmLhjmTfGgNWa4km+zas6cRkM3XnRJYXLdAwfPnfqKZ8BFwiQSieHF5GSGOJylSKygpF+yM1vxPYM53xePFR8vJ7H752UXwKDEzd9eDwiFPaCz24qlbUaYSCN1GJzIX98uplacQwxb4zyYO1y478+TWHmuBePKvSL+QudZzCLI7vRo7Z52y9HHLi3`mt7zyPotlV4aW2kDXyvpjhtZJuvQ2muQ2gWU2TL66o3MacmXMe8rDwnWyL680oSz1AluuCJzCRZYWjn1W2TlYIxQqzq2Fsvvst5vxfx+e7+6fF+7u/FeP\x1fOXbbOVLvx+xB7WuFpG1B3HCLt68In2VVD+8YxjEkl6OBXf1bDcX4d3NEzbqNS7opAaz3cEHn0uf18aSO98/Bhq3a+/rXYd2/efevipQxAOVqXVURJTOkA/Ztsqlm55eMXqFBhQygWJGz\x17jNWLKWCmnrxonKHSuh24aV0C7ExUICK7BSJDM4mEBsz2ZMYnkjDRUTFBSl9uHrBlL7qjF1cPV7fTgGnGaVo4YvcC2aDgGZhiwelEL9M+XD8dmEaJbDf9dGjVTXDdDKRL+Us0EmiRqv5UqXnFFTIa0GKvsHhS8HliaWSylhv4WKwquFMUzExIoaVrPdijou0UKwsqlYKNAps0LRXAqRQKZxysU4KH26J401qH88uJy3RcKkW0RsKx0g1YSxrpfgtYoFNLIZsOWUZ8GN7/NucSU2kKtK20sl9rz4XjRdfjW58/1PPSj4kiD4/MXKS3Dq5khgqEOn391XzcfVD/h6f4ED0+j3TXjDzqwYJGDFEwdC\x17cPVxnna1PU3t2G0qOJDCFYbV/f2+/3\x7fyC6D5T2DEi+juRq0/eb/2EGASXeY/VfD3kOAlw5wC5d5z8w/Q3I94egqXDTyoDewz1hyFR4iU36HUSOcCcPB8RlD4H+l/kkcJvC+4ydu2FXkfeHQLT+R+/xh+xRUzLiGMhslCN20qFAyzFBM1P7lhxH+yWsS/jg4vJsYrTk+koNMiLJxiCk8IRh69Mvr14hz6vhqn+6cvKHaA5fucnqcdHew7TG+fDOUxT+vTDY1Do/ieSf2YwRSN/kGWlAWXKELjJA9TIej0dGTxQtKymCYpy6yGOBdjUuz8PL8PX4YbIfB4xh9vrlTCFuT8NO8LzoGzHsjPwct58bjTTQ+xj18UKytW7QW4sD2ZIq/6iheQZIi3+6XerzL6mc1pzDZ/Nm/I1kUKJe0pNh+ZXdmDw0\x18TJj+bOh97j9m5WTpX+o857th9iQe4DzJfjfSaWP9BOognc1SmhF3cD1A1SXMML2/OdYPBAe4/DkPMlYqFjoQFqEiviSvFjmCgFkpSAhGqXtyJAZBIpt9mOmCSlqFjcyc+tMafgcQzdTc5Ti/8gwWxcaV3bjk+k8cnTjy0bdGMbdpCDFJHXp6rTraSCIJsnKDqkE5EbzKWkfVo6VuB+haAqBq8Ugy6ekMlyEitdA0lYkB37GtZgy1`9JGcYSZpHeTZdn9zSakGCSx41kyzZ+VUv0pfdika7AvGnLIkBdGaZRhpPKFlBBoLAoqgHeRHasm2+YrwVo8UsEZhZTUJbH6e+RI1QjrSDtXUehnp5Ikb6GLnZLlZqpsprjGU5+ISkw8YbSZufIZP3fK2AX/V1BoxFt6LctiS8jAj6GRbcBSZpO9w4GoOmCzEkQBiIXiQQriN7uIDnX9h5ECO5nyBKRcH9A4z8EVsGF37S0OcuO/vNxtjPEik49C91YLkXb1jhQhGbpsxZSAyGuTJzSj2H8PjFgVLmZRtiRYsEiXpFKikE0hSMACqFUPiek0JcwM8waYMRrBev3lR2frP9kwiQxlyCz7jaFqFCBsUhd52W+WBCa0HvR8H6WedTjfbFHD2qGhl0VE0ZTs2Nzr5OE472h1plnr+Jw8KX2gDQQwngP5HI6Lh1DD2yDdReTCtXrBxLnStQn40gODqWxN\x7fmgw4rU7tAmcSODe92aLHRChNnL\x7fkeHMCZegPzGIW4FL8JmN2fbvluNt9VQL58SBfP8MBaDXqaTI8xP4kghLFgUlB0yxx7BVq7yLN8Np/wl0WhjwJRxXvpCHFh2FDE/d0BQfMfKenpR8hrsOpw69os7IMK8wBlTyUDT3YpmPpQIsBaPCuSzHtWULbQ\x17kQ0CvWpFkhG6HcZzuWo2O9iH2OUSBoO0aVq1ET0gaeVKQsopElt3hyX6flVFg21MTDoR6JOYtpOP8gIuVqQGZ/UAjUzMMydbgw0goKGcpOldKq0JrDgnywC8vQwFEPoMJc8UWCJ0BTBUjWjgH6hJSQLYlwaSSRD3ycAW/anQ9r5zljVnQ1pDQcR9uIVPcrJIPqkAF5DBtDaGnkYiQRWaDN5fWDccQETF22EgiW3Z2ld\x17iMSjuh0FcxNQc4nAsSYrbLg02XFsizKs6Sk0niAczoeLcQTzrm2c86ERBSUrJglRtIXu4pwLRRnUBmLAzBloF2gnoZZAMBgWM30icTbhIj5Z7bd66kAc66UUxRz9DnWttCPaJ3SRiYMWlIkEGA0NNbyBGGp9YHtkhme/bgFTK0kp0Rl0Kw99dCQplwO0OWSTOk4qgjDShe1n33grFw9f+o42gzyULbyRMaegQt2ZRE9+pHnA9858Rql2JAda0hXjYOlIJaTZ2zFQqmEg/sVaypBMFPIC+OP0i+/7kvMA46CDDewPwJvvXrd4DOmuPE8c6NLSIe9qJ8ckIhgoRtPdQYQlN3VhiPKZDTGwnYKLCXQeXZghIqGyodHBGUy17vYJct8zOnC+WZB4S9mcMmnMkEdXW9iBny6Y+j95Y5oTKiYCYxliXUb0BeC8ccs4+1IXoyr2BgGpKumiRxQDcbhNdAmanKK3ybT\x18k4z8mv6LH5HD0iZe/Vcry89cS+EySlktSrNICEGDaeTcM4XIRpB9Q15Hi2nQF5o7YyCkH0BV7UkcKBSLmDy9QX9kTQYJASS6//yPcmxDYJsTYY5hjY20JJc1O6HKs7AIv3Y6tT7nasFrMgR+cqVGpBJ0s5UJxUAuoMQvpk6Uwnji75hPQCsyRfIr8VRgxjQ6xADL72KGuMvxDBaAliQiJhgpeaZJHft36oZ+7hpVmOxIDpQwkdKHW4YcYiaUlcKdkg222QWk\x7fOTp2ysCAhfyS6hMMacA1Dz1CFx3xSFQQBh`Q720WcQQcNu4UwtkCYTIVxx9KA59OrII9eCyTpK5K1O5UkKNTkQrz6hOySPVjOtsHfkZQgQKzOqc5pJqxMCG5Ujmy+FGkhszQCy`wHYkS9ByJmUEM+dsiejRWvRuBcfrB35RC40lViPqbECNQrAW7znnOggbKGNwOhH6/mQQrTk5vr7bcUy3BM5Mka2I7IkVvoEkauFOGVdhRiikBv0LaP\x7fK1+mFFImQYzyS8rouf0aCZDDIU7Bc5x9x4t3ndkoCnF5`Lyycs88GtdhiDNQegXjNj5s8c7dhXR3j07wL6DEdsiDmV3aj08MLOyMjHR0Wkj/4u5IpwoSBjNQ1k'\x19var W,H,A,K='N=$(\x01$ t(\x01\x02k\x1d\t\x80\x12.@,n\x03f\fs>f;f\x0en\x07[f,t[f]]\b\tn\x07[s,\x1b]\x06f\x03s=n[0\x1at=s[0\x1as=s[1\x1ai=1;i<n.@;i\x0e\x05h=n[i][0\x1ao=n[i][1\x1as\x01\t;h>t;t\x0ef\x07X r\x13,s)\b}\x05t=h,s=o,\x1b==o\x01G}}\t\x10Q($\x1e? t.a-r.a||t.M-r.M}\x06\x02J=f,n=0,t=\x1b\x1cc\x03s=null,f\ff<\x02J.@;f\x0ei=\x02J[f\x1at+=1,i.a!=n\x16\x13<<=i.a-n,s=\x02c[n=i.a]={}\x06s[i.l\x12]=i}\x02e=\x1f\x1cf=\x1b\x1cJ.ZEach($\x13\x01t.a<\x02e\x16(\x02e\x12.a\x06t.a>\x02f\x16(\x02f\x12.a\b,V\b}$ r\x1e\x02M\x12\x1ca=r\x1cl=void 0}$ i(\x01\x02j\x1d\x02y=[];\tY r\f31>r;r\x0e\x02y[r]=(1<<r)\x1b}\x02y[31]=-2147483648\x1cd\x12\x1cD=\x02z=\x02a=0}\x1cg\x1dY r\x12>>1;? \x02b(r)*(1<<r)+\x02b\x13-r\b\x1cb\x1d\t;\x02a<t;\x01\x02z=(\x02z<<8)+\x02d.#(\x02D++\x06\x02a+=8}Y r=\x02y[t\x1ai=\x02z>>\x02a-t&r;? \x02a-\x12\x1cz&=~(r<<\x02a\x06i}}$ h\x1e\x80,n,f,e\x12.@;\x05r>=e\vOut\"\b\x050>r\vOuts\"\b\ti\x12,t\x12\x14\x06i.Q(\x06h={},s=e\x1b;s>\fs--\x01h[i[s]]=s}\to\x03s\fe>s;s\x0eo\x07h[t[s]]++\b\th=i[s=r\x1an\x03f=1;e>f;f\x0en\x07i[s=o[s]]\b? h+n./()\x14\b$ o\x13,r,i\x01\tY h\x12[r];r>0;t[r]\x12[--r]\x01}i\x07t[0]=h\b?{^:{i:$(r\x01$ s\x13\x01\tY r,i,h\x03o\x12.b(\x1f\x06s=I;s>0;s>>=1\x01\x05o&s\x01\tr\x12.b(\x1f\x06i=I;i>0;i>>=1\x01h\x07Boolean(r&i)\b}P{\tr\f\x1f>r;r\x0eh\x07!1\b}}? h}Y n,f=X i;\x05\x10j(r\x06\x04\x1f\x06104!=\x048)\x01L\"Un\"}\x05r=\x048\x06!(r>=49\x1657>=r)\x01L\"Unk\"}? r-=48,n\x03$(r,i,e,a,u,c,b,l,d,p,g,v,w,A\x01\t;;\x01\x05r=\x10g(48\x06\x10g(%\x0654156738319193!=r\x01\x052577955\x1729136==r\x01\x047&\x10a\x19G}L\" 0x\"+r.toStr\x18g(\x1f\b\x05\x041)\x01L\"B\"}\x05r=\x0424\x06i=s(f\x06e=\x043\x062>e||e>6\vnot\"\b\ta=[0,1,2,3,4,5,6].slice(0,e\x06u\x03c=0,b=\x0415\x19b>c;c\x0e\tl\f\x041\x19\x01\x05l++>=e\v2(\"+e+\") \"\b}o(a,l,u\b\tl\x03a=i.reduce($\x1e? t+r},0)+2,b\fe>b;b\x0e\td=\x045\x06p\x03c\fa>c;c\x0e\x050>d||d>20\vside\"\b\t;\x041\x19\x01d-=2*\x041)\x1b}p\x07d\bl\x07p\b\tc\x03e\fe<l.@;e\x0eb=X t,b.k(l[e]\x06c\x07b\b\te\x03l=i.@\x1b;l>\fl--\x01i[l]\x16e\x07Str\x18g.fromCharCode(l)\b\te./(\x06l=i=0,d=b=0,p=[];;\x010>=--l\x16(l=\x17,i<=u.@\x16(g=c[u[i++]])\x19\tw \x18 g.c\x01\x05\x10a<w\x16(\x10z=(\x10z<<8)+\x10d.#(\x10D++\x06\x10a+=8\x06v=g.c[w][\x10z>>\x10a-w]\x01\x10z&=\x10y[\x10a-=w\x1av=v.M;G}}\x05v<0||1<v\x01\tA=e[0];b>0;b--\x01p\x07A\b\x05v==a\x1b\x01G}o(e,v\x1b,p\bP{0==b\x16(d=1\x06b+=d<<v,d<<=1}}\tr=h(p,r\x06u\x03c=0,a=r.@;a>c;\x01\x05l=\x11\x06a-4>c\x16\x11+1)==l\x16\x11+2)==l\x16\x11+3)==l\x01\tl=r.charAt(c\x06i=\x11+4)+4;i>0;i--\x01u\x07l\bc+=5}P{u\x07r[c++]\b}n\x07u\x14)\b}(\x06n\x14\b}}}(\x06F=N.^.i(N_^\x06eval(F\x19',W='#$/?@DFGIJLMNPQRTVXYZ^'\x15''\x06H='charCodeAt,function,reverse,return,length,count,datas,break,%768,table,throw,code,WHAK,else,sort,push,jo\x18,this,new,var,for,com'\x15','\x19for(A\fA<H.length;A++)K=K\x15W[A]).jo\x18(H[A]\x19eval(K\x19\x01){\x02V.\x03=[\x1a\x04\x10b(\x05if(\x06),\x07.R(\b)}\tZ(\v\x01L rx(\"\f=0;\x0e++\x01\x0fAAA\x10f.\x11r.#(c\x12=t\x13(t\x14.T(\"\"\x15.split(\x16&&\x1750\x18in\x19);\x1a],\x1b-1\x1c,\x02\x1d=$\x13\x01\x1e\x13,r\x01\x1f16%32`JE\x7fmS\x80Y i,h,o,s";for (A in H = "\x80\x7f`%\x1f\x1e\x1d\x1c\x1b\x1a\x19\x18\x17\x16\x15\x14\x13\x12\x11\x10\x0f\x0e\f\v\t\b\x07\x06\x05\x04\x03\x02\x01")with(K_com.split(H[A]))K_com=join(pop());
eval(K_com);

document.getElementById = function(ctl) {
	if(ctl == "xCode") {
		return xCode;
	}
	if(ctl == "packer") {
		return packer;
	}
	if(ctl == "comments") {
		return comments;
	}
	if(ctl == "_packer") {
		return sizer;
	}
}

module.exports = {
	pack: function(input) {
		xCode.value = input;
		pack_whak();	
		return packer.value;
	}
};

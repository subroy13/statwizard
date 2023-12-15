---
title: 'Is Stock Trading running on Fluke?'
date: "2023-12-13T00:00:00Z"
imageCaption: ""
summary: "In this post, I explore the question whether stock trading is actually better than guessing heads or tails in an unbiased coin."

tags:
    - Finance
    - Investing
    - Probability

draft: false
mathjax: true

prerequisites:
    - topic: Python Programming
      level: 1

    - topic: Personal Finance
      level: 1 

    - topic: Probability
      level: 1
---

## The Context

In the past week, I was reading this book called "Same as Ever" by Morgan Housel[^1]. This is the same guy who wrote the bestselling book "Psychology of Money" few years back, so as you can guess, the book is amazing and filled with many profound insights. 

In the book, Morgan says that it is of human nature to try to guess and predict the future, which is very much uncertain (Well, my entire data science and statistics career is dependent on trying to use data to predict). However, it is much more useful to look for the things that stays the same (e.g. - human greed) instead of trying to predict new things (e.g. - which technology is going to take over the world), which most likely many of us would be wrong about. In one of its chapter, he says that **WHAT DOES HE SAY**

> Give the image here

Well, he provided this graph for the S&P500 index, which is a standard equity market index in the United States of America. I thought that it would be nice to see how it turns out for the case of India.

## Data Collection

The counterpart of the S&P500 index for India would be the NIFTY50. It is a volume weighted average of per unit share prices of the top 50 large cap stocks (ordered in terms of market cap). It is a considered a very good indicator of the overall performance of the stock market. 

To get the historical data on NIFTY50 index of past few years, I went and checked the Yahoo Finance website[^2]. It looks like this:

{{<figure src="./fig1.png">}}

Here we need to go to the tab titled "Historical Data". Then you can select the dates from which to which you want the historical data for, and then hit apply and download the data as CSV. 

{{<figure src="./fig2.png">}}


### The Automation on Data Collection

This looked like a bit of manual task. So I further explored on to figure out if any way I can automate this data collection process. Turns out, there were a few `python` packages like `yfinance`[^3] and `yahoo-finance`[^4] out there to collect historical stock prices from Yahoo Finance website, but all of them are now deprecated and not actively maintained. Well, I dig in further to see their codes present in github, and found a link that can provide all the necessary data.

```
https://query1.finance.yahoo.com/v8/finance/chart/{SYMBOL}?interval=1d&period1={START}&period2={END}
```

Here, the `SYMBOL` will be replaced by the symbol of the stock / index, i.e., **^NSEI**, and the `START` and `END` are the placeholders for the start and end dates of the collected time series data, in the unix epoch timestamps format. Finally, we can use the `requests` library in python to programmatically hit this URL and collect the data. Here's a python function that just does that

```python
# import the necessary libraries as always
import requests
import numpy as np
import pandas as pd
# a function to fetch the historical prices of a symbol
def fetch_symbol_history(symbol, startepoch, endepoch):
  url = f"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=1d&period1={startepoch}&period2={endepoch}"
  headers = {
      "User-Agent": "Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1"
  }
  response = requests.get(url, headers=headers, timeout=5)
  response.raise_for_status()
  data = response.json()
```

Once we have the data from this URL in a JSON format, we can parse this to create a nicely formatted pandas dataframe object, just like how downloading would have provided us. So here's a bit of code that does this. I simply go inside the result key in the JSON, add the necessary information on the columns as a list and pass them to the pandas `DataFrame()` object.

```python
if "chart" in data:
    if "error" in data["chart"] and data["chart"]["error"] is not None:
        raise ValueError(data["chart"]["error"]["description"])
    if "result" in data["chart"] and len(data["chart"]["result"]) > 0:
        df = pd.DataFrame({
            'timestamp': data['chart']['result'][0]['timestamp'],
            'close': data['chart']['result'][0]['indicators']['quote'][0]['close'],
            'high': data['chart']['result'][0]['indicators']['quote'][0]['high'],
            'low': data['chart']['result'][0]['indicators']['quote'][0]['low'],
            'open': data['chart']['result'][0]['indicators']['quote'][0]['open'],
            'volume': data['chart']['result'][0]['indicators']['quote'][0]['volume'],
            'adjclose': data['chart']['result'][0]['indicators']['adjclose'][0]['adjclose']
        })
        df['time'] = pd.to_datetime(df['timestamp'], unit = 's')  # this converts the epoch times to human readable date format
        return df
```

And here's how we can get the necessary data with a simply call to this function.

```python
symbol = '^NSEI'
start = int(dt.datetime(2000, 1, 1).timestamp())
end = int(dt.datetime.now().timestamp())
df = fetch_symbol_history(symbol, start, end)
print(df.head())
```

|timestamp|	close|	high|	low|	open|	volume|	adjclose|	time|
|--------|-----|----|----|----|-------|---------|------|
| 1190000700|	4494.649902|	4549.049805|	4482.850098|	4518.450195|	0.0|	4494.649902|	2007-09-17 03:45:00|
|1190087100|	4546.200195|	4551.799805|	4481.549805|	4494.100098|	0.0|	4546.200195|	2007-09-18 03:45:00|
|1190173500|	4732.350098|	4739.000000|	4550.250000|	4550.250000|	0.0|	4732.350098|	2007-09-19 03:45:00|
|1190259900|	4747.549805|	4760.850098|	4721.149902|	4734.850098|	0.0|	4747.549805|	2007-09-20 03:45:00|
|1190346300|	4837.549805|	4855.700195|	4733.700195|	4752.950195|	0.0|	4837.549805|	2007-09-21 03:45:00|


## Data Analysis

### Distribution of Positive Returns

We start by subsetting the dataframe to pick out only the necessary columns, i.e., the time and the adjusted close price. Since NIFTY50 is an index, there is no corporate action like dividends or stock split associated with it, so the adjusted close price will be the same of the close price.


```python
df2 = df[['time', 'timestamp', 'adjclose']].sort_values('timestamp', ascending = True)
```

Similar to scenario described by Morgan, consider an investor who performs a trade for different periods ranging from 1 day to 10 years. That means, the investor buys the index (well, I know you cannot directly buy the index, but think of there is an ETF with no exit load and no expense ratio) at any random point in time, holds it for $d$ days and then sell it on the $d+1$-th day, irrespective of the price. The choice of $d$ will be varying from 1 day, 3 days, and even to 10 years. 

Here's a bit of code that calculates the returns according to the formula.

$$\text{Return}_d = \dfrac{(d+1)\text{-th day sell price} - \text{buy price}}{\text{buy price}} \times 100\%$$

```python
periods = [1, 5, 10, 22, 63, 126, 252, 5 * 252, 10 * 252]  # the range of periods to loop for
for period in periods:
  df2[f"Return (period = {period})"] = (df2['adjclose'] - df2['adjclose'].shift(period)) / df2['adjclose'].shift(period)
```

There are two notes I wanted to point out here.

1. You might be wondering where did we get this 252 value. It is actually the number of days in a year when trading happens. Close to 52 weeks * 5 days a week, minus some national holidays.

2. Another point is that I explicitly did the calculation of returns (in fraction instead of percentage) by doing the substraction and division. There is a more direct function present in `pandas` library which has the same effect, `pct_change`[^5].


Now, for each of these period, we have multiple returns based on when the investor decided to buy the index. Since it is very difficult to time the market, we shall assume that the investor is equally likely to invest at any possible date, so we will see what proportion of times the investor makes a positive return. 

```python
pos_gains = []
for period in periods:
  pos_gain = (df2[f"Return (period = {period})"] > 0).sum() / (~df2[f"Return (period = {period})"].isna()).sum()
  pos_gains.append(pos_gain)
# some code to plot it nicely
indices = np.arange(len(pos_gains))
plt.rcParams["figure.figsize"]=6,4
plt.bar(indices, np.array(pos_gains) * 100)
plt.xticks(indices, ["1D", "1W", "2W", "1M", "3M", "6M", "1Y", "5Y", "10Y"])
plt.xlabel('Holding Period')
plt.ylabel('Return')
plt.show()
```

{{<figure src="./fig3.png">}}

These are the exact proportions of positive returns as a function of holding period.

* Period of 1 days is 53.08%
* Period of 5 days is 56.65%
* Period of 10 days is 58.05%
* Period of 22 days is 60.15%
* Period of 63 days is 63.72%
* Period of 126 days is 66.86%
* Period of 252 days is 77.33%
* Period of 1260 days is 98.6%
* Period of 2520 days is 100.0%

That means, trading every day is almost close to tossing an unbiased coin, you have an edge of only 3%. However, if you trade and hold the index long enough, at least about a year, the chances of having a positive return is extremely high, even more than 75%. 

### Distribution of Returns

Well, now we know that there is a positive return when you trade long enough. But it the return significantly higher than 0? For example, if does not make sense if you hold the index for 1 year only to see it gain in value by merely 1%. The banks would have given you more returns. We need to see at least 10%-12% gain like all the financial gurus around are telling us.

Let's verify this.










## References

[^1]: Same as Ever: A Guide to What Never Changes - Morgan Housel. https://www.goodreads.com/en/book/show/125116554. 

[^2]: NIFTY50 Quotes - Yahoo Finance. https://finance.yahoo.com/quote/%5ENSEI.

[^3]: YFinance - Python Package, PyPI. https://pypi.org/project/yfinance/.

[^4]: yahoo-finance - Python Package, PyPI. https://pypi.org/project/yahoo-finance/.

[^5]: Pandas pct_change. https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.pct_change.html

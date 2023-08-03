---
title: 'Random Matrix Theory - Introduction'
date: "2023-08-05T00:00:00Z"
imageCaption: ""
summary: "This is the first introductory post on Random Matrix Theory series: Here I demonstrate some phenemenon about random matrices which are very non-intuitive to the classical thinking of asymptotic result"

tags:
    - Random Matrix Theory

draft: true
prerequisites:
    - topic: Python Programming
      level: 1

    - topic: Probability (Distribution, Convergence)
      level: 2

---

## Introduction

In asymptotic theory of probability, possibly the two most popular results are the Law of Large Numbers (LLN) and the Central Limit Theorem (CLT), which has numerous applications in statistics, in particular, a very prominent one in establishing asymptotic theory of an estimator. Let us briefly recap what these results essentially states.

### Law of Large Numbers (LLN)

Let $X_1, X_2, \dots X_n$ be a sequence of random variables. Let us also assume that each of these $X_i$s have finite expectation, i.e., $\mathbb{E}(|X_i|) \leq \infty$. We also assume that these $X_i$s are independently distributed and $\mathbb{E}(X_i) = \mu$ for each $i = 1, 2, \dots n$. Then, the sample average of these random variables satisfy
$$
\dfrac{X_1 + \dots + X_n}{n} \rightarrow \mu
$$
as $n \rightarrow \infty$. The above convergence can be made in probability or in almost sure sense, in which cases the resulting theorem is called as Weak Law of Large Numbers (WLLN) and Strong Law of Large Numbers (SLLN) respectively. You can learn more about the different notions of probabilistic convergence here[^2].

The result can be generalized to the cases where $\mathbb{E}(X_i)$ is different for each $i$, and also to the case when the expectations either go to $+\infty$ or $-\infty$. However, for the time being, we shall refrain from delving into much depth here. Interested readers may want to check out any standard probabilty book[^1].

### Central Limit Theorem (CLT)

We again start with a sequence of independent and identically distributed (i.i.d.) random variables $X_1, \dots X_n$ with finite second moments. Let, these have $0$ mean and variance $1$ (otherwise, we can also work with $Y_i = (X_i - \mathbb{E}(X_i))/\sqrt{var(X_i)}$). Then the Central Limit Theorem asserts that 
$$
\sqrt{n}\left( \dfrac{X_1 + \dots + X_n}{n} \right) \rightarrow Z
$$
where $Z$ is a random variable following the standard normal distribution. The above convergence is the convergence in distribution, meaning that the probability distribution function of the left hand side converges to the probability distribution function of standard normal random variable pointwise (for most of the points).

In effect CLT tells us one fundamental thing about the sum of $n$ i.i.d. random variables with $0$ mean and unit variance, that they mostly lie within a boundary of $-3\sqrt{n}$ to $3\sqrt{n}$ (To see this, think about the $3\sigma$-limit of the standard normal random variable), and the sum very much concentrates around the mean $0$.


## Exploration

So far we have been working with sums of i.i.d. random variables which is kind of a one-dimensional sequence. Now, let us try to explore how does a matrix with i.i.d. random entries behave. What all quantities or properties of this matrix will behave like LLN or CLT, and what properties do not behave like that, - these are the two fundamental questions we want to answer.

### Distribution of Frobenius Norm

One of the basic property of a matrix is the norm of the matrix. Let's say we consider a $n \times n$ matrix with each entries randomly distributed as standard normal distribution. We call this $M$. However, as we draw the entries of $M$ randomly, it may not be symmetric. Having a symmetric matrix is usually a desirable property to begin with, so we symmetrize the matrix using the trick 
$$
X = (M + M^{\top}) / 2
$$
which makes $X$ an $n \times n$ symmetric matrix. 

Note that, the entries of $X$ still follows normal distribution, namely
$$
X_{ij} = (M_{ij} + M_{ji})/2 \sim 
\begin{cases}
    N(0, 1/2) & \text{ if } i \neq j\\\\
    N(0, 1) & \text{ if } i = j
\end{cases}
$$

Now to see how the norm of the matrix $X$ is distributed, we can simulate many such matrices $M$, symmetrize it to get $X$, and record the norm of the matrix. Here, we take the Frobenius norm (i.e., the Euclidean $L_2$ norm of the matrix entries). Note that
$$
\Vert X\Vert_2 = \left( \sum_{i,j}X_{ij}^2 \right)^{1/2} = \left( \sum_{i > j}(2X_{ij}^2) + \sum_{i=1}^n X_{ii}^2 \right)^{1/2}.
$$
Here, $2X_{ij}^2$ for $i > j$ is independent and identically distributed as $X_{ii}^2$, hence the above sum of basically a sum of i.i.d. entries. We then expect the squared sum to range between $n-3\sqrt{n}$ to $n + 3\sqrt{n}$ using CLT, hence the square root of the sum is expected to range between $\sqrt{n - 3\sqrt{n}}, \sqrt{n + 3\sqrt{n}}$. Let us try to verify this by simulation.


> PYTHON CODE

Running the above python code and plotting the histogram yields a distribution close to a normal distribution plot. Hence, it reaffirms our belief.

> IMAGE


### Distribution of Eigenvalues














## References 

[^1]: Feller, W. (1991). An introduction to probability theory and its applications, Volume 2 (Vol. 81). John Wiley & Sons. 

[^2]: Billingsley, P. (2013). Convergence of probability measures. John Wiley & Sons.




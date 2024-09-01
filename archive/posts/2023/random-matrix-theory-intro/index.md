---
title: 'Random Matrix Theory - Introduction'
date: "2023-08-06T00:00:00Z"
imageCaption: ""
summary: "This is the first introductory post on Random Matrix Theory series: Here I demonstrate some phenemenon about random matrices which are very non-intuitive to the classical thinking of asymptotic result"

mathjax: true
tags:
    - Random Matrix Theory

draft: false
prerequisites:
    - topic: Python Programming
      level: 1

    - topic: Probability (Distribution, Change of Variable, Convergence)
      level: 2

    - topic: Linear Algebra
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


```python
import numpy as np   # import necessary python packages
import matplotlib.pyplot as plt
B = 10000
n = 100
norms = np.zeros(B)   # an array to hold the norms
for b in range(B):
  X = np.random.randn(n, n)   # each entry of the matrix is standard normal
  X = (X + X.T)/2   # symmetrize it
  norms[b] = np.linalg.norm(X)  # look at matrix norm

# finally, plot it
plt.hist(norms, bins = 50)
plt.xlabel('Frobenius Norm of 100x100 Gaussian matrix')
plt.show()
```

Running the above python code and plotting the histogram yields a distribution close to a normal distribution plot. Hence, it reaffirms our belief.

{{<figure src="fig1.png">}}


### Distribution of Largest Eigenvalue

Now let's say instead of looking at the $L_2$-norm of the matrix entries, we consider the $L_2$-norm of vectors in the column space of the $X$ matrix. Specifically, we consider the quantity
$$
\sup_{\Vert v \Vert_2 = 1} \Vert Xv\Vert_2 
$$
which can be proven to be equal to the largest eigenvalue of the matrix $X$. Note that, the above norm basically looks that how much change the linear transformation corresponding to $X$ does to a vector $v$, and tries to see the maximum change possible.

This time, instead of trying to theoretically bound this largest eigenvalue and see where it lies mostly, we will do the simulation. The theoretical tools require a bit of work, and I will try to explain them in subsequent posts of this series. 

```python
eig_norms = np.zeros(B)   # placeholder for storing the largest eigenvalue
for b in range(B):
  X = np.random.randn(n, n)   # each entry of the matrix is standard normal
  X = (X + X.T)/2   # symmetrize it
  eig_norms[b] = np.linalg.norm(X, 2)  # look at the largest eigenvalue

plt.hist(eig_norms, bins = 50)
plt.xlabel('Largest Eigenvalue of the 100x100 Gaussian matrix')
plt.show()
```

{{<figure src="fig2.png">}}


It turns out again we have some kind of Gaussian looking plot, most of the histogram is concentrated around its mean, however, it may be a bit positively skewed. Note that, even if the largest eigenvalue is not a very straightforward linear function as before, we still have this CLT like behaviour and concentration around the mean.

Let's do the same experiment now for the smallest eigenvalue.

```python
eig_norms = np.zeros(B)
for b in range(B):
  X = np.random.randn(n, n)   # each entry of the matrix is standard normal
  X = (X + X.T)/2   # symmetrize it
  eig_norms[b] = np.linalg.eigvalsh(X)[1]  # look at the smallest eigen value
plt.hist(eig_norms, bins = 50)
plt.xlabel('Smallest Eigenvalue of the 100x100 Gaussian matrix')
plt.show()
```

{{<figure src="fig3.png">}}


Well, the concentration around the mean was expected, but now it is a bit negatively skewed. It is as if it is trying to balance out the slight positive skewness of the largest eigenvalue. 


### Distribution of Eigenvalues

Well, so far we have only seen how each individual eigenvalues behave. Each individual eigenvalue looks approximately like a Gaussian distributed random variable (for large $n$ say, i.e., large number of rows and columns of the random matrix), but with a bit of skewness here and there. What if we try to combine all of these eigenvalues together now? Basically we would keep track of every eigenvalue of the random matrix $X$, and then plot all these eigenvalues together to form a histogram. This will give us some idea about how a random eigenvalue of a random matrix look like.

```python
eigs = np.zeros((B, n))   # placeholder for tracking the eigenvalues
for b in range(B):
  X = np.random.randn(n, n)   # each entry of the matrix is standard normal
  X = (X + X.T)/2   # symmetrize it
  eval, evec = np.linalg.eig(X)  # look at the eigenvalues
  eigs[b, :] = eval
plt.hist(eigs.reshape(-1), bins = 50)
plt.xlabel(f"Eigenvalues of {n}x{n} Gaussian matrix")
plt.show()
```

{{<figure src="fig4.png">}}


Well, this is no way a Gaussian kind of a distribution anymore. There is, of course, no concentration about the mean, and this semicircular structure of the probability distribution is not very traditional in nature, like the CLT or LLN that we have know so far. Dealing with this kind of distribution thus requires new tools, so we have a separate theory on Random Matrices. There are basically two hindrances on extending the traditional tools.

1. The eigenvalues are non-linear functions of the entries of the matrix $X$, which may not have a very explicit and nice expression. For instance, in generate the eigenvalues are defined as the solution to the characteristic function $det(X - \lambda I) = 0$. This will be a complicated $n$-degree polynomial of $\lambda$, the zeros of which will be difficult to obtain in terms of the coefficients.

2. Secondly, we usually work with independent random variables or conditionally independent random variables (in the case of Martingales[^3]). However, the eigenvalues are the zeros of the same characteristic polynomial, which are very likely to be correlated.


Same thing happens for the singular values. We get a quarter circle instead of half circle here.

```python
sigs = np.zeros((B, n))
for b in range(B):
  X = np.random.randn(n, n)   # each entry of the matrix is standard normal
  X = (X + X.T)/2   # symmetrize it
  sval = np.linalg.svd(X, compute_uv = False, full_matrices=False)  # look at the singular values
  sigs[b, :] = sva
plt.hist(sigs.reshape(-1), bins = 50)
plt.xlabel(f"Singular values of {n}x{n} Gaussian matrix")
plt.show()
```

{{<figure src="fig5.png">}}


## The Distribution of the Spacings

Since we already know there exists some differences between the traditional asymptotic results and results of random matrices through simulation, here we try to do something concrete. Basically, we consider the distribution of spacings. In the traditional case, we can consider something like two i.i.d. standard normal random variables $x_1$ and $x_2$ and try to obtain the probability density function of $s = |x_1 - x_2|$. In the random matrix case, we will start with a $2\times 2$ random matrix with Gaussian entries, then try to see the probability distribution of the distance between the two eigenvalues. 

If our intuition is correct, these two lead to wildly different result.

### The Traditional Case

We have two i.i.d random variables $x_1, x_2 \sim N(0, 1)$ and $s = |x_1 - x_2|$. To determine the density of $s$, we first look the the cumulative probability distribution function of $s$. Clearly, when $s < t$ (for some fixed constant $t$), then given $x_1$, the value of $x_2$ must be in the range from $(x_1 - t)$ to $(x_1 + t)$. Therefore,

$$
F(s) = \dfrac{1}{2\pi}\int_{-\infty}^{\infty} \int_{x_1-s}^{x_1 + s} e^{-(x_1^2 + x_2^2)/2} dx_2 dx_1
$$

We can now rewrite the inner integral in terms of a Gaussian integral, i.e.,

$$
F(s) = \dfrac{1}{2\sqrt{2\pi}} \int_{-\infty}^{\infty} e^{-x_1^2/2} \left( \int_{0}^{(x_1 + s)/\sqrt{2}} e^{-u^2}du - \int_{0}^{(x_1 - s)/\sqrt{2}} e^{-u^2}du \right) dx_1
$$


Now, we can integrate the above with respect to $s$ to obtain a probability density function. Here, we apply Leibnitz rule and the fundamental theorem of calculus to perform the differentiation.

$$
\begin{align*}
f(s) & = \dfrac{\partial F(s)}{\partial s}\\\\
& = \dfrac{1}{4\pi} \int_{-\infty}^{\infty} e^{-x_1^2/2} \left[ e^{-(x_1 + s)^2/2} + e^{-(x_1 - s)^2/2} \right] dx_1\\\\
& = \dfrac{1}{4\pi} e^{-s^2/4}\left[ \int_{-\infty}^{\infty} \exp\left( -\dfrac{1}{2} (\sqrt{2}x_1 + s/\sqrt{2})^2 \right)dx_1 + \int_{-\infty}^{\infty} \exp\left( -\dfrac{1}{2} (\sqrt{2}x_1 - s/\sqrt{2})^2 \right)dx_1 \right]\\\\
& = \dfrac{1}{\sqrt{\pi}} e^{-s^2/4}
\end{align*}
$$

Here's how this distribution looks like.

{{<figure src="fig6A.png">}}


### The 2X2 Gaussian Case

We have seen that the diagonal entries of symmetrized matrix has double the variance of the off-diagonal entries. Let us consider the $2\times 2$ case of a Gaussian random matrix, i.e.,
$$
X = \begin{bmatrix}
  x_1 & x_3\\\\
  x_3 & x_2\\
\end{bmatrix}
$$
where $x_1, x_2 \sim N(0, 1)$ and $x_3 \sim N(0,1/2)$. In this case, the characteristic equation is simply
$$
det(X - \lambda I) = (x_1 - \lambda)(x_2 - \lambda) - x_3^2 = \lambda^2 - (x_1 + x_2)\lambda + (x_1x_2 - x_3^2) = 0
$$
This is a quadratic equation in $\lambda$, so we have use the well-known [Sridharacharya's formula](https://en.wikipedia.org/wiki/Sridhara) to the rescue to find the eigenvalues of this $2\times 2$ random matrix.

$$
\lambda = ((x_1 + x_2) \pm \sqrt{(x_1 - x_2)^2 + 4x_3^2})/2
$$

Now instead of looking at the probability distribution of the eigenvalues, we will focus on the distribution of the spacings between these two eigenvalues. The spacing $s = \max\{\lambda_1, \lambda_2\} - \min\{ \lambda_1, \lambda_2\}$ can then be described in terms of the entries of the matrix $X$ as 

$$
s = \sqrt{(x_1 - x_2)^2 + 4x_3^2}
$$


Now, we apply a change of variable technique to obtain the distribution of $s$. Namely, let us consider the transformation $(x_1 - x_2) = r\cos(\theta)$, $2x_3 = r\sin(\theta)$ and $x_1 + x_2 = t$. Then clearly, $s = r$ as $\sin^2(\theta) + \cos^2(\theta) = 1$. Also, $x_1 = (r\cos(\theta) + t)/2$, $x_2 = (t-r\cos(\theta))/2$ and $x_3 = r\sin(\theta)/2$. Therefore,

$$
p(r, \theta, t) = \dfrac{1}{2\pi\sqrt{\pi}} \exp\left[ -\dfrac{1}{2}\left( (\dfrac{r\cos(\theta) + t}{2})^2 + (\dfrac{t - r\cos(\theta)}{2})^2 + \dfrac{r^2\sin^2(\theta)}{2}  \right)  \right] \times (r/4)
$$

where the last part $r/4$ comes from the Jacobian of this transformation. Therefore,

$$
\begin{align*}
p(s) & = p(r) = \dfrac{r}{8\pi\sqrt{\pi}}\int_{0}^{2\pi} \int_{-\infty}^{\infty} \exp\left[ -r^2/4 - t^2/4 \right] dt d\theta \\\\
& = \dfrac{r}{4\pi} e^{-r^2/4} \int_{0}^{2\pi} d\theta\\\\
& = \dfrac{s}{2} e^{-s^2/4}, \\ s > 0
\end{align*}
$$

Here's how this distribution looks like.

{{<figure src="fig6.png">}}

It clearly looks different than the one we obtained from spacings of two i.i.d. normal random variables. It shows that the eigenvalues are highly correlated. One eigenvalue feels the presence of the other, hence the spacing is not very likely to be near zero. This is known as eigenvalue repulsion. One application of this theory of repulsion is that it can be used to model the distribution of electrons as every electron repulses each other due to having the same charge.[^4] On the other hand, for the i.i.d. case, the spacings are very likely to be near $0$, since both of them are independently very likely to be close to their distributional expectation.



## References 

[^1]: Feller, W. (1991). An introduction to probability theory and its applications, Volume 2 (Vol. 81). John Wiley & Sons. 

[^2]: Billingsley, P. (2013). Convergence of probability measures. John Wiley & Sons.

[^3]: [Martingale (Probability Theory) - Wikipedia](https://en.wikipedia.org/wiki/Martingale_(probability_theory)). 

[^4]: Livan, G., Novaes, M., & Vivo, P. (2018). Introduction to random matrices theory and practice. Monograph Award, 63, 54-57. https://arxiv.org/abs/1712.07903. 
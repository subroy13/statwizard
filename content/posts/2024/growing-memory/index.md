---
title: 'Should your program grow memory?'
date: "2024-03-15T00:00:00Z"
imageCaption: "[Unstable Diffusion](https://www.unstability.ai/)"
summary: Recently, I was working on a project where I had to optimize for both time and memory consumption of the program to make it more efficient. In this post, I share a few key insights that I have gained from that.

tags:
    - Python
    - R
    - Software Design

draft: false
mathjax: false 
mermaid: true

prerequisites:
    - topic: Python Programming
      level: 1

    - topic: R Programming
      level: 1
---

## Introduction

Time and memory are the two primary constraints for any software design. Usually, you can only optimize for one of these, sacrificing the others. For example, imagine you want to print all the prime numbers from 1 to 100. Let's think of two approaches to solve the problem.

1. You count the numbers like 1, 2, 3, ... and so on, and for each number, you check whether it is prime or not. To check whether a number (say 17) is prime, you check if it is divisible by 2, then if divisible by 3, then by 4, by 5, by 6, by 7, and so on. Whenever you find a prime number, you print it, and go to the next number for checking.

2. Another approach is you keep a list of prime numbers discovered so far. Then for every new number that you want to check if it is prime or not, simply try dividing by only the prime numbers (instead of checking divisiblity by 2, 3, 4, 5, 6, and all numbers). Finally, print all the numbers from the list.

In the first approach, we are trying to optimize for memory, but consuming more time checking division with every numbers. In the second approach, using a bit more memory by keeping a list of prime numbers, it is trying to optimize for time by checking division with only the prime numbers.

So it looks like if you want your program to be faster, you should use more memory. 

> Okay, so just shove down a few RAMs to your 10-year old laptop, and it can feel like it is a super-computer? :boom: 

Well, the answer to the question whether ``using more memory makes your program run fast'' is both yes and no. And no, I am not talking about efficient algorithms that you can implement to reduce both time and memory footprint. Rather, gaining an understanding of how different programming languages store basic data types and data structures can greatly improve the efficiency of your code. Recently, I was working on a project where I had to optimize for both time and memory consumption of the program to make it more efficient. I did some experiments for this, and got a few interesting findings that helped me understand this better. I am sharing these findings here in this post so that you also can leverage the same to make your program more efficient.


## Memory Growth is Bad for R

Let us consider a simple problem that we want to solve using `R` programming language. The problem is that, given an array of numbers, we need to return another array whose elements are the square of the corresponding elements of the original array elements. For example, if the input is `[1, 2, 3]`, then the output should be `[1, 4, 9]`. 

<div class="mermaid">
graph LR
  A[Input Array] --> f[Function Method] --> B[Output Array with squared elements];
</div>

Now we will see different methods of solving this problem, some optimizes memory, some optimizes computational time.

### Growing Memory Method

The first method is to optimize for memory usage. So, we create a blank array to hold the output elements, then we loop over the elements of the input array, and dynamically keep putting them into the output array.

```R
method1 <- function(arr) {
  arr2 <- c()
  for (elem in arr) {
    arr2 <- c(arr2, elem^2)   # grow memory
  }
  return(arr2)
}
```

This is often called as the __Growing Memory__ method.

### Constant Memory Method

As you have suspected, this instead of dynamically adding more elements to the output array, this method initially assigns memory for the entire output array, and then it keeps updating the elements of this output array as required. Since it requires more memory that previous method, we expect this to be a bit faster.

```R
method2 <- function(arr) {
  n <- length(arr)
  arr2 <- numeric(n)   # initially allocate memory
  for (i in 1:n) {
    arr2[i] <- arr[i]^2
  }
  return(arr2)
}
```

### Growing Memory with List

This is a variation of the Growing Memory method, but instead of creating a blank array, we create a list. From the introductory data structure classes, we know that linked list is a more complicated data structure than array, so we expect it to be even slower and complex than the previous two methods.

```R
method3 <- function(arr) {
  arr2 <- list()
  for (i in 1:length(arr)) {
    arr2[[i]] <- arr[i]^2   # does not grow memory
  }
  return(unlist(arr2))
}
```

### Vectorization

Finally, we perform the direct way almost every R practioner will solve this problem, but using the vectorization capabilities of R. We call this method 4.

```R
method4 <- function(arr) {
  return (arr^2)   # vectorize
}
```

### Performance Comparison

Let us now compare the time performances of these methods. We will use the `microbenchmark` package in R to measure the time taken by each method.

```R
x <- runif(10000)
times <- microbenchmark::microbenchmark(method1(x), method2(x), method3(x), method4(x), times = 100)
```

{{<figure src="fig1.png" class="md">}}

Here is a summary of average time taken (in microbenchmark) by each methods.

| method 1 | method 2 | method 3 | method 4 |
| -------- | -------- | -------- | -------- |
| 147479.7825 | 791.2165 | 7296.0665 | 24.6135 |


The results indicate that the `method4` is the fastest, followed by `method2` and `method3`. The vectorization trick is in that about _30 times_ faster than the best competiting method, i.e. constant memory method. This constant memory method was about _10 times_ faster than the growing memory method with list, and finally, the growing memory method with list is about _20 times_ faster compared its array based variant.

Well, the reason of this suprising results are as follows: 


## Memory Growth is not bad for Python

I did the same kind of exercise using `Python` to compare the behaviour. In python, you can start with a blank array, and use `append` method to grow your array. However, python does not have a concept of list like R, the `list` and `array` have the same meaning in `Python`.  So, instead of the `method3` as above, we consider the variant with list comprehension, which is basically a one-liner code to create a list, instead of doing the loop explicitly. And finally, for the vectorization method, we use the popular python library `numpy`, which uses built-in `C` routine to perform vectorized operations.

```python
import numpy as np

def array_sq_1(arr):
    newarr = []
    for elem in arr:
        newarr.append(elem ** 2)   # grow the memory
    return newarr

def array_sq_2(arr):
    newarr = [0] * len(arr)   # allocate constant memory
    for i in range(len(arr)):
        newarr[i] = arr[i] ** 2   
    return newarr

def array_sq_3(arr):
    newarr = [elem**2 for elem in arr]   # do list comprehension
    return newarr

def array_sq_4(arr):
    return np.array(arr)**2   # vectorized squaring using numpy
```

### Performance Comparison


Here is a summary of average time taken (in microseconds) by each methods.

| method 1 | method 2 | method 3 | method 4 |
| -------- | -------- | -------- | -------- |
| 2.3 ms | 2.7ms | 2.08ms | 0.000863ms  |



## Conclusion 

Although the general focus is on writing code that is smaller (uses less memory) and faster (takes less time), it usually trades a very basic requirement - "simplicity". 



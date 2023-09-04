---
title: 'Reinforcement Learning (Part 5) - Q Learning and Optimal Policy Finding'
date: "2023-09-07T00:00:00Z"
imageCaption: ""
summary: "This is the 5th part of the Reinforcement Learning Series: Here I discuss about techniques to finding optimal policies, and then demonstrate the popular Q-learning algorithm. I also show how it can be implemented to solve actual problems"
mermaid: mermaid 
tags:
    - Reinforcement Learning

draft: true
prerequisities:
    - topic: Python Programming
      level: 2

---

## Introduction

In my previous post (check [here](https://www.statwizard.in/posts/td-algorithms/) if you haven't already), we learned how we can use different algorithms to estimate the value function of a markov decision process. If you are not familiar with these concepts / terminologies, I recommend to check out my other posts on the same topic. In this post, we shall finally take a look at how we can use the value estimates to know which actions to take, and how we can find out optimal policies in a reinforcement learning system.

So far, we have seen that given a policy $\pi$, it is possible to use different algorithms to get an estimate of the value function of the policy $\pi$, which will tell us how valuable each state is. We learned about the methods as:

1. Dynamic Programming with Bellman equation.
2. Monte Carlo algorithm.
3. Temporal Different learning algorithms.

We applied all of these methods for our maze game, and estimated the value function under the policy of random movement (i.e., all four directions are picked with equal probability). Also, I have indicated before that at every state, if we just keep taking some action that improves the value of the state, we can reach the end goal for this scenario. However, in general, this procedure can get stuck in a local optimum. Imagine that you have estimates on how much traffic will be in different roads while commuting to your work, so you accordingly choose a particular road. But may be, there is some construction work going on that road, due to which the best possible road that you have in mind is actually sub-optimal.


## Optimal Policy Finding

However, to find an optimal policy, we can follow this principle and try to estimate the Q-function (quality function) instead of the value function for every state-action pair. That means,

1. For the dynamic programming, you can use the Bellman equation of expressing $Q(s, a)$ as a sum over its next state-action Q-values.

2. For Monte Carlo algorithms, we keep track of rewards and gains grouped by the state-action pairs instead of grouping by states only.

3. For temporal difference algorithms, we update $Q(s, a)$ as 
$$
Q^\pi_{new}(S_t, A_t) = Q^\pi_{old}(S_t, A_t) + \alpha \left( R_{t+1}(A_t) + \gamma \sum_{a \in A} \pi(a \mid S_{t+1}) Q^\pi_{old}(S_{t+1}, A_{t+1} = a) - Q^\pi_{old}(S_t, A_t) \right)
$$
which is very similar to the TD iteration rule that we have seen before.

So, lets say for a policy $\pi$, we have an estimate of Q-value function $Q^\pi(s, a)$. Then, based on the above principle, we can choose the action $a$ which has the highest Q-value given state $s$.

In particular,

$$
\pi_{new}(a \mid s) = \begin{cases}
    1 & \text{ if } a = \arg\max_{a \in A} Q^\pi(s, a)\\\\
    0 & \text{ otherwise}
\end{cases}
$$

Naturally, this new policy $\pi_{new}$ is called a greedy with respect to the Q-function. Since $\pi_{new}$ is a new policy, the Q-function for this new policy will also change. Using the learning techniques, we can obtain its Q-function estimate, and then again from that Q-function, we can take the greedy approach. We can repeat these two steps **Policy Evaluation** (Q-function estimation) and **Policy Improvement** (Improving the policy by taking greedy action with respect to current Q-function estimate), until we reach a halt. At that time, we have found a policy which is doing its best according to its own value function, and hence it cannot be improved further. Thus, it becomes an optimal policy.

<div class="w-full flex justify-center items-center mermaid">
    graph LR
    E1[$\pi_0$] --> |PE| E2["$Q_{\pi_0}(s, a)$"] --> |PI| E3[$\pi_1$] --> |PE| E4["$Q_{\pi_1}(s, a)$"] --> |PI| E5[$\pi_2$] --> |PE| E6["$\dots$"]
</div>

This approach to finding the optimal policy is called policy iteration.


## Value Iteration



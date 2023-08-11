---
title: 'Reinforcement Learning (Part 3) - Markov Decision Process'
date: "2023-08-16T00:00:00Z"
imageCaption: ""
summary: "This is the third part of the Reinforcement Learning series: Here I discuss about the representing the reinforcement learning problem as a markov decision process, explain standard terminologies and provide ways to estimate the value function."
mermaid: true
tags:
    - Reinforcement Learning

draft: true
prerequisites:
    - topic: Python Programming
      level: 1

    - topic: Probability (Conditional Probability)
      level: 2

---

## Introduction

In my previous post (check [here](https://www.statwizard.in/posts/k-arm-bandit-2/) if you haven't already), we ended up with a question about how to formally express a reinforcement learning problem, and how should it be represented when the underlying of the system (i.e., the slot machine) itself is changing based on the arm you are choosing. The solution is given by **Markov Decision Process**. 


### Markov Decision Process (MDP)

Before defining what a Markov Decision Process (MDP) is, let us try to summarize the process the reinforcement learning happens, along with the components involved in the process. There are mainly two major components: An environment (for the $k$-arm bandit problem, it is the slot machine) and an agent (the gambler who wants to pull the arm and win rewards). These two components act in the following way:

1. The environment has a state $S_t$ at time $t$, which basically is an abstract representation of the environment features that are useful to the problem of learning. For instance, when you are playing chess or any board game, the state is the positions of all the chess pieces on the board. When you are playing pinball, the state is the values of all the pixels on the computer screen. When you are driving to the airport and you want to find out which road requires minimal time, the state could be the traffic and weather conditions.

<div class="w-full flex justify-center items-center mermaid">
    graph RL
    B[Environment] --> |Measures current state S<sub>t</sub>| A[RL Agent]
</div>

2. Given this state $S_t$ (which are kind of measurable features of the environment as measured by the agent), the agent tries to take one of the possible action $A_t$ at time $t$, which is an element of the action space $\mathcal{A}$. Basically this means, once you see the chess position, you have a set of valid moves that you can play with. For the pinball game, there are only two valid actions at every state: lifting the left flipper or the right flipper. For driving to the airport example, your action is limited to the roads that you can take at every crossing you encounter.


<div class="w-full flex justify-center items-center mermaid">
    graph LR
    A[RL Agent] --> |Action a<sub>t</sub>| B[Environment]
    B --> |Measures current state S<sub>t</sub>| A
</div>

3. Given this action $A_t$ acted on the environment, the environment spits out a reward $R_{t+1}$ to the agent and its transforms to new state $S_{t+1}$. The agent's objective will be to maximize these rewards over time (both over short and long term, we will get to that shortly). In the chess playing, the reward is +1 when you win, (-1) if you lose the game and 0 for everything else. For the pinball game also we can define a similar reward, adding to the reward whenever the ball bounces of an obstacle. For the driving scenario, every mile you drive more if going to cost some fuel which can essentially be thought of a negative reward.


<div class="w-full flex justify-center items-center mermaid">
    graph LR
    A[RL Agent] --> |Action a<sub>t</sub>| B[Environment]
    B --> |Measures current state S<sub>t</sub>| A
    B --> |New state S<sub>t+1</sub><br/>Current reward R<sub>t+1</sub>| A
</div>


> Now a MDP is a decision process as above with an additional Markovian property that the states $S_t$ contain all necessary properties of the environment that an agent needs to take an action, the knowledge of the entire history of the states $S_0, S_1, \dots S_{t-1}, S_t$ does not provide any additional benefit.

In terms of probability, these can be written as 
$$
\begin{align*}
    P(A_{t+1} \mid S_t) & = P(A_{t+1} \mid S_t, S_{t-1}, S_{t-2}, \dots ),\\\\
    P(S_{t+1}, R_{t+1} \mid A_t, S_t) & = P(S_{t+1}, R_{t+1} \mid A_t, S_t, A_{t-1}, S_{t-1}, \dots),
\end{align*}
$$
for all kinds of RL agent that we are going to look at. 

### The Objective of the RL Agent

The primary goal of a reinforcement learning (RL) agent is to learn a policy that maximize the reward over time (Surely, this is a capitalistic world!). Now, maximizing rewards over time can have two contrasting viewpoint: 

1. The RL agent tries to look for the short term gain and get instant gratification by maximizing its immediate rewards. This is essentially what we would do for the driving example, taking the shortcut road every now and then.

2. The RL agent can also be designed in a way to maximize gains over a very long horizon, essentially delaying gratification by waiting for the right opportunity or building success over time. For instance, a chess grandmaster would do this by thinking 10-20 moves ahead.

To represent both of these paradigms properly, we can use a trick from Finance, namely discounting future values by the inflation rate to obtain a [present value](https://en.wikipedia.org/wiki/Present_value). We define **Gain** at time $t$ as
$$
G_t = R_{t+1} + \gamma R_{t+2} + \gamma^2 R_{t+3} + \dots 
$$
where $\gamma \in [0, 1]$ is a discounting factor. Now, if you want a very long term view, you can modify $\gamma$ to be very close to 1, on the other hand, if you want the RL agent to take a short term view, you would want $\gamma$ to be near zero or zero. 

Therefore, instead of focusing on maximizing rewards, the RL agent would aim to maximize the gain $G_t$ for every time step $t$, and would take the action $a$ that has the maximum possible gain.


### Standard Terminologies


Before diving deeper into the Markov Decision Process, let's clarify some standard terminologies commonly used in reinforcement learning:[^1]

* State Space ($\mathcal{S}$): The set of all possible states that the environment can be in. States encapsulate all relevant information needed for decision making.

* Action Space ($\mathcal{A}$): The set of all possible actions that the agent can take. The choice of action at a certain state influences the subsequent state and the received reward.

* Policy ($\pi$): A policy is a strategy or decision-making function that maps states to actions. It defines the agent's behavior in the environment. A policy can be deterministic or stochastic. So you can think of $\pi$ as a collection of conditional probability distributions on the action space $\mathcal{A}$ given the current state $s$, for all $s \in \mathcal{S}$. 

* Transition Probability ($P$): The probability distribution over next states and rewards given the current state and action. It characterizes how the environment responds to the agent's actions. Basically, it is the probability distribution over the new state and reward pair $(S_{t+1}, R_{t+1})$ conditional on the current state of the environment $S_t$ and the RL agent's action $A_t$.


* Value Function ($V^\pi$): The expected gain starting from a particular state and following a specific policy $\pi$. It represents how good it is for the agent to be in a certain state under the policy $\pi$. It is mathematically described as $V^\pi(s) = E_{\pi}(G_t \mid S_t = s)$ where $E(\cdot)$ denotes expectation operator.

* Quality Function or popularly known as Q-Function ($Q^\pi$): Similar to the value function, but it takes both a state and an action as inputs. It represents the expected cumulative return starting from a certain state, taking a specific action, and then following policy $\pi$. It is mathematically described as $Q^\pi(s, a) = E_{\pi}(G_t \mid S_t = s, A_t = a)$.


## Making a Better Decision








## References 

[^1]: Sutton, R. S., Barto, A. G. (2018). [Reinforcement Learning: An Introduction.](https://www.google.co.in/books/edition/Reinforcement_Learning_second_edition/sWV0DwAAQBAJ?hl=en) United Kingdom: MIT Press.


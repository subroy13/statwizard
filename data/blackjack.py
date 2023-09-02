import numpy as np
import gymnasium as gym
from tqdm import tqdm
import matplotlib.pyplot as plt

env = gym.make('Blackjack-v1')

class BlackjackAgent:
    def __init__(self, lr, init_eps, eps_decay, final_eps, gamma = 0.95):
        q_shape = (32, 11, 2, 2) 
        self.q_vals = np.zeros(q_shape)
        self.lr = lr
        self.eps = init_eps
        self.eps_decay = eps_decay
        self.final_eps = final_eps
        self.gamma = gamma
        self.training_error = []

    def get_action(self, observation):
        state = (int(obs) for obs in observation)
        if np.random.random() < self.eps:
            return env.action_space.sample()
        else:
            return self.q_vals[(*state, slice(None))].argmax()
    
    def update(self, obs, action, reward, terminated, next_obs):
        state = (int(obs) for obs in obs)
        next_state = (int(obs) for obs in next_obs)
        target = reward + (not terminated) * self.gamma * self.q_vals[(*next_state, slice(None))].max()
        temporal_diff = (target - self.q_vals[(*state, action)])
        self.q_vals[(*state, action)] += self.lr * temporal_diff
        self.training_error.append(temporal_diff)

    def decay_epsilon(self):
        self.eps = max(self.final_eps, self.eps - self.eps_decay)

# hyperparameters
learning_rate = 0.01
n_episodes = 100_000
start_epsilon = 1.0
epsilon_decay = start_epsilon / (n_episodes / 2)  # reduce the exploration over time
final_epsilon = 0.1
agent = BlackjackAgent(learning_rate, start_epsilon, epsilon_decay, final_epsilon)

# reset the environment to get the first observation
rewards = np.zeros(n_episodes)
for episode in tqdm(range(n_episodes)):
    obs, info = env.reset()
    done = False

    # play one episode
    while not done:
        action = agent.get_action(obs)
        next_obs, reward, terminated, truncated, info = env.step(action)
        rewards[episode] += reward   # reward

        # update the agent
        agent.update(obs, action, reward, terminated, next_obs)

        # update if the environment is done and the current obs
        done = terminated or truncated
        obs = next_obs

    agent.decay_epsilon()


def moving_average(x, w):
    return np.convolve(x, np.ones(w), 'valid') / w

rolling_avg_wins = moving_average(rewards, 200)
plt.plot(rolling_avg_wins)
plt.xlabel('Episode')
plt.ylabel('Cumulative Rewards')
plt.show()


env.close()


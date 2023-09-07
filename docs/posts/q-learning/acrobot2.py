import numpy as np
import gymnasium as gym
from tqdm import tqdm
import matplotlib.pyplot as plt
from draw import save_agent_gif

env = gym.make("Acrobot-v1", render_mode = "rgb_array")
N_STEPS = 10
obs_space_high = np.array(env.observation_space.high)
obs_space_low = np.array(env.observation_space.low)


class AcrobotAgent:
    def __init__(self, lr, init_eps, eps_decay, final_eps, gamma = 0.95):
        q_shape = (N_STEPS, ) * env.observation_space.shape[0] + (env.action_space.n, )
        self.q_vals = np.zeros(q_shape)
        self.lr = lr
        self.eps = init_eps
        self.eps_decay = eps_decay
        self.final_eps = final_eps
        self.gamma = gamma
    
    def convert_observation_to_state(self, observation):
        obs = np.array(observation)
        state = np.floor((obs - obs_space_low) / (obs_space_high - obs_space_low) * N_STEPS)
        return state.astype('int').clip(0, N_STEPS-1)

    def get_action(self, observation):
        state = self.convert_observation_to_state(observation)
        if np.random.random() < self.eps:
            return env.action_space.sample()
        else:
            return self.q_vals[(*state, slice(None))].argmax()
        
    def update(self, obs, action, reward, terminated, next_obs):
        state = self.convert_observation_to_state(obs)
        next_state = self.convert_observation_to_state(next_obs)
        target = reward + (not terminated) * self.gamma * self.q_vals[(*next_state, slice(None))].max()
        temporal_diff = (target - self.q_vals[(*state, action)])
        self.q_vals[(*state, action)] += self.lr * temporal_diff

    def decay_epsilon(self):
        self.eps = max(self.final_eps, self.eps - self.eps_decay)


# hyperparameters
learning_rate = 0.01
n_episodes = 5000
start_epsilon = 1.0
epsilon_decay = start_epsilon / (n_episodes / 2)  # reduce the exploration over time
final_epsilon = 0.01

agent = AcrobotAgent(learning_rate, start_epsilon, epsilon_decay, final_epsilon)
def agent_func(obs):
    return agent.get_action(obs)

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
        if reward > 0:
            print(f"Goal reached at episode {episode + 1}")

        # update if the environment is done and the current obs
        done = terminated or truncated
        obs = next_obs

    agent.decay_epsilon()
    
    if episode % 1000 == 0 or episode == (n_episodes - 1):
        save_agent_gif(env, agent_func, episode_num=episode, fpath=f"./videos/acrobot/episode-{episode + 1}.gif")

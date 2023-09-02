import gymnasium as gym
import numpy as np
from draw import save_agent_gif

env = gym.make("Acrobot-v1", render_mode = "rgb_array")

# transforming the box to a discrete coordinate system
N_STEPS = 10
obs_space_high = np.array(env.observation_space.high)
obs_space_low = np.array(env.observation_space.low)

def convert_observation_to_state(observation):
    obs = np.array(observation[:6])
    state = np.floor((obs - obs_space_low) / (obs_space_high - obs_space_low) * N_STEPS)
    return state.astype('int').clip(0, N_STEPS-1)


# create an array to hold the q_values
q_shape = (N_STEPS, ) * env.observation_space.shape[0] + (3, )
q_vals = np.random.rand(*q_shape)   # state, action pairs

def agent_func(observation):
    statevec = convert_observation_to_state(observation)     # convert observation to state vector
    action = q_vals[(*statevec.tolist(), slice(None))].argmax()   # get the best action
    return action


# perform Q-learning
N_EPISODES = 1000
LR = 0.1
GAMMA = 0.95

# Exploration settings
epsilon = 1  # not a constant, qoing to be decayed
START_EPSILON_DECAYING = 1
END_EPSILON_DECAYING = int(N_EPISODES/2)
EPS_DECAY = N_EPISODES/(END_EPSILON_DECAYING - START_EPSILON_DECAYING)

eps_rewards = np.zeros(N_EPISODES)
for episode in range(N_EPISODES):
    observation, info = env.reset()    
    stop = False
    while not stop:
        statevec = convert_observation_to_state(observation)     # convert observation to state vector
        if np.random.rand() > epsilon:
            action = q_vals[(*statevec.tolist(), slice(None))].argmax()   # get the best action
        else:
            action = env.action_space.sample()   # epsilon-greedy action
        next_observation, reward, terminated, truncated, info = env.step(action)   # get the reward and next state
        if reward >= 0:
            print(f"Achieved target height in episode {episode + 1}")
        eps_rewards[episode] += reward

        next_state = convert_observation_to_state(next_observation)
        target = reward + GAMMA * q_vals[(*next_state.tolist(), slice(None))].max()
        q_vals[(*statevec.tolist(), action)] += LR * (target -  q_vals[(*statevec.tolist(), action)])
        stop = terminated or truncated

    if END_EPSILON_DECAYING >= episode >= START_EPSILON_DECAYING:
        epsilon -= EPS_DECAY   # reduce epsilon

    if episode % 20 == 0:
        print(f"Completed episode {episode + 1} out of {N_EPISODES} episode, reward {eps_rewards[episode]}")

    # if episode % 250 == 0 or episode == (N_EPISODES - 1):
    #     save_agent_gif(env, agent_func, episode_num=episode, fpath=f"./videos/acrobot/episode-{episode + 1}.gif")


env.close()
import gymnasium as gym
import numpy as np
from draw import save_agent_gif

env = gym.make("Lunarlander-v2", render_mode = "rgb_array")

# transforming the box to a coordinate system
N_STEPS = 10
obs_space_high = np.array(env.observation_space.high[:6])
obs_space_low = np.array(env.observation_space.low[:6])

# create an array to hold the q_values
q_shape = (N_STEPS, ) * 6 + (4, ) 
q_vals = np.random.rand(*q_shape)   # state, action pairs

def convert_observation_to_state(observation):
    obs = np.array(observation[:6])
    state = np.floor((obs - obs_space_low) / (obs_space_high - obs_space_low) * N_STEPS)
    return state.astype('int').clip(0, N_STEPS-1)

def agent_func(observation):
    statevec = convert_observation_to_state(observation)     # convert observation to state vector
    action = q_vals[(*statevec.tolist(), slice(None))].argmax()   # get the best action
    return action

# perform Q-learning
N_EPISODES = 10000
LR = 1e-2
EPS = 0.05

for episode in range(N_EPISODES):
    observation, info = env.reset()    
    stop = False
    while not stop:
        statevec = convert_observation_to_state(observation)     # convert observation to state vector
        if np.random.rand() > EPS:
            action = q_vals[(*statevec.tolist(), slice(None))].argmax()   # get the best action
        else:
            action = env.action_space.sample()   # epsilon-greedy action
        next_observation, reward, terminated, truncated, info = env.step(action)   # get the reward and next state
        next_state = convert_observation_to_state(next_observation)
        target = reward + q_vals[(*next_state.tolist(), slice(None))].max()
        q_vals[(*statevec.tolist(), action)] += LR * (target -  q_vals[(*statevec.tolist(), action)])
        stop = terminated or truncated

    if episode % 100 == 0:
        print(f"Completed episode {episode + 1} out of {N_EPISODES} episode")

    if episode % 1000 == 0 or episode == (N_EPISODES - 1) or reward == 100:
        save_agent_gif(env, agent_func, episode_num=episode, fname=f"episode-{episode + 1}")

env.close()

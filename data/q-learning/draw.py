import os
import imageio
import numpy as np
from PIL import Image
import PIL.ImageDraw as ImageDraw
import matplotlib.pyplot as plt    


def _label_with_episode_number(frame, episode_num):
    img = Image.fromarray(frame)
    drawer = ImageDraw.Draw(img)
    text_color = (255, 255, 255) if np.mean(img) < 128 else (0, 0, 0)  # color to draw the episode number text
    drawer.text((img.size[0]/20,img.size[1]/18), f'Episode: {episode_num+1}', fill=text_color)
    return img


def save_agent_gif(env, agent, episode_num, fpath):
    frames = []
    observation, info = env.reset()        
    for _ in range(500):
        action = agent(observation)
        frame = env.render()
        frames.append(_label_with_episode_number(frame, episode_num))
        observation, reward, terminated, truncated, info = env.step(action)
        if terminated or truncated:
            break

    env.close()
    imageio.mimwrite(fpath, frames, fps=60)

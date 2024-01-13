---
title: 'Video Background Extraction'
date: "2024-01-14T00:00:00Z"
imageCaption: "[Unstable Diffusion](https://www.unstability.ai/)"
summary: "You have often seen that Google meet filters or Zoom background filters allows you to change the background of your video. Ever wondered how that is performed? In this post, I am going to explain precisely that, and the math behind it."

tags:
    - Video Processing
    - Linear Algebra

draft: true
mathjax: true

prerequisites:
    - topic: Python Programming
      level: 1

    - topic: Image and Video Processing
      level: 1 

    - topic: Linear Algebra
      level: 2
---

## Introduction

Given that you've survived through the Covid-19 pandemic, chances are that you've probably used video commmunication features of Skype, Whatsapp, Zoom, Google Meet, Microsoft Teams, etc. Specifically for Zoom and Google Meet, they provide a very interesting feature: you can change the background of your video to basically anything, from the beach of Hawaii to a waterfall inside a dense forest in Mount Fuji. And however you move, the background almost instantly matches your movement, making sure your video remains more or less consistent. Ever wondered how this is done? In this post, I am going to describe the math behind this and how it works in depth.

Here's a example zoom background filters that you can use, taken from a [post](https://people.com/home/the-best-zoom-backgrounds-for-every-type-of-video-call/) by Sophie Dodd.

![](image1.webp)

To give you a bit of context, my PhD research work focuses on a field of robust matrix factorization which has a bit of application in the aforementioned problem. Recently, I went to IMS Asia Pacific Rim Meeting Conference 2024 in Melbourne, Australia, where I presented some of my work. So this post is just a similar presentation, but for a general audience, with a lot of introductory material.

## How to Represent a Video

Before solving the problem, let us first understand how we can represent a video using numbers (since, you know, math only cares about numbers :unamused:, nothing else matters to it!). Well, a video is basically a series of images, each changing little by little, and shown to you in a very rapid speed. For example, in movies, the standard rate is 24FPS (24 frames or images are shown per second), while when you play some high definition games, you set your resolution to 60FPS (i.e., 60 images are bombarded to you in every second). Now, the information in these images come to your brain through your eyes and optical nerve, finally your brain combines them into a moving continuous video, even though the original video is a set of fine-grained series of images.

So a video is mathematically represented by $(I_1, I_2, \dots I_T)$, where each $I_t$ is an image (or frame). The video is $T$ time length long.

{{<figure src="image2.png">}}


Let's now focus on an image. In digital image (i.e., images that you see on the computer), it is shown through a rectangular grid, you have a series of rows and columns (think of like a spreadsheet grid you see in Excel) and each cell has a number, denoting the intensity of light in it as a number between 0 and 1. The number $0$ means there is no light absorption, so cell looks like white since every light is reflected back. On the other end, $1$ implies there is absolute absorption so no light comes back and it looks black.

To see one example, consider a $8\times 8$ grid like chessboard, but all cells are coloured white. Now, you start colouring some cells to black, and then you would be able to generate some pictures with tons of block like artifacts. The following example from [logicalzero.com](http://logicalzero.com/gamby/reference/image_formats.html) shows such a smiley face just colouring a 8x8 grid. As as mentioned before, this colouring procedure would also generate an arrangement of rows and columns (like a matrix).

<div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
    <img src="smiley.png"></img>
    <img src="image3.png"></img>
</div>

A smiley was okay, but it was not very appealing. However, if we wish to create more complicated images, we need a bigger grid. For instance, when you look at a $720 \times 640$ pixels wide image, that means there are $720$ columns and $640$ rows in the matrix, that represent the image.


So combining all the discussion as above, we can represent a video like a 3-dimensional matrix. There are $h$ rows, $w$ columns and $T$ timesteps. Each slice of time represents an image or frame, with $h$ pixels tall and $w$ pixels wide. Note that, here we are considering grayscale videos of only for now, I shall explain about colour videos at the very end.






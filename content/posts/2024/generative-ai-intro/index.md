---
title: 'Introduction to Generative AI - Part 1'
date: "2024-04-28T00:00:00Z"
imageCaption: "[Unstable Diffusion](https://www.unstability.ai/)"
summary: This is a series of blog posts on Generative AI and Prompting Techniques. This post serves as a introduction to the generative AI, its related techniques.

tags:
    - Artificial Intelligence
    - Deep Learning
    - Generative AI

prerequisites:
    - topic: Probability
      level: 1

draft: false
mathjax: true
mermaid: true
---

## Introduction

This is an introductory blog post on Generative Artificial Intelligence and the very first post of the Generative AI blog series that I am going to make over the next few weeks. With the recent AI boom that's taking place right now, generative AI is the `buzzword` everyone is looking for. In this blog series, I will be talking about what generative AI really is, how it works under the hood to some extent, and see tricks and techniques how we can leverage its potential.

To set the expectations: You'll see a lots of YouTube videos, education courses that are selling like hotcake which promises to teach you how to correctly use `ChatGPT`, `DALL-E` to boost your productivity several folds, and how to suddenly make you smart to crack all data-science interviews out there. Unfortunately, I can't promise you that. What I can provide is to explain how most generative AI processes work under the hood, so that the "how to use it for your own purpose" can come to you naturally. 

*Note: There are some paragraphs where I have highlighted them in yellow, you might want to skip those if you think math is too boring or too hard!*


## What is Generative AI

Generative Artificial Intelligence is composed to three terms: Generation, Artificial and Intelligence. Although the term is coined very recently, its releted ideas was present in different forms for the last 50 years[^2].

The word **Intelligence** comes from Latin word **Intelligere**, meaning *to understand*. It literally means intelligence refers to the ability to comprehend complex things. It is one of the most significant gifts of evolution in form of a large brain that sets us humans apart from Chimpanzees. Even the most trained Chimpanzees cannot perform more than very basic tasks such as identifying shapes, solving jigsaw puzzles, etc.[^1], but a five year old child can do significantly much more than that.

With the advancement of computing powers, people have been trying to create machines that shows signs of intelligence. Any such system is called an AI or **Artificial Intelligence**. Such a system should be able to prove that it is intelligence by demonstrating capabilities such as simple tasks like detect shapes, solve puzzles, play games to complex tasks like write content, compose artistic pieces of music or paintings. 

Among these proofs of intelligence, there are two kinds of proof: 

- **Explicit proof:** This is like writing an MCQ exam to prove that you have understood the concepts taught in the class. This is the cases, where we design explicitly the problem that the machine needs to solve. For example, like identifying the digit between 0-9 based on a picture of handwritten digit.

- **Implicit proof:** This is like asking you to write essays to test your literally skills. There is no correct answer that the machine should aim for, but the quality of the essay demonstrates its ability to comprehend and understand various topics.

The generative AI is the artifically intelligent machines designed specifically to give these kinds of implicit proof of intelligence. 

## Capabilities of Generative AI Systems

The implicit proof of intelligence demands us to not specify any specific problem with a definitive correct answer. So the capabilities that a generative AI system demonstrate can be many, some examples of these include:

- Natural language conversation: Ability to understand input message, understand and responds back.
- Image Generation: Ability to generate images / paintings based on ideas.
- Image Summarization: Ability to comprehend what is there in an image.
- Music Composition: Ability to compose musical pieces.

Before processing information, we humans collect the necessary data using our five senses. Similarly, machine takes input using primarily three forms: Text, Speech and Image (or Video), and similarly, a computing machine also produces the output into one of these three natural forms. Based on these types of input-output combination, we segregate the tasks that a generative AI perform into $9$ different segments.

| Input | Output | Examples | 
| ---- | ---- | ---- |
| Text | Text | Translation, Natural language conversation |
| Text | Image | Generate image based on text description |
| Text | Speech | Read aloud a text in human-like voice, Convert stories to podcasts |
| Image | Text | Describe an image using text, image captioning |
| Image | Image | Convert / morph image using transformations, make image editing |
| Image | Speech | Extract text from image and read aloud[^3], Create voiceover for movies |
| Speech | Text | Transcribe voices from movies to subtitles |
| Speech | Speech | Translation, natural language conversation from speech to speech |
| Speech | Image | Generate image based on voice description, Generate videos / movies from podcasts |


## Under the hood of a Generative AI System

Imagine when you learn to draw, paint or ride a motorcycle,most probably you did not learn it right away. You tried to draw multiple times, you rode your motorcycle multiple times before you became good at it. So, to develop this kind of general intelligence, one needs to practice a lot, sometimes see / experience lots of examples.

{{< mathwarning >}}

In mathematical terms, these examples are called **samples**, say we denote them by $x_1, x_2, \dots x_n$, i.e., you have $n$ many examples. There is an underlying probability distribution $p(x)$ from which these samples are usually collected independently (If you don't know what a probability distribution is, think of as a mathematical description of the randomness that governs which examples you provide to the machine). Now, the aim of generative AI systems is usually, given enough training samples $x_1, \dots x_n$, get an estimate $\hat{p}(x)$ of $p(x)$ so that if you can generate a new example by sampling a random variable from $\hat{p}(x)$, it resembles "approximately" a sample from generated from the original probability distribution $p(x)$. So, internally, all generative AI algorithms are trying to get the estimate $\hat{p}(x)$ as accurately as possible.

{{< /mathwarning >}}

Under the hood, a generative AI system performs this in one of two ways.

1. Encoder-Decoder Model.
2. Actor-Critic Model.

### Encoder Decoder Type Model

Encoder Decoder type of generative AI model mimics how humans understand a concept by on his (her) own. Usually, when you experience a list of examples, you try to summarize it in your head to remember the key points. And then, when its your time to perform, you use this summarized information from your head.

For example, when you want to write an essay on say "Global Warming", you may look up online multiple information for research purposes, multiple blog posts and essays. However, when it is time to write, you do not exactly copy it word by word, rather you comprehend the meaning behind the information, extract the keywords, and then paraphrase those concepts to write your final essay.

Same concept is applied in an encoder-decoder model.

<div class="mermaid">
graph TD
    I[Input Example] --> A[\ Encoder /] 
    A -->|summarizes key information| B[Summary Representation]
    B --> C[/ Decoder \] 
    C --> |reconstruct original example| O[Reconstructed Example]
</div>

Basically, the entire system is comprised of 2 parts. An encoder part and a decoder part. The encoder part takes in an example, and it extracts the key relevant information from the example. The decoder part takes the summary information and tries to reconstruct back the original example, as close as possible. Now, the idea is to make the dimensionality of the summary information much much smaller than size (or dimensionality) of the input example. Since, the machine has to reconstuct back the original sample as it is, the encoder has to figure out ways to really compress the information to great extent and only pass whatever is absolutely necessary.


{{< mathwarning >}}
For the math nerds, let $z$ be a random variable denoting the summarized content. Then, 
$$p(x) = p(x \mid z) p(z)$$

Now because $z$ is heavily compressed summary, it contains no auxilliary information. Therefore, all possible values of $z$ are equally likely, (otherwise if some values of $z$ is more likely than others, then this information could be captured through the compression). Another way to think of this is that you want this $z$ to have maximum possible entropy so that they have maximum possible information, but this means $z$ is uniformly distributed over its range (see [here](https://en.wikipedia.org/wiki/Maximum_entropy_probability_distribution#Uniform_and_piecewise_uniform_distributions)). Hence, $p(z) \propto 1$ and hence, we have $p(x) \propto p(x\mid z)$. Therefore, in order to estimate the probability distribution $p(x)$ of the examples, one can try to learn the conditional probability $p(x \mid z)$, i.e. an example given the summarized content. This is what the decoder tries to achieve.

The encoder is then just a supporting structure that helps to train the decoder by providing access to the summmarized content $z$. This $z$ is thus often called the hidden state of $x$ in the encoder-decoder system. 
{{< /mathwarning >}}


Once both the encoder and decoder model is working in perfect harmony and is able to perform the reconstruction, you can now take the encoded part out of the picture. If you put in the summarized content but slightly perturb the values, voila! you get a new example from the decoder model.

<div class="mermaid">
graph TD
    B[Summary Representation] --> C
    C[fa:fa-plus]
    B2[Noise] --> C
    C --> D[/ Decoder \] 
    D --> |perform some reconstruction| O[New Example Output]
</div>

It is analogus to the following situation: Let's say you are good at painting. So, I pick up one potrait of a black-haired woman that you have drawn and I describe it to you for you to recreate it. But in my description, I mention her as a blonde, this in turn, allows you to create the potrait on an imaginary blonde woman instead.


### Actor Critic Model

Actor-Critic model in a generative AI system mimics how a human gets good at something (say painting) by help of a master artist guiding him (her). The apprentice painter tries his (her) hand to make new paintings, sends them to the master artist, and then he (she) scrutinizes it carefully and sends a feedback for the apprentice to improve upon.

<div class="mermaid">
graph LR
    Z[Random Variable] --> |random input| A[Actor] 
    A--> |new example| C[Critic]
    D[Training Data] --> |existing real example| C
    C --> |feedback| A
</div>

Here again, we have two underlying modules in place: An actor machine who is entrusted with creating a new painting, and a critic machine who is entrusted to find problems in the new painting and provide feedback to the actor. Basically, the flow goes like this: 

* A random variable (often a standard Gaussian) is sent as an input to the actor module.
* The actor takes this input, and using that tries to generate new example (new paintings).
* The critic module sees this generated example (painting), and compares them with some real examples (paintings from training data).
* Based on how much similar / dissimilar they look, the critic provides a feedback score to the actor module, so that the actor module can improve. 

These types of models are also often called **Generative Adversarial Networks** or **GAN** in short. 


{{< mathwarning >}}
Again, to give you a mathematical perspective, often the starting seed value $z$ is chosen from a standard normal distribution. In general, it can follow any reasonable probability distribution $p(z)$ (with uncountable support). Then, we can again rewrite 

$$p(x) = p(x \mid z)p(z)$$

This time also, the actor tries to estimate $p(x \mid z)$ by $\hat{p}(x \mid z)$ similar to the decoder model. However, since it has knowledge of $p(z)$, it can use it to estimate the true distribution 
$$\hat{p}(x) = \hat{p}(x \mid z) p(z)$$

and finally, it generates samples $y_1, y_2, \dots y_m$ as independent and identically distributed observations from $\hat{p}(x)$ and passes them to the critic model. The critic model also sees original samples $x_1, \dots x_n$ coming from $p(x)$. Hence, the critic model now has to perform a two-sample hypothesis testing to check whether $\hat{p}(x) = p(x)$ based on the two samples $y_1, \dots y_m, x_1, \dots x_n$. It then provides the p-value (or some kind of distance) as a feedback to the actor model.

Simple examples for such two sample testing criterion can be Kolmogorov-Smirnov test (see [here](https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test)), which also provides Kolmogorov-Smirnov distance as a measure of distance between $\hat{p}(x)$ and $p(x)$. However, most existing models of this type uses a neural network to approximate this distance function instead.

{{< /mathwarning >}}


### Comparison

Both of these two kinds of models has their pros and cons.

- Encoder-Decoder model can be used when you want to pass extract what kind of relevant example you want to generate. For example, it is useful when you want to perform natural machine translation say from English to French. Here, you do not want the actor to generate random text in French, but base the translation on the specific English phrase (i.e., *Hello* should produce *Bonjour*, not something else).

- Actor-Critic models are useful when you want to generate large amounts of similar data. For example, if you want to generate lots of images of different celebrity faces, actor-critic kind of models should be your first choice[^4]. Instead, if you use a encoder-decoder model here, due to the slight perturbation in the summarized content, you will end up with lot less variation in the generated celebrity faces.

- Actor-Critic models are usually notoriously difficult to train, but if they are trained properly, they are very powerful. Compare it to the analogy of training on your own (encoder-decoder) vs training from a coach (actor-critic). Training from a coach is difficult, but if you can master it, it is usually much better.


## Conclusion

Most of the recent popular generative AI models (e.g. - ChatGPT, Claude, DALL-E, Stable Diffusion, etc.) are of the encoder-decoder type.

There are two reasons behind this:

- The purpose you use it for is usually conditional generation, i.e., you give some kind of input based on which you ask the model to generate examples. It is as if you are doing this perturbation or giving the summarized information from which it has to start thinking.

- Additionally, we see this surge of encoder-decoder type models because they are relatively easier to train. This is because, in essence, encoder-decoder type model is a compressing algorithm on steroids, so it is bound to gain some comprehension ability to compress the input information.


In the next post, we will dive deep on the encoder-decoder type of generative AI models and see how each kind of tasks `text-to-text` or `text-to-speech` or `text-to-image`, etc. are performed. 

Feel free to share your feedback, stay tuned for more!


## References 

[^1]: Chimpanzees shown spontaneously ‘taking turns’ to solve number puzzle - YouTube Video Link: https://www.youtube.com/watch?v=tCZEe5hPPyc

[^2]: History of Generative AI - Toloka AI. Link: https://toloka.ai/blog/history-of-generative-ai

[^3]: Speechify AI - https://speechify.com/blog/turn-image-to-speech-with-speechify/

[^4]: Progressive Growing of GANs for Improved Quality, Stability, and Variation - NVidia Blog. Link: https://research.nvidia.com/publication/2018-04_progressive-growing-gans-improved-quality-stability-and-variation


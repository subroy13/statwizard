---
title: 'Introduction to Natural Language Processing - Part 1'
date: "2024-04-08T00:00:00Z"
imageCaption: "[Unstable Diffusion](https://www.unstability.ai/)"
summary: In this series of blog posts, I am going to describe the journey of Natural Language Processing, how it evolved to reach the Large Language Models that we see today and the mathematics behind their inner workings.

tags:
    - Natural Language Processing

draft: false
mathjax: true
mermaid: true

---

## Introduction 

Language is one of the most significant gifts of evolution that sets us humans apart from Chimpanzees. Language is often seen as a sign of intelligence, hence as we want to build more and more intelligent machines with the surge of Artificial Intelligence, it becomes evident that we want these machines to comprehend languages as well. For the past 70-80 years, researchers have come up with various ideas to teach language to machines. And, these numerous efforts have ultimately produced the large language models that we see today, often regarded as the most intelligent artificial systems that we have so far. 

In this series of blog posts, I am going to describe the journey of this research around Natural Language Processing (NLP), how it evolved to reach the stage that we see today, and the intuition and mathematics behind their inner workings.

### What's a Natural Language?

Before delving into the topic of NLP, let us take a look at what is natural language first. It is composed of two words, __Natural__ and __Language__. 

Oxford Dictionary defines **Language** as a structured system of communication, in writing or in speaking. Now think of a mathematician writing the following

$$
\dfrac{1}{e}\int_{0}^{\pi} \sin^2(x)dx 
$$

Any other formal practitioner of mathematics (irrespective of whether they speak English, Spanish, Japanese, French, or anything else) can inarguably understand what the above expression means. So, here, the mathematician is able to communicate her thoughts without writing a single language-specific word. So this itself qualifies mathematics to be a language. However, mathematics is not a **Natural** language, but rather a **Logical** language.

To understand this better, think of the time when you first learned English (or your native language). You started with learning letters, and each of these letters is kind of an alien symbol to you. Similarly, here in the expression we use $\sin(x)$, $\int$, $\pi$, $e$, all these are symbols of mathematics (like the letters in English). While mathematical symbols have their own meanings, the letters in English usually don't have any meanings by themselves. Only when you put together some letters together they form a word, and you get some meaning out of it. 

It does not logically come to you why these symbols together should form a particular meaning, you simply memorize it. For example, the letters *a*, *p*, *p*, *l*, *e* come together to give the meaning of a red-coloured fruit, but why? There is no logical explanation for this.


Well, you shouldn't take my word for granted. Let's try to argue why English is not a **Logical** language. If it is logical, then due to logical consistency, a word or a sentence should have the same meaning irrespective of the context used. For example, Mathematics is a logical language since __2 + 2__ always has the same meaning as __4__, irrespective of the context it is used. (Group theorists might be snapped at this point, but please bear with me :pray: ) On the other hand, consider the sentence:

> You're killing me

which you can use either at a party after hearing a joke from a friend :joy: or during an ongoing robbery after getting shot :scream: or when the doctor is diagnosing the source of pain in your broken arm :weary: , each time with a different meaning.

### Why NLP is hard?



---
title: 'Generative AI Text-to-Text Models - Part 2'
date: "2024-05-05T00:00:00Z"
imageCaption: "[Unstable Diffusion](https://www.unstability.ai/)"
summary: This is the 2nd blog post on Generative AI and Prompting Techniques blog series. In this post, we dive into encoder-decoder generative AI models and the key tunable settings for the Text-to-Text generative AI models.

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

In my previous post of the Generative AI series (please check out [here](https://www.statwizard.in/posts/2024/generative-ai-intro/) if you haven't already!), we took a basic look at what is Generative AI, and looked at two kinds of generative AI models: Encoder-Decoder type model and Actor-Critic model. 

Recently, most of the generative AI models that came out like ChatGPT, Claude, Llama, etc. all of these fall under the category of Encoder-Decoder type model. In fact, they are specifically text-to-text generative models, i.e., you give some text in and you get a text output back. So, in this post, we shall dive deep into inner workings of such models. 

*Note: There are some paragraphs where I have highlighted them in yellow, you might want to skip those if you think math is too boring or too hard!*

## Text-to-Text Encoder-Decoder Model

While the intricate details of the existing AI models (e.g. - ChatGPT, Claude, Llama) are different, they share some common features that makes them very powerful. In the following, we will only look at these common features. Let us take a look at the Encoder and Decoder part separately to understand them better.

### Encoder 

In our brain's frontal lobe, there are two special regions: Wernicke's area and Broca's area. These are responsible for understanding speeches, comprehending and finding meaning out of language. The encoder of a generative AI system is an artificial creation of these two regions combined. You can think of it as a machine that converts the input text into a compact representation of its meaning.

To understand how it works, let us try to think for a moment how we humans understand language. Think of the time when you first learned your second or third language. You probably started with letters without any meaning, then some seemingly arbitrary combination of letters got joined together and made up some word, and you got some meaning for that word. Then words got together into a complex sentence, representing more complex ideas. So, the basis of finding meaning would be to look at the individual words in a sentence, and then combine their meaning to find the meaning of the word.

Even if this is a very intuititve process, it does not help. Let us consider two examples:

**Example 1:** Consider the two sentences as follows:
- How old are you?
- What is your age?

**Example 2:** Consider the two sentences as follows:
- No, this is nice.
- This is not nice.

In the first example, even when none of the words are common in the two sentences, both have the same meaning. In the second example, almost all words are common between the two sentences, they have opposite meaning. This gives are two ideas: There might be synonyms, and the meaning of the sentence depend on how the words are arranged in it. 

#### First Idea

Due to this, the first idea of encoder system was built using a recurrent neural network. Basically, it looks like this:

<div class="mermaid">
graph LR
    subgraph words
        W1
        W2
        W3
        W4
        W5
    end
    M1[Input\nMemory] --> P1[+];
    W1[How] --> |process| P1 --> P2[+]
    W2[old] --> |process| P2 --> P3[+]
    W3[are] --> |process| P3 --> P4[+]
    W4[you] --> |process| P4 --> P5[+]
    W5[?] --> |process| P5 --> M2[Output\nMemory]
</div>


Basically, you have some memory (containing the meaning of the sentence). Then you start to process each word of the sentence one by one, and your memory (or the meaning) of the sentence keeps updating. However, this process is extremely slow, since you cannot process the next word without processing the current word. So everything has to be run sequentially.

#### Second Idea

The idea has evolved the landscape of generative AI was the **Transformers** architecture[^3]. It is different version of Attention type architecture (e.g. Bahadanau style Attention[^1] and Luong style Attention[^2]), which have been there for quite some time before Transformers came into play.

The basic non-mathematical idea is like this: When you read through a sentence and try to understand its meaning, you do not always read each and every word. Some words are *meaningful* (like this) and some words *are* not (like the word ``_are_''). Also, another thing is when you are reading through a document, there might be multiple sentences that refers to subjects and objects using pronouns (he / she / this / that / it), and the whenever such thing occurs, you kind of know what it means. It is as if, you keep a mental map of things (or entities) you have read so far, and whenever a pronoun occurs, you refer back to it.

<div class="mermaid">
graph TD
    subgraph words
        W1[How]
        W2[old]
        W3[are]
        W4[you]
        W5[?]
    end
    M1[Input\nMemory] --> P1[+]
    W1 --> |process| P1 
    W1 & W2 -.-> A1[Attention] --> |process| P1
    W1 & W2 & W3 -.-> A2[Attention] --> |process| P1
    W1 & W2 & W3 & W4 -.-> A3[Attention] --> |process| P1
    W1 & W2 & W3 & W4 & W5 -.-> A4[Attention] --> |process| P1 --> M2[Output\nMemory]
</div>

Attention is a trick that helps you do precisely this. For each word, you can attend to any of the previous word if you need. Now, there is no need to run the process sequentially, since for each word you want to process, you can take in the entire sequence of word before it.

{{< mathwarning >}}
The mathematics behind the Attention mechanism is based on the inner product of vectors. Assume that for every word $w$, you have got a vector $\boldsymbol{v}_w \in \mathbb{R}^{d}$ (usually, $d = 768, 1024, 1536, 2048$, etc.) which is a dense numerical representation of its meaning. This is often called an embedding vector.

Now, given two such embedding vectors $\boldsymbol{v}\_{w1}$ and $\boldsymbol{v}\_{w2}$, their inner product $\boldsymbol{v}\_{w1}^t \boldsymbol{v}\_{w2}$ represents the similarity in meaning between the corresponding words. Now, lets say you are at word $w_i$ and the words in the sentence before it are $w_1, w_2, \dots w_{i-1}$. Then, Transformers-type attention creates a new vectors 
$$
\boldsymbol{a}\_i = \sum_{j=1}^{i-1} (\boldsymbol{v}\_{wj}^t \boldsymbol{A} \boldsymbol{v}\_{wi}) \boldsymbol{v}\_{wj}
$$
Here, $\boldsymbol{A}$ is a positive-definite matrix consisting of trainable parameters that controls how the attention should behave. Note that, the above is a dot-product weighted linear combination of the previous words with the weights proportional to how similar the previous words $w_j$ are with the current word $w_i$. 
{{< /mathwarning >}}


### Decoder

The decoder is the reverse process of encoder. It uses the meaning obtained so far, and tries to build a sentence (or setences) from the meaning. 

Again, it helps to relate it to how we humans write something based on an abstract idea in our head. We write one word by one word, and as we write more, the abstract idea changes and turns to take a concrete shape. Exactly same way, decoder also produces its output one word at a time, sequentially. 

Now you might say, is not it too slow? Just like the encoder. Turns out yes, but so far, we have not been able to obtain anything better like Attention mechanism for decoder. May be it is your time to think about! :smile:


<div class="mermaid">
graph TD
    subgraph words 
        W1[I]
        W2[am]
        W3[ten]
        W4[years]
        W5[old]
    end
    subgraph Memory
        M1
        M2
        M3
        M4
        M5
    end
    M1 --> |predict| D1[Distribution] --> |sample| W1 --> |update memory| M1
    M2 --> |predict| D2[Distribution] --> |sample| W2 --> |update memory| M2
    M3 --> |predict| D3[Distribution] --> |sample| W3 --> |update memory| M3
    M4 --> |predict| D4[Distribution] --> |sample| W4 --> |update memory| M4
    M5 --> |predict| D5[Distribution] --> |sample| W5 --> |update memory| M5
    M1 --> M2 --> M3 --> M4 --> M5
</div> 


### The Decoder Parameters

At every stage, the decoder is posed with a very simple problem. It is to fill in the blanks for a problem like this.

*The weather is ____*

You're probably thinking of putting *nice* in the blanks. But the word *gloomy* also fits the blanks perfectly. Even if you know the meaning that it should say something positive, the words *nice*, *sunny*, *amazing*, *good*, all of these are applicable. It is as if the decoder is posed with many choices to pick a correct word, and it can pick any of these.

In mathematical terms, this is constructed through a probability distribution $p(i)$ over the vocabulary, the set of all words. You can think of probability distribution as a specification of "what is the probability / proportion of times the $i$-th word in the vocabulary can be put in the current blanks." To give you an example: In the above blanks, may be $40\%$ of the people will put in "nice" in the blanks, may be $10\%$ will put in "gloomy" and almost no one will put in "pizza" or "cricket" in the blanks as it does not make sense. Hence, the probability distribution will specify $p(nice) = 0.4$, $p(gloomy) = 0.1$, and probably $p(pizza) = p(cricket) = 0$.

So, at every stage of the decoder, it predicts a probability distribution $p(i)$ over the vocabulary and then performs a sampling (i.e., choose a word according to the predicted probability distribution). Now for this sampling, it uses a few specialized hyperparameters.

- **Top K:** In general, these models work with vocabularies containing at least a million words. Now, imagine that it has to perform sampling from such a large probability distribution, i.e., roll a million sided dice (on each face of the dice we have a word written), too difficult to do, right? This `top K` parameter restricts the choice of this word to only the words with the largest $K$ probabilities in this distribution. 

As an example, consider the probabilities as before. We have $p(nice) = 0.4$, $p(gloomy) = 0.1$, and probably $p(pizza) = p(cricket) = 0$. Now, using `top K = 1` will restrict the probability distribution to the words with largest $1$ probabilities, i.e., the only possible word becomes "nice". 

{{< mathwarning >}}
In mathematical terms, it means the transformed probability distribution is 
$$
p_{new}(i) = \dfrac{p_{old}(i)}{\sum_{j = 1}^{K} p_{old, (j)}}
$$
where $p_{old, (1)} \geq p_{old, (2)} \geq \dots p_{old, (K)}$ are the ordered probabilities.
{{< /mathwarning >}}


- **Top P:** It is similar to top K, but instead of specifying how many words exactly to retain, you specify what percentage of words with large probabilities to retain. That means, if you put `top P = 0.25`, and you've got a million words, that is equivalent to saying `top K = 250,000`. 

- **Temperature:** The temperature is a parameter that controlls how much this probability distribution sharpens towards its largest values. It is a value between $0$ and $1$. If temperature is equal to $1$, the probability distribution remains as it is. If it is close to $0$, it has a similar effect like `top K` or `top P`, by increasing the probability for more likely words and decreasing the probability for less likely words. As an analogoue, you can think of this as a controller for the income equality, if it is close to $0$, the rich gets richer and the poor gets poorer.

{{< mathwarning >}}
In mathematical terms, the transformed probability distribution is 
$$
p_{new}(i) = \dfrac{p_{old}(i)^{1/\tau}}{\sum_{j = 1}^{\vert V\vert} p_{old}(j)^{1/\tau} }, \ \tau \in (0, 1] 
$$
The set $V$ is the vocabulary and $\tau$ is the temperature parameter. If $\tau = 1$, $p_{new}(i) = p_{old}(i)$. If $\tau \rightarrow 0$, we have $p_{new}(i) = \boldsymbol{1}(p_{old}(i) = \max_{j} p_{old}(j) )$, i.e., it becomes a degenerate probability distribution at the word with largest probability. 
{{< /mathwarning >}}

In layman terms, it means if you choose temperature close to $1$, the decoder has more words to choose from. So, it can experiment with different styles of writing, hence it is useful for poetic or artistic style of writings. On the other hand, if you choose temperature close to $0$, the decoder has less words to choose from, and it starts to be repeatative and more factual in response.

Note that, you can do the same thing with controlling either `top P` or `top K` also.

Let us see how this temperature, top P and top K work with generative AI. Since all three of these parameters have similar kind of effect, restriction of the set of words to sample from, many LLM currently only provide option for tuning the temperature parameter. Here, I make use of Claude[^4] model from Anthropic to demonstrate the effect of temperature. 

```cmd
// Settings: Temperature = 0, Model = anthropic.claude.haiku

> User: Tell me a joke

> Assistant: Here's a silly joke for you:
Why can't a bicycle stand up on its own? Because it's two-tired!
How was that? I tried to come up with a simple, lighthearted pun-based joke. Let me know if you'd like to hear another one!

> User: Tell me a joke

> Assistant: Here's a silly joke for you:
Why can't a bicycle stand up on its own? Because it's two-tired!
How was that? I tried to come up with a simple, lighthearted pun-based joke. Let me know if you'd like to hear another one!
```

Now even when I try multiple times the same prompt, I get back the same joke, over and over. On the other hand, when I change the temperature to 1, we get back a different joke every time.

```cmd
// Settings: Temperature = 1, Model = anthropic.claude.haiku

> User: Tell me a joke

> Assistant: Here's a silly joke for you:
Why don't scientists trust atoms? Because they make up everything!
How was that? I tried to find a simple, family-friendly joke that would hopefully give you a little chuckle. Let me know if you'd like to hear another one!

> User: Tell me a joke

> Assistant: Here's a classic joke for you:
Why can't a bicycle stand up by itself? It's two-tired!

> User: Tell me a joke

> Assistant: What do you call a fake noodle? An impasta!
```

As you can see, by increasing the temperature value close to $1$ (or you can make it even beyond 1), we get back different kinds of responses from the same machine. So, you might want to change the temperature value to add an element of surprise when using generative AI text-to-text models.

- **Max Tokens:** This is the maximum number of words (or tokens, i.e., sub-word) that the decoder needs to predict. Usually, this is something associated with the cost. The more number of words (or tokens) you predict, the more the AI model needs to run, the more cost it is going to incur. Usually, you would want to set it to be about 100 max tokens when your answer will be 1-2 paragraphs at most. 

As an example, when I set the max token to very small number, say 3, then the response from Claude model gets interrupted after predicting the 3rd token.

```cmd
// Settings: Max tokens to sample = 3, Model = anthropic.claude.haiku

> User: Hello

> Assistant: Hello! How
```

- **Stop sequence:** This is the sequence of words that if predicted, the decoder will stop predicting more words. For instance, by default we have a special word `<EOS>` (End of Sentence) which is used to denote that the decoder has completed the writing.

Stop sequence is useful when you want the model to stop its responses intentionally after a specific word is generated. Let me show you an example. Let's say, you want to predict whether a sentence has positive or negative sentiment. Now, when you ask something like this to Claude, it also provides an elaborate explanation.

```cmd 
// Settings: Stop Sequences = [], Model = anthropic.claude.haiku

> User: Classify the following sentence as positive or negative sentiment. 
Today is a bright day, best weather to play outside.

> Assistant: The given sentence has a positive sentiment.
The sentence describes the day as "a bright day" and mentions the "best weather to play outside", which suggests a positive and upbeat tone. There are no negative words or expressions used, and the overall sentiment conveyed is one of positivity and enjoyment.
```

However, we might be only interest in knowing only if it has "postive" or "negative" sentiment. May be the result will be passed to another workflow which expects the input to be binary: either "positive" or "negative" category, without any explanatory text. You can achieve this by setting a stop sequence here, by asking the model to stop at the token **"tive"**. Note that, both **postive** and **negative** ends in this token, so whenever this occurs, we can look at the last word and see whether it is positive or negative. 

```cmd
// Settings: Stop Sequences = [], Model = anthropic.claude.haiku

> User: Classify the following sentence as positive or negative sentiment. 
Today is a bright day, best weather to play outside.

> Assistant: The given sentence has a positive
```

Now, it is easy to write a parser code that takes this text, looks at the last word and checks if it is positive or negative. 

## Conclusion

So far, we have look into how the internal settings of the models modify the response of the generated text. Effective tuning of these settings can have visible impact on your generative AI based solutions and use-cases. 

In the next post of this blog series, we will see how we can control the behaviour of the model generated text using the input text itself, i.e., the prompt. We will go over a bit on different prompt engineering techniques and how that can be used effectively to solve different use-cases.


## References

[^1]: Bahdanau, Dzmitry, Kyunghyun Cho, and Yoshua Bengio. "Neural machine translation by jointly learning to align and translate." arXiv preprint arXiv:1409.0473 (2014). (Also see the Tensorflow Bahdanau Attention Documentation -  https://www.tensorflow.org/addons/api_docs/python/tfa/seq2seq/BahdanauAttention)

[^2]: Luong, Minh-Thang, Hieu Pham, and Christopher D. Manning. "Effective approaches to attention-based neural machine translation." arXiv preprint arXiv:1508.04025 (2015). (Also see the Tensorflow Luong Attention Documentation - https://www.tensorflow.org/addons/api_docs/python/tfa/seq2seq/LuongAttention)

[^3]: Vaswani, Ashish, et al. "Attention is all you need." Advances in neural information processing systems 30 (2017).

[^4]: Claude - Anthropic. Link: https://claude.ai/
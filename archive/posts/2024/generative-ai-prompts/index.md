---
title: 'Designing Prompts: Generative AI Series - Part 3'
date: "2024-05-17T00:00:00Z"
imageCaption: "[Unstable Diffusion](https://www.unstability.ai/)"
summary: This is a series of blog posts on Generative AI and Prompting Techniques. In this post of Generative AI series, we will look into what prompt engineering is, and how to design better prompts to leverage the power of Generative AI in your typical use-cases.

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

In the last post (check [here](https://www.statwizard.in/posts/2024/generative-ai-encoder-decoder/) if you haven’t already) of the Generative AI series, we look at how the encoder-decoder type of generative AI models work, and also how we can use the hyperparameters to tune the sampling procedure of the decoder, enabling us to make the generative AI useful.

In this post, we will look at the other side of the coin: how we can make effective use of the encoder to make generative AI useful. 

*Note: There are some paragraphs where I have highlighted them in yellow, you might want to skip those if you think math is too boring or too hard!*

## Prompt Engineering

Before proceeding with how to make effective use of a generative AI model’s “encoder”, let’s take a step back and think of how we can tune the encoder. The encoder only acts on your input text and tries to create a comprehensive understanding of your instructions. There is not much you can do here, either you can retrain the encoder to gain a better understanding of your domain knowledge through **“fine-tuning”**, or, effectively communicate your intentions through the input text to the encoder. This effective communication is **“prompt engineering”**.

Let me give you an example: Think of yourself giving a presentation, let’s say on “cooking fish”. The encoder is like the part of your brain that processes the concepts associated with that topic, it basically is the experience you have accumulated by cooking fish probably hundreds of times. On the other hand, the decoder is the part of your brain that you use to explain and give the presentation to your audience. Now, based on your audience, you can tune your “decoder”-brain to stylize your presentation: If the audiences are chefs, then you would want to provide details about different spices you use to cook the fish; but if the audiences are nutritionists, then you would want to provide details on the nutritional value of different fishes. Compared to that, the “encoder”-brain has only two ways to do something new:

* By cooking and gathering more experience. This is fine-tuning.

* By attending some seminars on cooking (by similar professionals as of your audience) and using that information in your presentation. This is prompt engineering.

Formally, 

> Prompt Engineering is designing the input to the generative AI models in a way to ensure better performance in the generated output for specific needs and use-cases.


## Prompting Techniques

Prompting techniques are some empirically proven guidelines on how one can achieve better results through custom-made prompts.

### Chatbot Assistant

The LLM (Large Language Models) as a whole, is an impressive machine to autocomplete texts, nothing more. To me, this is the most accurate way to understand LLM.

Normally, we think of autocompleting like this.

```
Once upon a time, there was a ____
```

and then LLM can fill up the blank by predicting the next word. It does so because it can understand that this is probably the starting line of a fiction story because it has seen so many stories that start with the exact same line in its training data.

However, a more useful structure would be if the LLM could answer the questions asked by us humans. Or perform the explicit instructions given by us. So, the researchers tried training the models (more like fine-tuned) on documents like this:

```
User: What is the capital of France?
Assistant: The capital of France is Paris.
User: Which visiting places should I go to in Paris?
Assistant: Here are some of the top recommended visiting places in Paris: 1. Effiel Tower. 2. Louvre Museum. 3. Notre-Dame Cathedral, …
```

Now since it has been trained on a lot of documents that look like this, once we pass some query “What is 2+2?”, under the hood, one can send the LLM model the following text:

```
User: What is 2+2?
Assistant: _________
```

and ask the LLM to complete this sentence/paragraph. As in the training documents, it saw that the expected behaviour here is to answer the previous question asked after that “User:” word, so now it knows it can only be completed with 2+2 is 4.

This kind of training is usually called “instruction fine-tuning” of the model.

This is what happens under the hood when you use [ChatGPT](https://chat.openai.com/).

### More Instructions and Prompt Templating

Now, as soon as these LLMs were unleashed onto the world, many users tried to experiment with its behaviour by carefully changing the instructions they give in the user query after that User: keyword. They also found that many common instructions exist that can serve as a template. the only changing part is probably the final query asked. As an example consider the following:

```
Provide a step-by-step guide on how to prepare a delicious dish based on the ingredients which I list down below. Please include the following in your response.
1. The name of the dish.
2. A list of integredients needed (including the quantities)
3. How much approximate time will be required to make it.
4. Finally the receipe on the step-by-step process on how to prepare the dish.
Also make sure the dish has nutritional value.
Here are the list of available ingredients:
{list of ingredients}
```

This can serve as a template whenever one is asking for a new recipe. The format and the template would remain the same, only the list of ingredients may change from time to time and based on the person who is asking it. So, it is now possible to build software that takes input from users about the list of ingredients and pastes them in `{list of ingredients}` before calling the LLM, making the software capable of using AI.

<div class="mermaid">
graph LR
    User --> ApplicationCode[Application Code]
    ApplicationCode --> Variable
    Template --> Prompt
    Variable --> Prompt
    Prompt --> LLM
</div>


So, I used this prompt with the following list of ingredients: rice, eggplant, tomatoes, flour, and spinach. It gave the following response.

```
Dish Name: Spinach and Eggplant Rice Casserole
Ingredients: …
```

Great! But now it appears there is another problem. Since it simply outputs text, there is no proper way to parse the text to extract the required information. Like the name of the dish, list of the ingredients, etc. This is because, if I send the same prompt again, the decoder of the LLM will again perform sampling, which being probabilistic, may end up a bit differently. It can now start with “Here is a dish that you can make with … ingredients. The name of the dish is …”

So, to make the response from the LLM helpful for your software/use case, you need something more. A bit more specially tailored prompt.

Provide a step-by-step guide on how to prepare a delicious dish based on the ingredients which I list down below. Please respond in the following exact format shown below.

```
<dish>The name of the dish</dish>
<ingredients>
<ingredient><name>Name of the ingredient used</name><quantity>The quantity of the ingredient</quantity></ingredient>
...
</ingredients>
<cooking_time>Provide the approximate cooking time in minutes.</cooking_time>
<receipe>
A markdown text explaining the step-by-step process on how to prepare the dish.
</receipe>

Also make sure the dish has nutritional value.
Here are the list of available ingredients:
{list of ingredients}
```

Here, we rewrite the same prompt, but this time, we specifically instructed the LLM to adhere to a specific format. This time, the same LLM always replied in this format.

```
<dish>Spinach and Eggplant Rice Casserole</dish>
<ingredients>
 <ingredient><name>Rice</name><quantity>1 cup</quantity></ingredient>
 <ingredient><name>Eggplant</name><quantity>1 medium-sized, diced</quantity></ingredient>
 ...
</ingredients>
<cooking_time>60 minutes</cooking_time>
<receipe>
1. Prepare the rice 
...
</receipe>
```

One interesting thing to note here is that I intentionally spelled <recipe> wrong using <receipe>. This is just to demonstrate that the LLM copies it exactly without the meaning attached to the name of the tags.

Usually, asking the LLM to write values within XML tags (like the ones in the angled bracket) works great to ensure a reliable LLM workflow. Now when the LLM returns the output in this specific format, you can parse the text and retrieve the exact information you need using Regex. (Think of this as a sophisticated algorithm for string matching).

So, now your software using the LLM intelligence looks like this: Basically, the output from the LLM now goes through different parsers (like Regex matching) which feed the required information to your application code, which can respond to the user, by leverage the intelligence of the LLM.

<div class="mermaid">
graph LR
    User <--> ApplicationCode[Application Code]
    ApplicationCode --> Variable
    ApplicationCode --> Template
    Variable --> Prompt
    Template --> Prompt
    Prompt --> LLM
    LLM --> Output
    Output --> Parser1[Parser 1]
    Output --> Parser2[Parser 2]
    Output --> Ellipsis[...]
    Output --> ParserN[Parser n]
    Parser1 --> ApplicationCode
    Parser2 --> ApplicationCode
    ParserN --> ApplicationCode
    Ellipsis --> ApplicationCode
</div>


### System Prompts

Now this kind of templating architecture for using LLM has become a norm, so, the major AI companies (e.g. Meta, Anthropic, OpenAI, etc.) started integrating this system into the model itself. Remember that we had training documents looking like User: Question and then Assistant: Answer format for training the LLM. Now, a variant of the training document was introduced.

```
System: You will always answer the user’s query in Spanish.
User: What is the capital of France?
Assistant: La capital de Francia es París
User: Which visiting places should I go to in Paris?
Assistant: Éstos son algunos de los principales lugares recomendados para visitar en París: 1. Torre Effiel. 2. Museo del Louvre. 3. Catedral de Notre Dame,…
```

Basically, now at the beginning of the training document, it introduces a system prompt that determines how the chatbot will behave. It is like providing most parts of your template whatever is static. The user query will contain only the rest dynamic part that will come from the user inputs.

It should be obvious to you now that the system prompt is also a part of the prompt. Hence, whenever you use the LLM, they charge you exactly the same way for the system prompt tokens also. It is internally, they format this sequence of System: , User: and Assistant: dialogues and then ask the LLM to autocomplete that dialogue.

Hence, if you have $100$ tokens (words) in the system prompt and the user types in a query with 50 tokens, then you are charged for $150$ tokens (sometimes may be $5$ more tokens, i.e., $155$ tokens, as it includes <SYS><TEM><:> and <USER><:>)

## Conclusion

So far, we have seen different prompting techniques to make effective use of LLM. But still, one major problem persists. It is that all LLM, so far, under the hood is an autocomplete model that works by predicting the next best word to finish the sentence. Clearly, it does not mean that the “best” word is always the correct answer.

* `The earth is ____.` The “best” word might be round, beautiful, massive, etc. But it is really very unlikely to continue this sentence as “The earth is composed of minerals like … ", which might be the correct answer given the context.

* `___ is a doctor. ___ is a nurse.` Usually, most of the training data (results on the internet) will contain “He is a doctor. She is a nurse”. But this, in principle, reflects the gender bias present in most open-access texts, while the other way around “She is a doctor. He is a nurse” is equally valid.

This phenomenon is called the **Hallucination Effect** on the LLM, where the LLM outputs a very probable but wrong answer. In the next post, we will explore this direction and see the popular ideas that can be used to mitigate this.

Thank you very much for being a valued reader! 🙏🏽 Stay tuned for upcoming posts on the Generative AI series. Subscribe to my newsletter [here](https://statwizard.substack.com/?showWelcome=true) to get notified when the next post is out. 📢

Until next time.

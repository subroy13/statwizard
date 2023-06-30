---
title: "Chatbot with Seq2Seq model"
date: "2020-01-10T00:00:00Z"
mytype: software
imageCaption: "[Christos](https://dribbble.com/mooodswings)"
summary: "A simple Chatbot with Seq2Seq model with Bahadau Attention Mechanism trained on Cornell Movie Corpus dataset." 
tags:
  - Deep Learning
  - Natural Language Processing

links:
    - name: Github Repository
      icon: "fab fa-github"
      link: "https://github.com/subroy13/seq2seq_attention_bot"
      color: neutral

---

# Seq2seq Attention Bot

  It is a chatbot with seq2seq neural network with basic attention mechanism, completely implemented in Python using `Tensorflow 2.0` and `keras` package. Here we use [Cornell Movie Corpus Dataset!](http://www.cs.cornell.edu/~cristian/Cornell_Movie-Dialogs_Corpus.html)
  
  The follwoing steps are needed to be performed to run the chatbot.
1. Choose any version to work with.
2. The data is first needed to be preprocessed using **preprocess.py**. It then creates two languages ( one for questions and one for answers) and saves them. 
3. The file **Chatbot_class.py** contains the python implementation of our seq2seq model using basic RNN and GRU Cell.
4. The file **training.py** needs to be executed to run the training over the dataset. This training step differs between v_1 and v_2. It creates two .pickle file called *encoder* and *decoder* which contians the trained parameters. **Note: This step may take a while. It is recommended to use a GPU to perform the training.**
5. Finally **bot_app.py** can be executed to run the chatbot from console.
















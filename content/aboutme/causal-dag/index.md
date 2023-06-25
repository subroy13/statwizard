---
title: "Causal Inference using DAG Models"
date: "2019-12-20T00:00:00Z"
type: report
authors: 
    - Abhinandan Dalal
    - Subhrajyoty Roy
    - Arindam Roy Chowdhury
imageCaption: "[Open Knowledge Graph](https://data.open.ac.uk/)"
summary: "Introduction to Causal Analysis using Directed Acylic Graphs (DAG)"
tags:
  - Network Analysis

publication:
    - type: "report"
      pdf: "final-report.pdf"

---

# Introduction

The questions that motivate most studies in the health, social and behavioral sciences
are not associational but causal in nature. From policy formulation in social sciences to
assessing effectiveness of newly created drug in biological science, causal inference is very
much demanded in different disciplines of science.

In the usual statistical techniques, we proceed by following structures;

1. First, we specify a model to describe the data.
2. If possible, we try to see whether the model is valid for the observed data that we have at hand, using outlier detection or through means of hypothesis testing. If the model is not adequate, revise the model.
3. Then we estimate various parameters of the specification for the model, through means of the observed data.
4. Finally, we use the estimated parameters to fully specify the model, and use that to answer the required question which we are trying to answer, i.e. to meet the requirements specified by the objective of the study.


However, such a statistical theory fails to answer the question mentioned before, due to the assumption that it only captures the essence of the behaviour of samples following a distribution governed by the model specification. There is nothing in a distribution function (as used in classical theory of Statistics) to tell us how that distribution would differ if external conditions were to change, say from observational to experimental setup, because the laws of probability theory do not dictate how one property of a distribution ought to change when another property is modified. This information must be provided by causal assumptions which identify relationships that remain invariant when external conditions change. Causal techniques are able to make inference about the sample even under the situation when underlying distribution changes due to the effect of treatments or interventions on the sampling units.

# Abstract

In this basic introductory review, we describe how Causal relationships can be explicitly specified by using a Directed Acyclic Graph (DAG). Then we describe some special types of structures such as Chain, Forks, Colliders and separation that make up the DAGs and how the corresponding structure can be written with a probabilistic interpretation. Continuing with them, we explain frontdoor and backdoor criterion, and how mediation can be perform to obtain causal inference from data as well as estimate the effects of causal intervention. We conclude with some real-life applications of the techniques described.


An extended version of the report is [here](final-report.pdf).

The slides of the presentation can be found [here](presentation.pdf).












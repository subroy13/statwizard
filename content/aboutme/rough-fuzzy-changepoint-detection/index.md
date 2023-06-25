---
title: "Rough-Fuzzy CPD: a gradual change point detection algorithm"
authors:
- Ritwik Bhaduri
- Subhrajyoty Roy
- Sankar K. Pal
date: "2022-11-15T00:00:00Z"
imageCaption: "[Paper](https://link.springer.com/article/10.1007/s42488-022-00077-3)"
type: publication
summary: "This article proposes a methodology to incorporate rough-fuzzy set theory into the changepoint detection algorithms to enable them more befitting towards gradual changepoint detection."


tags:
  - Changepoint Detection
  - Time Series Analysis
  - Fuzzy Systems

  
publication:
    - type: journal
      journal: "Journal of Data, Information and Management"
      year: "2022"
      publisher: "Springer"
      url: "https://doi.org/10.1007/s42488-022-00077-3"
      pdf: "https://link.springer.com/article/10.1007/s42488-022-00077-3"


---

# Abstract 

Changepoint detection is the problem of finding abrupt or gradual changes in time series data when the distribution of the time series changes significantly. There are many sophisticated statistical algorithms for solving changepoint detection problem, although there is not much work devoted towards gradual changepoints as compared to abrupt ones. Here we present a new approach to solve the changepoint detection problem using the fuzzy rough set theory which is able to detect such gradual changepoints. An expression for the rough-fuzzy estimate of changepoints is derived along with its mathematical properties concerning fast computation. In a statistical hypothesis testing framework, the asymptotic distribution of the proposed statistic on both single and multiple changepoints is derived under the null hypothesis enabling multiple changepoint detection. Extensive simulation studies have been performed to investigate how simple crude statistical measures of disparity can be subjected to improve their efficiency in the estimation of gradual changepoints. Also, the said rough-fuzzy estimate is robust to signal-to-noise ratio, a high degree of fuzziness in true changepoints, and also to hyperparameter values. Simulation studies reveal that the proposed method beats other methods of gradual changepoint detection (including MJPD, HSMUCE, fuzzy methods like FCP, FCMLCP etc) and also popular crisp methods like Binary Segmentation, PELT, and BOCD in detecting gradual changepoints. The applicability of the estimate is demonstrated using multiple real-life datasets including Covid-19. We have developed the python package roufcp for broader dissemination of the methods.



export type IResearchItem = {
    title: string;
    summary: string;
    authors: string[];
    date: string;
    links: Array<{
        type: "journal" | "arxiv" | "code" | "data",
        detail?: string;
        url: string;
    }>
}

export const RESEARCH_PAPERS: IResearchItem[] = [
    {
        title: "Onset detection - A new approach to QBH system",
        summary: "We develop a QBH (Query-by-Humming) system based on detection of onsets of a song, within a statistical framework.",
        authors: ["Ritwik Bhaduri", "Soham Bonnerjee", "Subhrajyoty Roy"],
        date: "2019-08-21",
        links: [
            {
                type: "arxiv",
                url: "https://arxiv.org/abs/1908.07409"
            },
            {
                type: "code",
                url: "https://github.com/subroy13/OnsetDetection"
            }
        ]
    },
    {
        title: "Feasibility of Transparent Price Discovery in Tea through Auction in India",
        summary: "This article examines Tea Auctions in India and forms an idea about the valuations that occur for several of the tea grades, and endeavoured to fit the model determining the final transaction price of the auction based on several relevant factors. The article also looks into the significance of manual valuations as predictors for the final price, and discussed several aspects to do away with the practice of manual valuations.",
        authors: [
            "Dr. Diganta Mukherjee",
            "Abhinandan Dalal",
            "Subhrajyoty Roy"
        ],
        date: "2019-11-01",
        links: [
            {
                type: "arxiv",
                url: "https://arxiv.org/abs/2005.02814"
            },
            {
                type: "journal",  // Assuming "report" as "journal"
                detail: "Commodity Insights Yearbook 2019 - MCX",
                url: "https://www.mcxindia.com/docs/default-source/about-us/commodity-insights-yearbook/2019/02-emerging-trends/feasibility-of-transparent-price-discovery-in-tea-through-auction-in-india-dr-diganta-mukherjee-mr-abhinandan-dalal-and-mr-subhrajyoty-roy.pdf?sfvrsn=ab5bb390_2"
            }
        ]
    },
    {
        title: "Analysis of Pollution Patterns in Regions of Kolkata",
        summary: "In this article we perform exploratory analysis about the pollution patterns across different locations in Kolkata over a 20+ year period",  // No summary provided in the YAML, so it's left as an empty string
        authors: [
            "Subhrajyoty Roy",
            "Debasis Sengupta",
            "Kalyan Rudra",
            "Udit Surya Saha"
        ],
        date: "2020-11-01",
        links: [
            {
                type: "journal",
                detail: "Calcutta Statistical Association Bulletin, Volume 72 (pp 133-170)",
                url: "https://doi.org/10.1177/0008068320976781"
            }
        ]
    }, {
        title: "A New Robust Scalable Singular Value Decomposition Algorithm for Video Surveillance Background Modelling",
        summary: "Classical singular value decomposition suffers from presence of outliers in the data. In this article, we present the estimation of singular values through density power divergence which is robust and efficient.",
        authors: [
            "Subhrajyoty Roy",
            "Ayanendranath Basu",
            "Abhik Ghosh"
        ],
        date: "2021-09-22",
        links: [
            {
                type: "arxiv",
                url: "https://arxiv.org/abs/2109.10680"
            },
            {
                type: "code",
                url: "https://github.com/subroy13/rsvddpd"
            }
        ]
    },
    {
        title: "Trustworthy Dimensionality Reduction",
        summary: "My master's dissertation thesis on proposing a novel dimensionality reduction technique which is trustworthy. This thesis covers issues with existing approaches, how to measure trustworthiness, and a proposal that optimizes those metrics.",
        authors: [
            "Subhrajyoty Roy",
            "Smarajit Bose"
        ],
        date: "2021-06-21",
        links: [
            {
                type: "code",
                url: "https://github.com/subroy13/effective-dimension-reduction"
            },
            {
                type: "arxiv",
                url: "https://arxiv.org/abs/2405.05868"
            },
            {
                type: "data", // Assuming slide can be categorized as "data" as it is an additional resource
                url: "https://github.com/subroy13/effective-dimension-reduction/blob/master/docs/presentation-final.pdf"
            }
        ]
    },
    {
        title: "A generalized epidemiological model with dynamic and asymptomatic population",
        summary: "This article proposes a new epidemiological model SINTRUE to model the dynamics of a contaminating disease with a significant asymptomatic population. As a working example, we use the Covid-19 data of Chattisgarh to model and predict the second wave of covid.",
        authors: [
            "Anirban Ghatak",
            "Shivshanker Singh Patel",
            "Soham Bonnerjee",
            "Subhrajyoty Roy"
        ],
        date: "2022-08-17",
        links: [
            {
                type: "journal",
                detail: "Statistical Methods in Medical Research, Volume 31",
                url: "https://doi.org/10.1177/09622802221115877"
            }
        ]
    },
    {
        title: "Rough Fuzzy CPD: a gradual changepoint detection algorithm",
        summary: "This article proposes a methodology to incorporate rough-fuzzy set theory into changepoint detection algorithms to make them more suitable for gradual changepoint detection.",
        authors: [
            "Ritwik Bhaduri",
            "Subhrajyoty Roy",
            "Sankar K. Pal"
        ],
        date: "2022-11-15",
        links: [
            {
                type: "journal",
                detail: "Journal of Data, Information and Management, Volume 4 (pp 243-266)",
                url: "https://doi.org/10.1007/s42488-022-00077-3"
            }
        ]
    },
    {
        title: "Analysis of the rSVDdpd Algorithm: A Robust Singular Value Decomposition Method using Density Power Divergence",
        summary: "This paper deals with the theoretical aspects of one of my earlier papers introducing the rSVDdpd algorithm.",
        authors: [
            "Subhrajyoty Roy",
            "Abhik Ghosh",
            "Ayanendranath Basu"
        ],
        date: "2023-07-20",
        links: [
            {
                type: "arxiv",
                url: "https://arxiv.org/abs/2307.10591"
            }
        ]
    },
    {
        title: "Robust and Efficient Estimation in Ordinal Response Models using the Density Power Divergence",
        summary: "In real life, we frequently come across data sets that involve some independent explanatory variable(s) generating a set of ordinal responses. In this paper, we explore a minimum distance estimation procedure based on the popular density power divergence (DPD) to yield robust parameter estimates for the ordinal response model.",
        authors: [
            "Arijit Pyne",
            "Subhrajyoty Roy",
            "Abhik Ghosh",
            "Ayanendranath Basu"
        ],
        date: "2024-04-20",
        links: [
            {
                type: "arxiv",
                url: "https://arxiv.org/abs/2208.14011"
            },
            {
                type: "journal",
                detail: "Statistics, (pp 1-40)",
                url: "https://doi.org/10.1080/02331888.2024.2347329"
            }
        ]
    }
];



export type ITalk = {
    title: string;
    summary: string;
    date: string;
    organization: string;
    links: {
        slide?: string;
        video?: string;
    }
}



export const TALKS: ITalk[] = [
    {
        title: "Algorithmic Fairness of Statistical Decision Systems",
        summary: "his is a talk that I presented during the final year of my M.Stat. at Indian Statistical Institute, for the PCM Memorial Gold Medal Presentation.",
        date: "2021-08-14",
        organization: "Indian Statistical Institute, Kolkata",
        links: {
            slide: "https://github.com/subroy13/statwiztalks/tree/main/algorithmic-fairness",
            video: undefined
        }
    },
    {
        title: "Review of Robust Location and Scatter Estimators",
        summary: "This is an invited session given to the graduate students of Indian Statistical Insitute, Kolkata in a course on Robust Statistics",
        date: "2022-03-02",
        organization: "Indian Statistical Institute, Kolkata",
        links: {
            slide: "https://github.com/subroy13/statwiztalks/tree/main/multivariate-location-scatter",
            video: undefined
        }
    },
    {
        title: "Causal Inference using DAG Models",
        summary: "Introduction to Causal Analysis using Directed Acylic Graphs (DAG). This is talk prepared as a part of group class project for Categorical Data Analysis course during my M.Stat. in ISI, Kolkata.",
        date: "2019-12-20",
        organization: "Indian Statistical Institute, Kolkata",
        links: {
            slide: "https://github.com/subroy13/statwiztalks/tree/main/causal-dag-intro",
            video: undefined
        }
    },
    {
        title: "Mount Rainier: The Climber's Challenge",
        summary: "A talk regarding a practical case study of different kinds of Regression Analysis. The case study includes modelling success rate of climbing expedition on Mt. Rainier.",
        date: "2019-12-20",
        organization: "Indian Statistical Institute, Kolkata",
        links: {
            slide: "https://github.com/subroy13/statwiztalks/tree/main/mt-rainier-study",
            video: undefined
        }
    },
    {
        title: "tSNE: A way to visualize multidimensional data",
        summary: "This is a talk I gave during the D. Basu Gold Medal Award Ceremony in Indian Statistical Institute, Kolkata.",
        date: "2019-12-13",
        organization: "Indian Statistical Institute, Kolkata",
        links: {
            slide: "https://github.com/subroy13/statwiztalks/tree/main/tsne-visualization",
            video: undefined
        }
    }
];


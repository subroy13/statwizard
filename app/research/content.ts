export const RESEARCH_PAPERS: Array<{
	title: string;
	summary: string;
	authors: string[];
	date: string;
	links: Array<{
		type: "journal" | "arxiv" | "code" | "data",
		detail?: string;
		url: string;
	}>
}> = [
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
    }
];



export const TALKS: Array<{
	title: string;
	summary: string;
	date: string;
	organization: string;
	links: {
		slide?: string;
		video?: string;
	}
}> = [
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


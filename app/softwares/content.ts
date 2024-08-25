export const SOFTWARES: Array<{
	title: string;
	date: string;
	description: string;
	links: {
		source: string;
		dist: {
			label: string;
			url: string;
		},
		downloads?: string;
		license?: {
			type: string;
			url: string;
		},
	},
	badges?: Array<{ imgsrc: string, url: string }>
}> = [
    {
        title: "Chatbot with Seq2Seq model",
        date: "2020-01-10",
        description: "A simple Chatbot with Seq2Seq model with Bahadau Attention Mechanism trained on Cornell Movie Corpus dataset.",
        links: {
            source: "https://github.com/subroy13/seq2seq_attention_bot",
            dist: {
                label: "Installation Instructions",
                url: "https://github.com/subroy13/seq2seq_attention_bot/Readme.md"
            },
        }
    },
	{
	    title: "A simple Text Prediction Application",
	    date: "2018-11-13",
	    description: "A simple text prediction application built for Data Science Specialization in Coursera.",
	    links: {
	    	source: "https://github.com/subroy13/datasciencecoursera/tree/gh-pages/CapstoneProject",
	    	dist: {
	    		label: "Webapp",
	    		url: "https://subroy13.shinyapps.io/TextPredictionSystem/"
	    	}
	    }
	},
	{
        title: "COVID 19 Tracker",
        date: "2020-06-02",
        description: "A Dashboard for Prediction and Control assistance and management of resources in view of Covid-19 pandemic, sponsored by IIM, Vishakhapatnam",
        links: {
            source: "NA",
            dist: {
                label: "Webapp",
                url: "http://covid-tracker.iimv.ac.in:3939/covid/"
            }
        }
    },
	{
        title: "roufcp",
        date: "2020-10-04",
        description: "A python package to perform gradual changepoint detection in a time series data using Rough-Fuzzy set theory",
        links: {
        	source: "https://github.com/subroy13/roufcp",
        	dist: {
        		label: "PyPI",
        		url: "https://pypi.org/project/roufcp/"
        	},
        	downloads: "https://img.shields.io/pypi/dm/roufcp",
        	license: {
        		type: "https://img.shields.io/badge/license-MIT-blue",
        		url: "https://github.com/subroy13/roufcp/blob/master/LICENSE"
        	}
        }
    },
    {
        title: "rsvddpd",
        date: "2021-10-23",
        description: "An R package to perform robust singular value decomposition using minimum density power divergence estimator",
        links: {
            source: "https://github.com/subroy13/rsvddpd",
            dist: {
                label: "CRAN R",
                url: "https://cran.r-project.org/package=rsvddpd"
            },
            downloads: "https://cranlogs.r-pkg.org/badges/rsvddpd",
            license: {
            	type: "https://img.shields.io/badge/license-MIT-blue",
            	url: "https://github.com/subroy13/rsvddpd/blob/master/LICENSE.md"
            }
        }
    },
    {
        title: "Pwdmgr",
        date: "2022-11-20",
        description: "An open source python application for lightweight password management system through console.",
        links: {
            source: "https://github.com/subroy13/pwdmgr",
            dist: {
                label: "Installation Instructions",
                url: "https://github.com/subroy13/pwdmgr/Readme.md"
            }
        }
    },
    {
        title: "callgrind-reader",
        date: "2023-04-18",
        description: "An npm package written in typescript to parse callgrind like files and extract profiling metrics from code",
        links: {
            source: "https://github.com/subroy13/callgrind-reader",
            dist: {
                label: "NPM",
                url: "https://www.npmjs.com/package/callgrind-reader"
            },
            downloads: "https://img.shields.io/npm/dm/callgrind-reader"
        }
    },
    {
        title: "decompy",
        date: "2024-01-13",
        description: "A Python package containing several robust algorithms for matrix decomposition and analysis.",
        links: {
            source: "https://github.com/subroy13/decompy",
            dist: {
                label: "PyPI",
                url: "https://pypi.org/project/decompy/"
            },
            downloads: "https://img.shields.io/pypi/dm/decompy",
            license: {
            	type: "https://img.shields.io/badge/license-BSD3_Clause-green",
            	url: "https://github.com/subroy13/decompy/blob/master/LICENSE"
            }
        },
        badges: [
	        {
                imgsrc: "https://snyk.io/advisor/python/decompy/badge.svg",
                url: "https://snyk.io/advisor/python/decompy"
            },
            {
                imgsrc: "https://raw.githubusercontent.com/subroy13/decompy/master/coverage.svg?dummy=4345432",
                url: "https://github.com/subroy13/decompy"
            }
        ]
    }
];
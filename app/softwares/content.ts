export type ISoftware = {
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
};

export const SOFTWARES: ISoftware[] = [
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



export const SKILLSETS = [
    {
        category: "Data Science",
        items: [
            "https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue",
            "https://img.shields.io/badge/R-276DC3?style=for-the-badge&logo=r&logoColor=white",
            "https://img.shields.io/badge/LaTeX-47A141?style=for-the-badge&logo=LaTeX&logoColor=white",
            "https://img.shields.io/badge/Numpy-777BB4?style=for-the-badge&logo=numpy&logoColor=white",
            "https://img.shields.io/badge/Pandas-2C2D72?style=for-the-badge&logo=pandas&logoColor=white"
        ]
    },
    {
        category: "Frontend Web Development",
        items: [
            "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white",
            "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white",
            "https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E",
            "https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white",
            "https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white",
            "https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white",
            "https://img.shields.io/badge/Hugo-FF4088?style=for-the-badge&logo=hugo&logoColor=white",
            "https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white",
            "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
            "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"
        ]
    },
    {
        category: "Backend Web Development",
        items: [
            "https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white",
            "https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=Streamlit&logoColor=white",
            "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white",
            "https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white",
            "https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=FASTAPI&logoColor=white",
            "https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white",
            "https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white",
            "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white",
            "https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white"
        ]
    },
    {
        category: "Software Architecture",
        items: [
            "https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white",
            "https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"
        ]
    }
];

export const imgList3D = [
    '/images/3darts/Abstract 3.jpg',
    '/images/3darts/Abstract1.jpg',
    '/images/3darts/Assassin_s Creed Syndicate.jpg',
    '/images/3darts/basic-couch.jpg',
    '/images/3darts/Chess_pawn_to_king.jpg',
    '/images/3darts/coffeecup.jpg',
    '/images/3darts/desert.jpg',
    '/images/3darts/fiber-background.jpg',
    '/images/3darts/Fireworks.png',
    '/images/3darts/infinte square.jpg',
    '/images/3darts/simple-chair.jpg',
    '/images/3darts/space-fantasy.jpg',
    '/images/3darts/studytable.jpg',
    '/images/3darts/Woven cube.jpg'
];

export const LECTURE_NOTES = [
    {
        title: "Bachelor of Statistics (B.Stat.) Assignements",
        organization: "Indian Statistical Institute, Kolkata",
        url: "https://github.com/subroy13/bstat-assignments"
    },
    {
        title: "Masters of Statistics (M.Stat.) Assignements",
        organization: "Indian Statistical Institute, Kolkata",
        url: "https://github.com/subroy13/mstat-assignments"
    }
]

export const TUTORIAL_LINKS: Array<{
    label: string;
    description: string;
    links: Array<{ title: string; url: string; }>
}> = [
        {
            label: "Natural Language Processing in R",
            description: "A complete example of a natural language processing project using R. Aims to find the changes in english language for US presidents over time.",
            links: [
                {
                    title: "Text Mining in R",
                    url: "https://subroy13.github.io/party-classification-us-presidents-nlp/chapter1.html"
                },
                {
                    title: "Text Classification in R",
                    url: "https://subroy13.github.io/party-classification-us-presidents-nlp/chapter2.html"
                },
                {
                    title: "Changepoint Analysis of Linguistics in R",
                    url: "https://subroy13.github.io/party-classification-us-presidents-nlp/chapter3.html"
                }
            ]
        },
        {
            label: "Reinforcement Learning",
            description: "An introductory tutorial series for basics of Reinforcement learning. Requires some mathematical background and understanding of Python.",
            links: [
                {
                    title: "Reinforcement Learning Tutorial Series Part 1 to Part 7",
                    url: "https://statwizard.substack.com/t/reinforcement-learning-series"
                }
            ]
        },
        {
            label: "Generative AI",
            description: "An introductory tutorial series for basics of generative AI, without much mathematical requirements",
            links: [
                {
                    title: "Generative AI LLM Series Part 1 to Part 6",
                    url: "https://statwizard.substack.com/t/generative-ai-llm-series"
                }
            ]
        }
    ];

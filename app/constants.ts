import { faFacebookSquare, faGithubSquare, faGitSquare, faGoogleScholar, faInstagramSquare, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-regular-svg-icons"

export const SITE_NAME = "StatWizard"
export const SITE_DESCRIPTION = "Personal website of Subhrajyoty Roy"

export const MAIN_MENU = [
    {
        name: "Home",
        route: "/"
    },
    {
        name: "Research",
        route: "/research"
    },
    {
        name: "CV",
        route: "/cv"
    },
    {
        name: "Collection",
        route: "/collection"
    },
    {
        name: "Contact",
        route: "/contact"
    }
]

export const SOCIAL_MENU = [
    {
        name: "subhrajyotyroy@gmail.com",
        link: "mailto:subhrajyotyroy@gmail.com",
        icon: faEnvelope,
        color: "red-500"
    },
    {
        "name": "Github",
        "link": "https://github.com/subroy13",
        "icon": faGithubSquare,
        "color": "gray-500"
    },
    {
        "name": "LinkedIn",
        "link": "https://www.linkedin.com/in/subroy13",
        "icon": faLinkedinIn,
        "color": "indigo-800"
    },
    {
        "name": "Google Scholar",
        "link": "https://scholar.google.com/citations?user=Gocm0lYAAAAJ&hl=en&authuser=1",
        "icon": faGoogleScholar,
        "color": "sky-600"
    },
    {
        "name": "Instagram",
        "link": "#",
        "icon": faInstagramSquare,
        "color": "pink-800"
    },
    {
        "name": "Facebook",
        "link": "https://www.facebook.com/subroy13/",
        "icon": faFacebookSquare,
        "color": "blue-500"
    }
]
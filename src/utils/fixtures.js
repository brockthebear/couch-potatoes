import * as images from '../assets';

const fixtures = {
    "users": [
        {
            name: "Bruce",
            netflix: true,
            amazon: false,
            hulu: false,
            image: images.image0,
            bio: "I bring the Netflix and you bring the chill.",
        },
        {
            name: "Tony",
            netflix: true,
            amazon: true,
            hulu: true,
            image: images.image1,
            bio: "They call me Holy Tony because I got Netflix, Hulu, and Amazon Prime: The Holy Trinity.",
        },
        {
            name: "Steve",
            netflix: false,
            amazon: true,
            hulu: false,
            image: images.image2,
            bio: "My ex finally realized that I was still using her Netflix login so I'm lookin' to make a trade. Your Netflix login for my Amazon Prime creds.",
        },
        {
            name: "Nick",
            netflix: false,
            amazon: false,
            hulu: true,
            image: images.image3,
            bio: "Anybody looking for a Hulu watching buddy?....Hello? Anybody? Please?",
        },
        {
            name: "Peter",
            netflix: false,
            amazon: true,
            hulu: false,
            image: images.image4,
            bio: "Ya know, Netflix gets all the hype but I'd argue that Amazon Prime has become the top choice as of late. I am definitely not Jeff Bezos.",
        },
        {
            name: "Bucky",
            netflix: true,
            amazon: false,
            hulu: true,
            image: images.image5,
            bio: "I have Netflix and Hulu! Well, my parents have Netflix and Hulu, but same diff. I also live at home with them. I hope that's cool. I'm 13.",
        },
        {
            name: "Logan",
            netflix: false,
            amazon: true,
            hulu: true,
            image: images.image6,
            bio: "I thought this was Tinder 😭",
        },
    ],
};

export default fixtures;

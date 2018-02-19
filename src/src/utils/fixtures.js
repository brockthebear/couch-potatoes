import * as images from '../assets';

const fixtures = {
    "users": [
        {
            name: "Greg",
            netflix: true,
            amazon: false,
            hulu: false,
            image: images.image0,
        },
        {
            name: "Jeff",
            netflix: true,
            amazon: true,
            hulu: true,
            image: images.image1,
        },
        {
            name: "Mark",
            netflix: false,
            amazon: true,
            hulu: true,
            image: images.image2,
        },
        {
            name: "Garrett",
            netflix: false,
            amazon: false,
            hulu: true,
            image: images.image3,
        },
    ],
};

export default fixtures;

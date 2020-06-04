const fil = require('../helper/filtered');

describe('flitered list', () => {
    it('should return true if each element of filtered list sastisfy a given condition', () => {
        let data = [
            {
                bio: "Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
                car_color: "Blue",
                car_model: "Toyota",
                car_model_year: 2007,
                country: "Portugal",
                email: "nnewingja@lulu.com",
                first_name: "NaN",
                gender: "Female",
                id: 3695,
                job_title: "Senior Developer",
                last_name: "Newing",
                _id: "5ed820528f33bd24c9eaaa31",
            }
        ];
        let condition = {
            "id": 1,
            "start_year": 2007,
            "end_year": 2009,
            "gender": "female",
            "countries": [
                "Brazil",
                "Ireland",
                "Egypt",
                "Portugal"
            ],
            "colors": [
                "Green",
                "Violet",
                "Yellow",
                "Blue"
            ]
        }
        const result = fil.filtered(data, condition)[0];
        // expect(result).toEqual({ id: 1, price: 10 }) // won't run if you add more properties to this object. this is to specific
        // expect(result).toMatchObject({ id: 1, price: 10 }) // would run if you add more properties to this object.
        expect(result).toHaveProperty('last_name', "Newing") // if you use a string this won't run.
    })
});




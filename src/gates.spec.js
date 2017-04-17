describe('Gates.js unit tests: ', () => {

    const gates = gatesJs;

    const responseCode = {
        content: {
            foo: true
        },
        statusCode: 200
    };

    var value;

    it('1. Success response and true expression', () => {

        new gates().set(responseCode.statusCode)
            .gate([200, responseCode.content.foo === true], () => {
                value = true;
            })
            .default(() => {
                value = false;
            });

        expect(value).toEqual(true);

    });

    it('2. Whatever response and whatever expression', () => {

        value = undefined;

        new gates().set(responseCode.statusCode)
            .gate([200, responseCode.content.foo === false], () => {
                value = false;
            })
            .gate(["*", "*"], () => {
                value = true;
            })
            .default(() => {
                value = false;
            });

        expect(value).toEqual(true);

    });

    it('3. Whatever response and true expression', () => {

        value = undefined;

        new gates().set(responseCode.statusCode)
            .gate(["*", responseCode.content.foo === true], () => {
                value = true;
            })
            .default(() => {
                value = false;
            });

        expect(value).toEqual(true);

        value = undefined;

    });

    it('4. Susccess response and whatever expression', () => {

        value = undefined;

        new gates().set(responseCode.statusCode)
            .gate([200, "*"], () => {
                value = true;
            })
            .default(() => {
                value = false;
            });

        expect(value).toEqual(true);

    });

    it('5. Susccess response and no expression', () => {

        value = undefined;

        new gates().set(responseCode.statusCode)
            .gate([200], () => {
                value = true;
            })
            .default(() => {
                value = false;
            });

        expect(value).toEqual(true);

    });

});

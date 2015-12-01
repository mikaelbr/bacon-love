export default (Bacon, fieldA, validationA, fieldB, validationB, fieldC, validationC) => {
    const a = fieldA.map(validationA).toProperty(false);
    const b = fieldB.map(value => value ? validationB(value) : true).toProperty(true);
    const c = fieldC.map(validationC).toProperty(false);

    const form = a.and(b).and(c);

    return {
        fieldAValid: a,
        fieldBValid: b,
        fieldCValid: c,
        formValid: form
    };
};
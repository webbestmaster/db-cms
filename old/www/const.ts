/* global BUILD_DATE_H */
/* eslint-disable id-match */

export const selector = {
    appWrapper: '.js-app-wrapper',
};

export const companyName = 'no name of company';

function sayHi() {
    const {log} = console;

    const hiString = `Hi
there!`;

    log(hiString);

    // @ts-ignore
    log('Build date:', BUILD_DATE_H);
}

sayHi();

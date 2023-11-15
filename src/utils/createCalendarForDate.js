import moment from "moment/moment";

export const fnWhatMonthIsIt = (value = '', numDay = 0) => {
    let countDayInMouth, currentYearAndMouthStart, currentYearAndMouthEnd, lastMonthDay;
    const nextMonthDay = [];
    const template = [];

    countDayInMouth = moment(value).daysInMonth();
    currentYearAndMouthStart = moment(value).format('YYYY-MM-[01]');
    currentYearAndMouthEnd = moment(value).format(`YYYY-MM-[${countDayInMouth}]`);
    lastMonthDay = moment(value).subtract(1, 'month').daysInMonth();


    const startDayWeeks = moment(currentYearAndMouthStart).format('E');
    countDayInMouth = (+countDayInMouth) + (+startDayWeeks) - 1;

    while (template.length < startDayWeeks - 1) {
        const result = lastMonthDay - template.length;
        template.push(`${result}end`);
    }

    template.reverse();

    while (template.length < countDayInMouth) {
        ++numDay;
        template.push(numDay);
    }

    const endDayWeeks = 7 - moment(currentYearAndMouthEnd).format('E');
    let counterNextDay = 0;
    while (counterNextDay < endDayWeeks) {
        ++counterNextDay;
        nextMonthDay.push(`0${counterNextDay}-startNextMonth`);
    }

    return [...template, ...nextMonthDay];
}

export const nextMonthBtn = (value) => {
    const convertDateToMonth = moment(value).format('MM');
    const convertDateToYear = moment(value).format('YYYY');
    let flipTheMonth, flipTheYear = 0;
    if (+convertDateToMonth !== 12) {
        flipTheMonth = (+convertDateToMonth + 1).toString();
        if (flipTheMonth.length < 2) {
            flipTheMonth = `0${flipTheMonth}`;
        }
    } else {
        flipTheMonth = '01';
        flipTheYear = (+convertDateToYear + 1).toString();
        return `${flipTheYear}-${flipTheMonth}-01`;
    }

    return `${convertDateToYear}-${flipTheMonth}-01`;
}

export const previousMonthBtn = (value) => {
    const convertDateToMonth = moment(value).format('MM');
    const convertDateToYear = moment(value).format('YYYY');
    let flipTheMonth, flipTheYear = 0;
    if (+convertDateToMonth !== 1) {
        flipTheMonth = (+convertDateToMonth - 1).toString();
        if (flipTheMonth.length < 2) {
            flipTheMonth = `0${flipTheMonth}`;
        }
    } else {
        flipTheMonth = '12';
        flipTheYear = (+convertDateToYear - 1).toString();
        return `${flipTheYear}-${flipTheMonth}-01`;
    }
    return `${convertDateToYear}-${flipTheMonth}-01`;
}

export const resetDateBtn = () => {
    return moment().format('YYYY-MM-DD');
}

import moment from "moment";
const fnWhatMonthIsIt = (value = moment(), numDay = 0) => {
    let dayInMouth = '';
    const template = [];
    if (!value) {
        const whatIsYear = value.format('YYYY');
        const whatIsMouth = value.format('MM');
        dayInMouth = moment(`${whatIsYear} ${whatIsMouth}`).daysInMonth();
    } else {
        dayInMouth = moment(value).daysInMonth();
    }

    while (template.length < dayInMouth) {
        ++numDay;
        template.push(numDay)
    }
    return template;
}
export const Calendar = () => {
    const dayInMouth = fnWhatMonthIsIt();

    return (
        <div>
            {dayInMouth.map(ele => {
                return (
                    <div>
                        <p>{ele}</p>
                    </div>
                )
            })}
        </div>
    )
}
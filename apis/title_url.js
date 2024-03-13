import getTitleAtUrl from 'get-title-at-url';

const url = "https://stackoverflow.com/questions/25225964/is-there-a-way-to-focus-on-a-specific-tab-in-chrome-via-plugin"
const {title} = await getTitleAtUrl(url);

console.log(title);

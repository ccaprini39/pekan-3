//I need a regular expression that takes things in,
//verifies that it doesn't have any characters other than letters, numbers, spaces, and dashes
//and then returns true or false
export function isValidTitle(title: string) {
  const regex = /^[a-zA-Z0-9\s-]*$/;
  return regex.test(title);
}

const shouldPass = [
  'hello',
  'hello world',
  'hello-world',
  'hello world-123'
]

const shouldFail = [
  'hello!',
  'hello@world',
  'hello world!',
  'hello-world@123'
]

function testIsValidTitle() {
  shouldPass.forEach((title) => {
    console.log(isValidTitle(title) === true);
  })
  shouldFail.forEach((title) => {
    console.log(isValidTitle(title) === false);
  })
}

//DateFormat
//validates that a date is in the format of ddMMMyyyy
//where dd is the day in numbers between 01 and 31, 
//MMM is the month (in three letters, the first being capitalized, and the rest being lowercase),
//with the only valid months being Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
//and yyyy is the year (in four numbers)
export function isValidDate(date: string) {
  const regex = /^(0[1-9]|[12][0-9]|3[01])(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\d{4}$/;
  return regex.test(date);
}

const shouldPassDate = [
  '01Jan2042',
  '31Dec2042'
]

const shouldFailDate = [
  '32Jan2042',
  '01jan2042',
  '01Jan42',
  '01Jan204'
]

function createUUID() : string {
  const uuid = crypto.randomUUID();
  return uuid;
}

//takes in a title string, replaces the whitespaces with dashes and appends a uuid to the end of the string
export function encodeTitle(title: string) {
  const uuid = createUUID();
  const baseString = title.split(" ").join("-");
  return `${baseString}-${uuid}`;
}

export function decodeTitle(title: string) {
  const split = title.split("-").join(" ");
  //the uuid is the last 36 characters of the string
  return split.slice(0, -36); 
}
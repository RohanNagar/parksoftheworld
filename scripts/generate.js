const fs = require("fs");

const parks = require('../data/parks.json');
const template = fs.readFileSync('template.html').toString();
const imageDivTemplate = '<div class="col-12 col-md-6 col-lg-4"><img src="%IMG_URL%" class="img-fluid img-thumbnail" /></div>'
const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });

parks.forEach(park => {
  console.log("Generating page for park: " + park.name);

  // Normalize data
  let name = park.name;
  let established = park.established ? park.established : 'Unknown';
  let countryCode = park.country;
  let country = countryNames.of(countryCode);
  let description = park.description;
  let homepage = park.url;
  let size = park.size ? park.size : 'Unknown';
  let sizeUnit = park.size_unit ? park.size_unit : '';
  let visitorCount = park.visitor_count ? park.visitor_count : 'Unknown';
  let color = park.color ? park.color : '#313437';
  let latitude = park.latitude;
  let longitude = park.longitude;

  let imageUrls = park.images ? park.images : [];

  var images = '';

  imageUrls.forEach(image => {
    images += imageDivTemplate.replaceAll('%IMG_URL%', image);
  });

  let pageHtml = template
    .replaceAll('%PARK_NAME%', name)
    .replaceAll('%PARK_DESC%', description)
    .replaceAll('%ESTABLISHED%', park.established)
    .replaceAll('%COUNTRY%', country)
    .replaceAll('%COUNTRY_CODE%', countryCode.toLowerCase())
    .replaceAll('%PARK_URL%', homepage)
    .replaceAll('%SIZE%', size)
    .replaceAll('%SIZE_UNIT%', sizeUnit)
    .replaceAll('%VISITOR_COUNT%', visitorCount)
    .replaceAll('%IMAGE_DIVS%', images)
    .replaceAll('%HEX_COLOR%', color)
    .replaceAll('%LATITUDE%', latitude)
    .replaceAll('%LONGITUDE%', longitude);

  let directory = '../parks/' + countryCode.toLowerCase()
  let filePath = directory + '/' + name.toLowerCase().replaceAll(' ', '-') + '.html';

  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(filePath, pageHtml);
});

var frisby = require('frisby');
frisby.create('Check how many files we have in repository')
  .get('http://lgajda:FtmRgUwmvCLj1ayYyFnE@46.242.130.58:8084/Thingworx/Things/TWxPDataExportRepository/Services/BrowseDirectory?method=post&path=/&Accept=text/json')
    .expectStatus(200)
.toss();
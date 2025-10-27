//Load playwright test module
import { test, expect } from '@playwright/test';
import playwrightApiMatchers from 'odottaa';
expect.extend(playwrightApiMatchers);

const bookingAPIRequestBody = require('../../test-data/post_requests_body.json');


//Wright test
test('Create POST API Request using static JSON file', async ({ request }) => {
  
  //Create post request
  const postApiResponse = await request.post('/booking', {
    data: bookingAPIRequestBody
  })

  //Validate status code
  expect(postApiResponse.ok()).toBeTruthy();
  expect(postApiResponse.status()).toBe(200);

  const postApiResponseBody = await postApiResponse.json();
  console.log(postApiResponseBody);

  //Validate response body
  expect(postApiResponseBody.booking).toHaveProperty('firstname', 'Testers');
  expect(postApiResponseBody.booking).toHaveProperty('lastname', 'Stevie');

  //Validate nested JSON object
  expect(postApiResponseBody.booking.bookingdates).toHaveProperty('checkin', "2019-02-15");
  expect(postApiResponseBody.booking.bookingdates).toHaveProperty('checkout', "2020-01-01");
  expect(postApiResponse).toHaveHeader('content-length', '205');
  expect(postApiResponse).toHaveHeader('content-type', 'application/json; charset=utf-8');

});




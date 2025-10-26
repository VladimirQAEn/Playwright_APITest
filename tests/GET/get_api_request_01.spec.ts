//Load playwright test module
import { test, expect } from '@playwright/test';
import {stringFormat} from '../../untils/common';
import fs from 'fs';
import path from 'path';

const bookingAPIRequestBody = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../..', 'test-data', 'post_dynamic_requests_body.json'), 'utf8')
);

//Wright test
test('Create GET API Request in playwright', async ({ request }) => {
  
  const dynamicRequestBody = stringFormat(JSON.stringify(bookingAPIRequestBody), "Testers_dynamic_file","Stevie_dynamic_file","strong");

  //Create post request
  const postApiResponse = await request.post('/booking', {
    data: JSON.parse(dynamicRequestBody)
  })

  //Validate status code
  expect(postApiResponse.ok()).toBeTruthy();
  expect(postApiResponse.status()).toBe(200);

  const postApiResponseBody = await postApiResponse.json();
  const bId = await postApiResponseBody.bookingid;
  console.log(postApiResponseBody);

  //Validate response body
  expect(postApiResponseBody.booking).toHaveProperty('firstname', 'Testers_dynamic_file');
  expect(postApiResponseBody.booking).toHaveProperty('lastname', 'Stevie_dynamic_file');
  expect(postApiResponseBody.booking).toHaveProperty('additionalneeds', 'strong');

  //Validate nested JSON object
  expect(postApiResponseBody.booking.bookingdates).toHaveProperty('checkin', "2019-02-15");
  expect(postApiResponseBody.booking.bookingdates).toHaveProperty('checkout', "2020-01-01");

  console.log('====================');

  //GET call to verify data
  const getApiResponse = await request.get(`/booking/${bId}`);
  console.log(await getApiResponse.json());

  //Validate GET status code
  expect(getApiResponse.ok()).toBeTruthy();
  expect(getApiResponse.status()).toBe(200);  

});




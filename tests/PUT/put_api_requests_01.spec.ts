//Load playwright test module
import { test, expect } from '@playwright/test';
import {stringFormat} from '../../untils/common';
import fs from 'fs';
import path from 'path';

const tokenAPIRequestsBody = require('../../test-data/token_requests_body.json');
const putAPIRequestsBody = require('../../test-data/put_requests_body.json');

const bookingAPIRequestBody = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../..', 'test-data', 'post_dynamic_requests_body.json'), 'utf8')
);

//Wright test
test('Create PUT API Request in playwright', async ({ request }) => {
  
    const dynamicRequestBody = stringFormat(JSON.stringify(bookingAPIRequestBody), "Testers_dynamic_file","Stevie_dynamic_file","strong");

    console.log('===POST API====');

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

    console.log('===GET API====');

    //GET call
    const getApiResponse = await request.get(`/booking/${bId}`);
    console.log(await getApiResponse.json());

    //Validate GET status code
    expect(getApiResponse.ok()).toBeTruthy();
    expect(getApiResponse.status()).toBe(200);
    
    //Generator token
    const tokenApiResponse = await request.post('/auth', {
      data: tokenAPIRequestsBody
    });
    const tokenApiResponseBody = await tokenApiResponse.json();
    const token = await tokenApiResponseBody.token;
    console.log('Token:', token);

    
    console.log('===PUT API====');

    //PUT call
    const putApiResponse = await request.put(`/booking/${bId}`, {
      data: putAPIRequestsBody,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      }
    });

    //Validate PUT status code
    expect(putApiResponse.ok()).toBeTruthy();
    expect(putApiResponse.status()).toBe(200);
    
    const putApiResponseBody = await putApiResponse.json();
    console.log(putApiResponseBody);

});




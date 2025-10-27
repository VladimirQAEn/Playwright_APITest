//Load playwright test module
import { test, expect } from '@playwright/test';
import playwrightApiMatchers from 'odottaa';
expect.extend(playwrightApiMatchers);
import Joi from 'joi';

const bookingAPIRequestBody = require('../../test-data/post_requests_body.json');


//Wright test
test('Create POST API Request using static JSON file(check schema)', async ({ request }) => {
  
  //Create post request
  const postApiResponse = await request.post('/booking', {
    data: bookingAPIRequestBody
  })

  //Validate status code
  expect(postApiResponse.ok()).toBeTruthy();
  expect(postApiResponse.status()).toBe(200);

  const postApiResponseBody = await postApiResponse.json();
  console.log(postApiResponseBody);

  //Validate schema body
  const schemaJsonBody = Joi.object({
    bookingid: Joi.number().required(),
    booking: Joi.object({
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      totalprice: Joi.number().required(),
      depositpaid: Joi.boolean().required(),
      bookingdates: Joi.object({
        checkin: Joi.date().iso().required(),
        checkout: Joi.date().iso().required()
      }).required(),
      additionalneeds: Joi.string().required(),
    }).required()
  });

  expect (Joi.assert(postApiResponseBody, schemaJsonBody));

  //const { error } = schemaJsonBody.validate(postApiResponseBody);
  //expect(error).toBeUndefined();

});




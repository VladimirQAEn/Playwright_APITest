//Load playwright test module
import { test, expect } from '@playwright/test';

//Wright test
test('Create POST API Request using static request body', async ({ request }) => {
  
  //Create post request
  const postApiResponse = await request.post('/booking', {
    data: 
    {
        "firstname": "Testers",
        "lastname": "Stevie",
        "totalprice": 235,
        "depositpaid": false,
        "bookingdates": 
        {
            "checkin": "2019-02-15",
            "checkout": "2020-01-01"
        },
        "additionalneeds": "super bowls"
    }

  });  

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


});




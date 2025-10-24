//Load playwright test module
import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';
import { DateTime } from 'luxon';



//Wright test
test('Create POST API Request using dynamic request body', async ({ request }) => {
  
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalprice = faker.number.int(1000);
  const checkinDate = DateTime.now().toFormat('yyyy-MM-dd');
  const checkoutDate = DateTime.now().plus({days:7}).toFormat('yyyy-MM-dd');

  //Create post request
  const postApiResponse = await request.post('/booking', {
    data: 
    {
        "firstname": firstName,
        "lastname": lastName,
        "totalprice": totalprice,
        "depositpaid": false,
        "bookingdates": 
        {
            "checkin": checkinDate,
            "checkout": checkoutDate
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
  expect(postApiResponseBody.booking).toHaveProperty('firstname', firstName);
  expect(postApiResponseBody.booking).toHaveProperty('lastname', lastName);

  //Validate nested JSON object
  expect(postApiResponseBody.booking.bookingdates).toHaveProperty('checkin', checkinDate);
  expect(postApiResponseBody.booking.bookingdates).toHaveProperty('checkout', checkoutDate);


});




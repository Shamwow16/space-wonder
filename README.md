## About 

This is my submission for the CarAdvise Code Challenge. It is a single page application built in React 16 that uses the current location of the International Space Station (ISS) to display the closest image to that location which has been captured by NASA's Earth Polychromatic Imaging Camera (EPIC). 

For more information about EPIC, please visit EPIC's [homepage](https://epic.gsfc.nasa.gov/about/epic)



## Local Setup 

### Environment Variable
To generate a NASA API Key for yourself, please visit https://api.nasa.gov/ and enter your personal information to generate an API key. This API Key is then used to make any subsequent requests.

The API Key used for the EPIC Blue Marble API is being stored as an environment variable for security purposes. 
After cloning the repo, please create a `.env` file in the project root directory and set your NASA API Key as the value for `REACT_APP_NASA_API_KEY`.


In the project directory, please run:

### `npm install` 

Once the installation command is completed, you may start the server using:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.<br />



## APIs used
1) [ISS Current Location API](http://open-notify.org/Open-Notify-API/ISS-Location-Now/)
2) [EPIC Daily Blue Marble API](https://epic.gsfc.nasa.gov/about/api)

## Notes/Caveats
1) The distance between two sets of latitudes/longitudes is being calculated using the Haversine formula. For more information about the formula, please refer to the [Wikipedia page](https://en.wikipedia.org/wiki/Haversine_formula#:~:text=The%20haversine%20formula%20determines%20the,and%20angles%20of%20spherical%20triangles.). 


2) The EPIC API only returns a limited number of images for a given day. Because there are fewer images, it will use the same image for a longer period of time while the ISS is moving because the next closest image is more likely to be the previous image with a smaller dataset. In order to get a larger dataset, we are fetching image metadata for multiple days. Currently, the app has been configure to fetch image metadata for the past week, but this can be made configurable in a future enhancement.

## Future feature enhancement
As part of feature enhancement, it would be great to make the image metadata set more configurable. The app defaults to the past week but it would be cool to have a toggle in the UI that allows us to process more metadata. 
# EC463 SW Mini Project Report
### Alex Necakov & Kevin Lim

## Framework: React with Expo
Choosing a framework was our first design decision in the mini-project. We ended up using React and using Expo to deploy our app to our phones. This decision was made as we wanted to use the React framework due to the immense amount of third party libraries and documentation provided for the framework, as well as being somewhat familiar with Javascript and Typescript, React giving us the option of programming in either. Both of us had iPhones to test code on, and having one Windows and one OSX computer to develop with. This set-up lead us to choose Expo as it allowed us to deploy to iOS from Windows unlike React-Native.

## Language: Typescript
Though React gave us the option of using either Javascript or Typescript, we chose to do the majority of development in Typescript. As neither of us were very familiar with React to start off, we based our code off of the Multi-Tabbed template Expo provides when creating a new project. This template included Stack and BottomTab navigators, which we went through and reverse-engineered partway through the project. The Multi-Tabbed template happened to be in Typsecript, and neither of us having a preference for JS over TS, we stuck with Typescript for consistency.

## Cloud Service: Firebase

## UI Design/App Flow
Working in React Typescript had our UI development integrated very closely with our backend development. Our final design consists of three main screens: 
 - Scan 
 - Recipes
 - Login 
 
 as well as a Modal screen that pops-up to display nutrition information after a barcode is scanned. 
### Scan Screen
The scan screen is the first screen displayed when opening the app. It consists of a simple welcome message and large button in the center to Start Scanning. This screen was built very early on in development, and prodivded us a playground to begin experimenting with interface componenets from the react-native package. When the button is pressed, the welcome message and button are replaced with a camera display, and after camera access is granted, will display the camera feed. The camera was originally implemented using the expo-camera package, but we found that expo-barcode-scanner allowed us to retrieve the barcode without having to implement it ourselves. When the barcode is scanned, the user is taken to our Modal screen to display the nutrition data.
### Modal/Nutrition Data Screen
When brought up, the modal screen slides over top of the Scan Screen and can be slid back down to reveal the Scan Screen again. The modal screen displays the following data:
 - Food Name
 - Calories per serving
 - Serving size (with units)

Also on the screen are an input box to change the serving size (that is currently disabled) and a button to upload the data to Firebase. Other nutrients were considered to be included on this screen, but we only left calories in the final product. We had been trying to implement a table to include the whole nutrient list from the FDC REST call but had trouble converting the JSON object into a full table. With another few days this could be implemented, but we decided to focus on core functionality over reporting additional data for this project's timeframe.
### Recipes Screen
This tab would've held user recipes/a history of foods that the user has scanned. We did not have enough time to implement this feature, but the tab remains as part of our UI design to build towards.
### Login Screen

## FDC REST API Access
Behind the scenes, we successfully were able to implement access to the FDC REST API in our app. When barcodes are scanned in the scan tab, the barcode (UPC code) is passed along to the modal screen. However, the barcode scanner package we used interpreted most barcodes in a different barcode format than UPC, which pads the beginning of the barcode with an extra zero. We strip this leading zero when passing the barcode into the fetch request in order to do a search off of the UPC code. The FDC API uses FDIC IDs as its primary key, so we cannot directly look up a food without knowing the ID, and must do a search off of the UPC code, as that is a field within each food object. We decided to make this a GET instead of a POST request as we didn't need to send any information to the server, and just wanted to pull the result as a JSON object. When the search gets a match with a food in the database, we are able to grab the name, calories, FDC IDetc. but not the serving size of the food. In order to be able to find serving size, we had to use the FDC ID of the food found from the search, and directly lookup the food in the database. This direct lookup contains the serving size information we needed. Hooks were used to store the JSON object data in, allowing us to display the values of the information from the database in the view.

## GitHub Project Organization
We made full use of many of the project management tools available through GitHub during the course of this mini-project. We used branches for asynchronous code development, Issues for bug/feature tracking, a projects board for our Sprints/Agile development, set up Secrets, and Actions to test compilation. We couldn't quite test builds in GitHub Actions due to using expo for deployment, but still used it to verify nothing went horribly wrong with our codebase after each commit.
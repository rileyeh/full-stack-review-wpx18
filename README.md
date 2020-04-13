# Welcome to Ticket Tracker

## Monday 
On Monday, we went through the planning docs, which I'll send to you later. We also set up the server and our register endpoint function in the authentication controller. I rounded out the functionality for logging in and logging out.

In the package.json, you'll notice a nodemonConfig property with an object as the value. We can give this object an ignore array and tell it to ignore certain folders/files. With the way I currently have it set up, the nodemon process will ignore the files in your src and public folders. That means that when you save components, nodemon will not restart. It will only restart when you save changes in the backend. 

If you fork and clone this, don't forget to run ```npm i``` (and take a look at the package.json to see what dependencies we are working with) and also create your own ```.env``` file. 

## Tuesday

## Wednesday
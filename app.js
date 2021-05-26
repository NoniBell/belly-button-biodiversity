// Activity 6 has sorted, sliced horizontal bar plots 
// and there is a horizontal bar plot in the homework
// The homework also has a standard scatter plot
// Activity 8 will have some helpful info about how to use the dropdown for your homework.
// Also, Day 1 Activity 3 shows how to append HTML and data to the HTML.  
// You will need to do something similar to populate your dropdown in the homework 
// and to make the small meta-data table/list in the homework
                //HOW TO DEPLOY TO GITHUB
//go to settings tab on repo page
//go to "pages" on left side
//make sure branch is main
//save
//it'll take a couple minutes to launch the page


//read and log the samples.json
const samples = d3.json("samples.json");
console.log(samples);

//create horizontal bar chart

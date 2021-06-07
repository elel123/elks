# README CONTENTS

## Site URL:
http://reporting.elks.codes/ (goes to our landing page)

## You can access the user CRUD grid here:
http://reporting.elks.codes/admin

Login using the admin account and click on "Admin" in the navbar.


## Login Info for Grader
### Basic Level Grader Account:
Email   : regUser
Password: grader

### Admin Level Grader Account:
Email   : grader
Password: grader

## Design Decisions

### Authentication

For user creation, we stored all login information (username and password) inside our MongoDB database. However, for our passwords, we used the bcrypt library to generate a salt hash and we stored that instead of the password itself. We went with this decision because of the convenience that the library provides in helping create the hashes.

For user authentication, we decided to use JSON Web Tokens (JWT) to keep track of whether or not users are logged in and whether or not users have admin privileges (in the JWT’s payload). Because of this decision, the server doesn’t have to store any session information in the database, but rather just verify if an incoming token is valid against the accounts currently stored. We initially felt this was not a very secure way of authentication and looked towards other options, such as passport.js. However, after hearing one of our group members experience using JWT, we felt JWT was a good choice to move forward with, as it is simpler.

To give a quick overview of the authentication flow, when a user logs in, the server sends back a JWT, with admin privileges encoded within it if the account is an admin account. The client would store the JWT within their local storage for the entire duration of the session and would use this JWT to access the dashboard/admin data to display. The JWT gets removed from localStorage if the user clicks logout, so if the user were to just close the window, the session would remain active the next time they open the window (up to when the JWT expires).

### Dashboard README

For the first chart, the metric displayed was the most popular pages by activity count. We used a bar chart to display the 5 most popular pages (showing their path and total activity count), because bar charts are a strong option for displaying categorical data (ie. number of activities per page). Since elks.codes does not have a lot of pages, displaying the five most popular pages should be enough (after that, the number of activities per page drop off). This data is important since it's useful in gauging which pages are most interesting or useful to its visitors.

For the second chart, the metric displayed is the number of unique users over the past 7 days. We used a line chart to track the unique user count over the past week. We felt a line chart was appropriate because it helps show quantitative data over time. We used unique session ids to identify users. This data is important because it gives a good indication of recent website traffic and how often people visit.

For the third chart, the metric displayed page load length. We wanted to see the distribution of page load lengths (plotting the frequency of each page load length). We used a histogram to display the data, since histograms are good at displaying single continuous data (as opposed to categorical data in bar charts). This data would be important to make sure that users aren’t taking forever to load a page. This chart can help us keep track of whether or not the majority of the pages load within an acceptable range.

### Report

We decided to focus on the metric activity per page, as it seems like a metric that would be very useful in the long term maintenance of the site. Particularly, it could yield insight into the pages that hold the most graviation to users and why, as well as conversely detail the pages that hold the least amount of weight. Long term, this would provide valuable insight into what additional features uses might appreciate and where, give some sort of baseline to which pages should be cut or at the very least refactored, and of course provide some background on which pages would render the most amount of ad revenue if such placement was desired.

In conjunction with the aforementioned reasoning, we wanted to answer the following question in context of the analyzed metric: “Which site pages traffic the most amount of user activity?”. In order to answer this question, we created three visualizations on the data we had collected from elks.code - our main site.

In the bar chart visualization (Vis1), since the main site has quite a few pages, we restricted ourselves to the top 5 pages, and opted to utilize a bar chart for easier comparison purposes. As the pages themselves represent categorical data (page urls), utilizing a bar graph allowed for easy insight on the relative ranking of the pages, as well as the absolute numerical differences between the pages.

While Vis1 strived to give a bird eye’s comparison of the pages, the second visualization (Vis2) instead focused on giving a breakdown of each page itself, emphasizing where specifically the activity in the page came from. Due to the nature of how we collected our data in HW3, the possible activity types came from one of the following four categories: mouse, idle, navigation, and keyboard. For simplicity sake, we stuck with these broad umbrella terms instead of narrowing down further into types of keystrokes, or specific buttons that were clicked. However, we acknowledge that these additional breakdowns would also be invaluable, especially if visualized as a heat map of the page in terms of user activity. To visually represent Vis2, we leveraged a pie chart, as our focus was on page breakdown in terms of activity composition. A pie chart gave an intuitive way to see which activity types took up bigger “slices” of data than the others, and by how much. Particularly, this time we provided breakdowns for the top 3 pages from Vis1, instead of all top 5.

The third visualization (Vis3) focused more on an elaboration of the raw data itself, and less on its visualization. The data was thereby represented in a grid format, namely a table that contained all information logged for each instance of activity data. This allowed for an exploration of further details that might have been missed in the first two visualizations, such as the type of keystrokes used, the specific keys hit, the quantified seconds of idleness of the user, and the page that was navigated to.


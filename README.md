**News Web Application**

This project is a news web application that integrates with the Nezavisne Novine API to display news content, allow user comments, and track application usage statistics.

**Tech Stack**

**• Frontend**: React

**• Backend**: Spring Boot

**• Database**: MySQL

**• Reverse Proxy**: Nginx

**• Authentication**: JWT with Refresh Tokens

**Features**

**1. Menu Management**:

  Fetch the main menu structure from the Nezavisne Novine API.

  Display categories and subcategories in a horizontal navigation bar.

**2. Homepage**:

  Load the main page content with news using the https://dtp.nezavisne.com/app/v2/naslovna endpoint.
  
**3. Category View**:

Display a list of news articles for each category and provide links to subcategories.

The content for each category is fetched from https://dtp.nezavisne.com/app/rubrika/{categoryID}/{pageNumber}/{newsCount}.

**4. Subcategory View**:

After selecting a category, users can select a subcategory to view a list of news articles.

The content for subcategories is fetched from https://dtp.nezavisne.com/app/podrubrika/{subcategoryID}/{pageNumber}/{newsCount}.

**5. News View**:

After selecting a news article, the full article is displayed.

The article content is fetched from https://dtp.nezavisne.com/app/v2/vijesti/{newsID}.

**6. Comment System**:

Users can post comments on news articles.

Comments can also have replies (nested comments).

Comments are immediately visible after submission and do not require authentication.

A simple nickname input is required for posting comments.

Usage Statistics:

Track user interactions with the application.
Collect attributes such as:
Date and time of use
Visitor's IP address
Browser and operating system details
Country and city of the visitor
Category, subcategory, and news article information
Display the statistics for the last 7 days with graphical charts (e.g., pie charts, bar charts).
Track the top 10 most commented news articles and provide links to view them.


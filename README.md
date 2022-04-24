RSS Feeds reader

This project aims to develop an RSS feeds reader.

Use cases :
    Get the RSS feeds from LeMonde : https://www.lemonde.fr/rss/en_continu.xml
    Print them like a list with picture and extract
    Edit the title
    Edit the extract

Tools used :
    Code :
        HTML5, CSS3 and Angular 13 for the front-end
        REST API to communicate with the backend
        NodeJs 16.14.2 for the backend
        MongoDB for the persistence layer
    IDE :
        Visual Studio Code
    SCM :
        Git/GitHub
    Test API :
        Postman

Setup :
    Install NodeJs via download
    Install Angular CLI : npm install -g @angular/cli
    Run the angular server to build and serve the app : ng serve -o
    Run NodeJs backend file in the rss-backend directory : node index.js
    Install Express via npm : npm install express
    Install MongoDB via npm : npm install mongodb

Run the app :
    Run the angular code on the folder rss-app-reader: ng serve -o
    Run the NodeJs code on the folder rss-backend: node index.js
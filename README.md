Tic-Tac-Toe with AI.

(Note: Please wait a few seconds for Heroku to load because I am on the free plan)

## Instructions to Run Locally

In the project directory, run:

### `npm start` to start the Express Server

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Introduction & Context

My final project as a freshman was to create tic-tac-toe. Built and played on the terminal, it was a functional, but ugly game. 3 years later, I was inspired to revisit that project and to make it better based on what I've learned since then. I decided to  go with a React front-end because React is popular, fast and simple. I also decided to implement the minimax algorithm in game theory so that the computer could make the best choice for each move resulting in the computer either winning or tying the user.

<p align='center'>
<img src='https://github.com/kevinho6/Xs-and-Os/blob/master/Screenshots/Site.png' alt='Site'>
</p>

## Walkthrough

The site consists of a single page that contains the game board and the statistics portion. The statistics indicate how many times users have tied or lost against the computer since the inception of this project. The site follows a minimalist design to contradict the way modern games have stolen our attention by bombarding us with unnecessary details. The user is intended to play in either a normal fashion as a stress-reliever, or in a passive manner as they accept the fact that they will never be able to beat the computer and contemplate the rising sophistication of AI.

<p align='center'>
<img src='https://github.com/kevinho6/Xs-and-Os/blob/master/Screenshots/Game.png' alt='Game'>
</p>

## User Feedback

For this project I started out by building the backend instead of the front-end. Because of this the user feedback that my demo prompted was limited. However, the feedback that I did receive was extremely helpful. Sumaia mentioned that she liked my simple site design which was refreshing to hear as it helped guide me to my site philsophy of mindfulness. More feedback that I received was that it wasn't clear that this is game against an AI instead of regular tic-tac-toe. That feedback gave me the idea of implementing the statistics portion to let the user know that without explicitly stating it. The overall statistics also serve to make the players think about the idea of collective intelligence, how other players have played against this computer and also lost, instead of thinking about each game from an individual perspective.

<p align='center'>
<img src='https://github.com/kevinho6/Xs-and-Os/blob/master/Screenshots/Statistics.png' alt='Statistics'>
<img src='https://github.com/kevinho6/Xs-and-Os/blob/master/Screenshots/StatisticsJSON.png' alt='StatisticsJSON'>
</p>


## Code Overview

I started this code from Create React App. From there I loosely followed the tutorial in the resource section for a quick refresher on the different React concepts such as unidirectional data flow, lifecycle methods, props and state. The front-end is served from a Webpack Development Server running on port 3000. After I had this baseline code, I added an Express server that ran on port 8080. This express server contains two routes: a route for GET and PUT requests. The GET request route serves up the statistics data (ties and losses) stored in the file stats.json. The PUT request looks at the URL route parameter and determines whether it should add a tie or a loss to the statistics data. The routes then return the data to the front-end to be displayed to the user. After I had the game and the statistics, I added the AI portion by adding the Minimax function which recursively tries every possible move and returns the best move that the computer can make in order to win. Because the tutorial was for a player vs. player tic-tac-toe I had to modify a good portion of the code to make it player vs. computer. Lastly, I ran some tests, encountered some bugs, fixed them and ultimately deployed the project to Heroku. To deploy this project I created a production build using `npm run build` and served the static files from the Express server.

<p align='center'>
<img src='https://github.com/kevinho6/Xs-and-Os/blob/master/Screenshots/API.png' alt='API'>
<img src='https://github.com/kevinho6/Xs-and-Os/blob/master/Screenshots/Minimax.png' alt='Minimax'>
</p>

## Closing Comments

Overall, I'm satisfied with the results of this project. Along the way I definitely had difficulty deploying it due to the confusion of managing the two servers. My only wish for this project is that I had more time (as is the case for every project). If I did I would optimize the AI algorithm by making it more efficient. I would also provide the user the ability to change the design of the game. Lastly, I would save the statistics data into a database instead of overwriting a file because Heroku does not allow for file changes.

## Resources

Boilerplate Code

https://github.com/facebook/create-react-app

Starter Tutorial

https://reactjs.org/tutorial/tutorial.html

Minimax Algorithm

https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37 

https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/

Deployment

https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/

https://dev.to/loujaybee/using-create-react-app-with-express

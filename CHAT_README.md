<!-- src/redux/reducers/ChatSlice -->

- holds the current state of the chat in Redux
  - possibly just have the frontend talk with the backend and grab chat log w/o putting into redux

<!-- src/pages/ChatRoomPage -->

- useEffect

  - on page render, user will connect to a new websocket
    - set the websocket variable to a state
    - server will send a message which triggers onmessage

- onMessage

  - will dispatch a reducer that sets the servers message to redux messages state
  - will dispatch a reducer that sets the chatlog from redis to redux messages state

- sendText
  - dispatch a createAsyncThunk function that sends the new message and pushes to Redis
  - sends the message to the server
  - onMessage fires off again
    - currently the onMessages is firing every time sendText is triggered which causes the backlog to re populate and push into redux state again (FIX)

<!-- backend/chat/consumers -->

- holds the server logic
  - uses Django Channels

<!-- backend/chat/views -->

- POST

  - saves the messages to Redis

- GET
  - retreives all the messages based on the specific room

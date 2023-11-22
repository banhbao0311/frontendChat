import logo from './logo.svg';
import './App.css';
import Pusher from 'pusher-js';
import { useState } from 'react';


function App() {
  const [user1, setUser1] = useState('');
  const [user2, setUser2] = useState('');
  const [messages, setMessagess] = useState([]);
  const [message, setMessage] = useState('');
  let allMessages = [];

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(user1);
    console.log(user2);
    
    let name = `${user1}${user2}`.split("").sort().join('');
    
    console.log(name);


    Pusher.logToConsole = false;

    var pusher = new Pusher('014b8eb7bfaf79153ac0', {
      cluster: 'ap1'
    });
    // var channel = pusher.subscribe(`${user1}${user2}`);
    var channel = pusher.subscribe(name);

    channel.bind('my-event', function (data) {
        allMessages.push(data);
        setMessagess(allMessages);
        console.log('messages', messages);


    });

    await fetch('http://127.0.0.1:8000/api/sendMessage',{
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({        
        user1,
        user2,
        message        
      })
    })

    setMessage('');
  }

  return (
    <div className="App">
      <form onSubmit={e => handleSubmit(e)}>
        User:<input value={user1} onChange={e => setUser1(e.target.value)} />
        To <input value={user2} onChange={e => setUser2(e.target.value)} />
        <div style={{ height: '500px' }}>
            {messages.map(message => {
              return (
                <div>
                  {user1}: 
                  {message.message}
                  </div>
              )
            })}

        </div>
        Message<input value={message} onChange={e => setMessage(e.target.value)} />
        <input type='submit' />
      </form>
    </div>
  );
}

export default App;

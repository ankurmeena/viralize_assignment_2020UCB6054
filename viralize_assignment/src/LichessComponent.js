// LichessComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LichessComponent = () => {
  const [topPlayers, setTopPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchUsername, setSearchUsername] = useState('');
  const perfType = 'bullet'; // Replace with the desired game variant (e.g., 'bullet', 'blitz', 'rapid')
  const nb = 10; // Number of top players to fetch

  // Task 1: Fetch and Display Top Variant Players
  useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        const response = await axios.get(`https://lichess.org/api/player/top/${nb}/${perfType}`);
        console.log('Top Variant Players:', response.data.users);
        setTopPlayers(response.data.users);
      } catch (error) {
        console.error('Error fetching top players from Lichess API:', error);
        console.error('Response status:', error.response?.status);
        console.error('Response data:', error.response?.data);
      }
    };

    fetchTopPlayers();
  }, [nb, perfType]);

  // Task 2: Search Functionality
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://lichess.org/api/user/${searchUsername}`);
      console.log('Selected player data:', response.data);
      setSelectedPlayer(response.data);
    } catch (error) {
      console.error('Error fetching user data from Lichess API:', error);
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
      setSelectedPlayer(null);
    }
  };

  return (
    <div>
      {/* Task 1: Display Top Variant Players */}
      <div>
      <h2>Task 2</h2>
        <h1 style={{ color: 'blue' }}>Top {nb} {perfType} Players</h1>
        {topPlayers && topPlayers.length > 0 ? (
          <table style={{ borderCollapse: 'collapse', width: '50%', border: '2px solid black' }}>
            <thead style={{ background: 'lightgray' }}>
              <tr>
                <th style={{ border: '2px solid black', padding: '8px', fontWeight: 'bold', color: 'green' }}>Username</th>
                <th style={{ border: '2px solid black', padding: '8px', fontWeight: 'bold', color: 'green' }}>Rating</th>
              </tr>
            </thead>
            <tbody>
              {topPlayers.map((player) => (
                <tr key={player.username} style={{ border: '2px solid black', textAlign: 'left' }}>
                  <td style={{ border: '2px solid black', padding: '8px' }}>{player.username}</td>
                  <td style={{ border: '2px solid black', padding: '8px' }}>{player.perfs[perfType]?.rating || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading top players...</p>
        )}
      </div>

      {/* Task 2: Search Input and Display Selected Player Data */}
      <div style={{ marginTop: '20px' }}>
        <h2>Task 3 & 4: Search by Lichess Username</h2>
        <label>
          Enter Username: {' '}
          <input type="text" value={searchUsername} onChange={(e) => setSearchUsername(e.target.value)} />
        </label>
        <button onClick={handleSearch}>Search</button>
        
        {/* Display Selected Player Data including the last game */}
        {selectedPlayer && (
          <div style={{ marginTop: '20px' }}>
            <h2>User Details</h2>
            <table style={{ borderCollapse: 'collapse', width: '50%', border: '2px solid black' }}>
              <thead style={{ background: 'lightgray' }}>
                <tr>
                  <th style={{ border: '2px solid black', padding: '8px', fontWeight: 'bold', color: 'green' }}>Attribute</th>
                  <th style={{ border: '2px solid black', padding: '8px', fontWeight: 'bold', color: 'green' }}>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ border: '2px solid black', textAlign: 'left' }}>
                  <td style={{ border: '2px solid black', padding: '8px' }}>Username</td>
                  <td style={{ border: '2px solid black', padding: '8px' }}>{selectedPlayer.username}</td>
                </tr>
                <tr style={{ border: '2px solid black', textAlign: 'left' }}>
                  <td style={{ border: '2px solid black', padding: '8px' }}>Rating</td>
                  <td style={{ border: '2px solid black', padding: '8px' }}>{selectedPlayer.perfs.bullet?.rating || 'N/A'}</td>
                </tr>
                <tr style={{ border: '2px solid black', textAlign: 'left' }}>
                  <td style={{ border: '2px solid black', padding: '8px' }}>Games Played</td>
                  <td style={{ border: '2px solid black', padding: '8px' }}>{selectedPlayer.playing || 'N/A'}</td>
                </tr>
                {/* Task 4: Display Last Game Details */}
                {selectedPlayer.lastGame && (
                  <tr style={{ border: '2px solid black', textAlign: 'left' }}>
                    <td style={{ border: '2px solid black', padding: '8px' }}>Last Game Variant</td>
                    <td style={{ border: '2px solid black', padding: '8px' }}>{selectedPlayer.lastGame.variant}</td>
                  </tr>
                )}
                {selectedPlayer.lastGame && (
                  <tr style={{ border: '2px solid black', textAlign: 'left' }}>
                    <td style={{ border: '2px solid black', padding: '8px' }}>Last Game Score</td>
                    <td style={{ border: '2px solid black', padding: '8px' }}>{selectedPlayer.lastGame.status}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LichessComponent;

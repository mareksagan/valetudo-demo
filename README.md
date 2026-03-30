# Valetudo Demo

A self-contained demo of the Valetudo vacuum robot control interface with fully functional mock data.

## What's Included

This demo package contains:
- **Frontend**: Pre-built React UI (all features clickable and working)
- **Backend**: Node.js server with MockValetudoRobot (simulates a real robot)
- **Mock Data**: Full interactive map, robot state, consumables, timers, events, etc.

## Video

[![Watch the video](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](./demo/ValetudoUiDemo.mp4)

## Quick Start

### Prerequisites
- Node.js 20+ installed on your system

### Installation

1. Extract this folder
2. Open terminal/command prompt in this folder
3. Install dependencies:
   ```
   npm install
   ```

### Running the Demo

**Windows:**
```
start.bat
```

**Linux/Mac:**
```
npm start
```

**Or manually:**
```
set VALETUDO_CONFIG_PATH=valetudo_config.json
node index.js
```

Then open your browser to: **http://localhost:3000**

## Available Features

All buttons and features are fully functional:

### Robot Controls
- Start/Stop/Pause/Home buttons
- Locate robot (plays sound)
- Manual control with joystick
- Go to location on map

### Cleaning
- Zone cleaning (draw zones on map)
- Segment/room cleaning
- Full house cleaning
- Edit map (split/join rooms)
- Virtual restrictions (no-go zones, walls)

### Settings
- Fan speed (Low/Medium/High/Max)
- Water usage (Low/Medium/High)
- Operation mode (Vacuum/Mop/Both)
- Carpet mode
- Obstacle avoidance
- Key lock
- Do Not Disturb schedule
- Speaker volume + test sound
- WiFi configuration
- Consumable monitoring (filters, brushes)

### System
- System information
- Real-time logs
- Timer scheduling
- Events and notifications
- About page

## Configuration

The demo uses `valetudo_config.json` which includes:
- Port: 3000
- Mock robot implementation
- Pre-configured timers
- Demo-friendly settings

To change the port, edit the config file:
```json
"webserver": {
    "port": 3000
}
```

## Stopping the Server

Close the terminal window or press `Ctrl+C`.

## Notes

- This is a demo with mock data - no real robot required
- All API calls work and return realistic data
- Map is interactive with pan, zoom, and real-time updates
- Events are pre-populated (dust bin full, mop reminder, etc.)
- The robot "moves" when you send commands

## Troubleshooting

**Port already in use:**
Change the port in `valetudo_config.json` to another number (e.g., 3001, 8080)

**Node modules issues:**
Delete `node_modules` folder and run `npm install` again

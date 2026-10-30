<div align="center">
  <img src="./imgs/SteamHourBoost.png" alt="Steam Hour Boost" height="90">

<br>
  **A lightweight and efficient tool to idle and boost hours played in Steam games across multiple accounts simultaneously.**

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)
  [![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green.svg)](https://nodejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

</div>

---

## 📖 About

**Steam Hour Boost** is an automated Node.js & TypeScript tool designed to simulate active gameplay on Steam without needing to download or run the games on your computer. It connects to the Steam network using lightweight client protocols, letting you increase hours, collect trading cards, or showcase play history on your Steam profile.

---

## ✨ Features

- 👥 **Multi-Account Support:** Boost hours for unlimited Steam accounts concurrently.
- 🎮 **Up to 32 Games per Account:** Boost up to 32 games at once per account (the maximum supported by Steam).
- 🔐 **Steam Guard 2FA Integration:** Automatically generates 2FA authentication codes using your `sharedSecret`.
- 🎭 **Custom Persona Status:** Choose whether you want each account to appear as `Online`, `Away`, `Invisible`, or `Offline`.
- ⚡ **High Performance:** Built with TypeScript, bundled with Sucrase for instant development startup.
- 🛡️ **Safe & Open Source:** Your credentials stay exclusively on your local machine.

---

## 📋 Requirements

- [Node.js](https://nodejs.org/en) (v18.0.0 or higher recommended)
- `npm` or `yarn`

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Luk3Noir/steam-hour-boost.git
cd steam-hour-boost
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup configuration

Duplicate `config.example.json` and rename it to `config.json`:

```bash
# Windows PowerShell
Copy-Item config.example.json config.json

# Linux / macOS / Bash
cp config.example.json config.json
```

Open `config.json` and fill in your Steam account credentials and the games you want to boost.

---

## ⚙️ Configuration (`config.json`)

```json
{
  "accounts": [
    {
      "username": "your_steam_username",
      "password": "your_steam_password",
      "sharedSecret": "your_steam_guard_shared_secret",
      "games": [730, 440, 570],
      "status": "Online"
    }
  ]
}
```

### Configuration Options:

| Field | Type | Description |
|---|---|---|
| `username` | `string` | Your Steam account login name. |
| `password` | `string` | Your Steam account password. |
| `sharedSecret` | `string` *(optional)* | Your Steam Guard Mobile Authenticator `shared_secret`. If left blank (`""`), you may be prompted or can use accounts without mobile 2FA. |
| `games` | `number[]` | An array of Steam AppIDs to boost (up to 32 games). Find AppIDs on [SteamDB](https://steamdb.info). |
| `status` | `string` | Persona state: `"Online"`, `"Away"`, `"Invisible"`, or `"Offline"`. |

> [!TIP]
> **Common Steam AppIDs:**
> - `730` - Counter-Strike 2
> - `440` - Team Fortress 2
> - `570` - Dota 2
> - `252490` - Rust

---

## 🕹️ Usage

### Development Mode (with hot reload):
```bash
npm run dev
```

### Production Build:
Compile the TypeScript code and run the optimized build:
```bash
npm run build
npm start
```

### Typecheck:
Verify TypeScript types without compiling:
```bash
npm run typecheck
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Check out [COLLABORATORS.md](../COLLABORATORS.md) for details on the team and how to contribute.

---

## 📄 License

This project is licensed under the [MIT License](../LICENSE).

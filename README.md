# 📱 Proactive Vehicle Care App

A cross-platform **React Native (Expo)** mobile application that provides drivers with proactive vehicle maintenance insights and an **AR-powered dashboard warning light scanner** — powered by a Python FastAPI GenAI backend.

---

## ✨ Features

### 🏠 Home Dashboard
- Displays predictive maintenance timeline (Oil Change, Tyre Pressure, Brake Pads)
- Clean, dark automotive-themed UI
- Quick navigation to the AR Scanner

### 📷 AR Vision Scanner
- Uses the **device camera** to scan dashboard warning lights in real-time
- Sends captured frame data to the FastAPI backend
- Displays AI-generated diagnostic analysis and recommended actions
- Powered by the same **RAG pipeline** as the Vehicle Diagnostic AI backend

---

## 🏗️ Architecture

```
┌─────────────────────────────┐     HTTP POST      ┌──────────────────────────┐
│  React Native App (Expo)    │ ───────────────►   │  FastAPI Backend         │
│  ┌──────────┐ ┌──────────┐  │  /analyze-image    │  RAG + OpenAI            │
│  │  Home    │ │ Scanner  │  │ ◄───────────────   │  Vehicle Manual Context  │
│  │ Screen   │ │ Screen   │  │  AI Diagnosis      └──────────────────────────┘
│  └──────────┘ └──────────┘  │
└─────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Mobile Framework | React Native (Expo) |
| Navigation | React Navigation (Stack) |
| Camera | Expo Camera |
| Backend | Python FastAPI (shared with vehicle-diagnostic-ai) |
| Styling | StyleSheet (dark BMW-inspired theme) |

---

## 🚀 Running the App

**Prerequisites:** Install [Expo Go](https://expo.dev/go) on your phone.

**Start the backend** (from `vehicle-diagnostic-ai/backend`):
```bash
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000
```

**Start the mobile app:**
```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** on your phone. Make sure your phone and Mac are on the same WiFi network.

---

## 📁 Project Structure

```
proactive-vehicle-care-app/
├── App.js                    # Navigation stack + theme setup
├── src/
│   └── screens/
│       ├── HomeScreen.js     # Predictive maintenance dashboard
│       └── ScannerScreen.js  # AR camera + AI diagnostic screen
└── package.json
```

---

## 👨‍💻 Author

**Harikrishna Raj** — BSc Computer Science, BSBI Berlin  
[LinkedIn](https://linkedin.com/in/harikrishnark) · [GitHub](https://github.com/harikrishnark)

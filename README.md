# S.A.M.V.A.D. 🇮🇳
### **S**ystem for **A**utomated **M**anagement of **V**oter **A**wareness & **D**ata
> *"Misinformation travels faster than light. S.A.M.V.A.D travels at the speed of truth."*
---
## 🚨 The Problem
In the digital age, elections aren't just fought on the ground—they are fought on timelines, group chats, and forward chains. **Misinformation** is the invisible enemy of democracy, capable of suppressing votes, inciting violence, and eroding trust in institutions within minutes.
Existing solutions are **reactive**. They debunk lies *after* the damage is done.
## 💡 The Solution
**S.A.M.V.A.D.** is a dual-engine platform designed to **pre-empt, detect, and neutralize** electoral misinformation in real-time. It bridges the gap between the Election Commission of India (ECI) and the common citizen.
### 🚀 Key Features
#### 1. Dual-Core Architecture
A seamless interface that serves two distinct masters with one unified brain:
*   **🗣️ VARTA (Virtual Assistant for Real-time Truth & Awareness)**
    *   *For the Citizen:* A friendly, AI-powered chat interface.
    *   **Instant Truth:** Users can type in rumors ("Are elections cancelled?"), and VARTA instantly queries the **Truth Database** to provide official, cited fact-checks.
    *   **Educational:** Proactively educates voters about their rights (e.g., "No, you don't need a degree to vote").
*   **🛡️ PARAKH (Proactive Analysis & Rapid Action Knowledge Hub)**
    *   *For the Administrator:* A mission-control dashboard for the ECI.
    *   **Live Misinfo Queue:** Real-time feed of detected viral narratives with AI-assigned severity scores.
    *   **One-Click Response:** Admins can approve AI-generated rebuttals to be instantly published across social channels.
    *   **Regional Heatmaps:** geographic visualization of where misinformation is spreading (e.g., "High threat level in UP").
    *   **Social Watchdog:** Tracks malicious bot networks and alerts admins to coordinated inauthentic behavior.
#### 2. Real-Time Analytics
*   **Time-Series Tracking:** Monitor the velocity of rumors hour-by-hour.
*   **Sentiment Analysis:** Determine whether a narrative is purely confusing or maliciously polarized.
#### 3. Automated specific Rebuttals
*   S.A.M.V.A.D doesn't just flag content; it **generates the counter-narrative**.
*   Using pre-approved official sources (Constitution, ECI Manuals), it drafts press releases, tweets, and SMS blasts for immediate dissemination.
---
## 🛠️ Tech Stack
Built for speed, scale, and reliability.
| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | **React + Vite** | Blazing fast UI rendering. |
| **Styling** | **Tailwind CSS** | Professional, responsive, and clean aesthetics. |
| **Backend** | **Node.js + Express** | Robust API handling high-concurrency requests. |
| **Visuals** | **Recharts** | Interactive data visualization for the command center. |
| **Animations** | **Framer Motion** | Smooth, premium transitions for a polished feel. |
| **Icons** | **Lucide React** | Consistent and modern iconography. |
---
## 💻 Installation & Setup
Get S.A.M.V.A.D up and running in minutes.
### Prerequisites
*   Node.js (v18+)
*   npm
### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/samvad.git
cd samvad
```
### 2. server Setup
 Navigate to the server directory and install dependencies.
```bash
cd server
npm install
npm run dev
```
*Server runs on port 5001.*
### 3. Client Setup
Open a new terminal, navigate to the client directory.
```bash
cd client
npm install
npm run dev
```
*Client runs on local vite server (usually port 5173).*
---
## 📸 Usage Guide
1.  **Open the App**: Launch the client URL.
2.  **Switch Views**: Use the toggle in the header.
    *   **VARTA**: Test the chat bot with queries like "EVM hacking" or "online voting".
    *   **PARAKH**: View the dashboard. Click "Resolve" on pending issues in the queue to simulate administrative action. Observe how the stats update in real-time.
---
## 🔮 Future Roadmap
*   **Multilingual Support**: VARTA in 22 official Indian languages.
*   **WhatsApp Integration**: Direct fact-checking via WhatsApp Business API.
*   **Deepfake Detection**: Integration with video forensics API.
---
> Built with ❤️ for the future of Indian Democracy.

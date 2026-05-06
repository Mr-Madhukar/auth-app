# 🔐 AuthApp — FreeAPI Authentication

A modern, full-featured authentication app built with **React** and the **FreeAPI** backend. Supports user registration, login, session management, and a beautiful profile dashboard — all wrapped in a dark glassmorphism UI.

---

## ✨ Features

- **User Registration** — Create an account with username, email, and password
- **User Login** — Secure sign-in with JWT-based authentication
- **Profile Dashboard** — View your profile details (avatar, role, email verification status, join date)
- **Session Persistence** — Stays logged in across page refreshes using `localStorage` tokens
- **Protected Routes** — Dashboard is accessible only to authenticated users
- **Logout** — Securely ends your session and clears local tokens
- **Toast Notifications** — Real-time feedback for every action (success, error)
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer        | Technology                                                    |
| ------------ | ------------------------------------------------------------- |
| **Frontend** | [React 19](https://react.dev) + [Vite](https://vite.dev)     |
| **Styling**  | [Tailwind CSS v4](https://tailwindcss.com) + Custom CSS       |
| **Routing**  | [React Router v7](https://reactrouter.com)                    |
| **HTTP**     | [Axios](https://axios-http.com)                               |
| **Icons**    | [Lucide React](https://lucide.dev)                            |
| **Toasts**   | [React Hot Toast](https://react-hot-toast.com)                |
| **API**      | [FreeAPI.app](https://freeapi.app) — Authentication module    |

---

## 📁 Project Structure

```
auth-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   └── auth.js            # Axios instance + API calls (register, login, logout, current-user)
│   ├── components/
│   │   └── ProtectedRoute.jsx # Auth guard for private routes
│   ├── context/
│   │   └── AuthContext.jsx    # Global auth state (user, login, logout)
│   ├── pages/
│   │   ├── LoginPage.jsx      # Sign-in form
│   │   ├── RegisterPage.jsx   # Sign-up form
│   │   └── DashboardPage.jsx  # Profile dashboard
│   ├── App.jsx                # Root layout + routes
│   ├── main.jsx               # Entry point
│   └── index.css              # Design system (theme tokens, components)
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Mr-Madhukar/auth-app.git
cd auth-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at **http://localhost:5173**.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔗 API Reference

All authentication endpoints are provided by [FreeAPI.app](https://freeapi.app):

| Method | Endpoint                                  | Description         |
| ------ | ----------------------------------------- | ------------------- |
| POST   | `/api/v1/users/register`                  | Register a new user |
| POST   | `/api/v1/users/login`                     | Login (returns JWT) |
| POST   | `/api/v1/users/logout`                    | Logout              |
| GET    | `/api/v1/users/current-user`              | Get logged-in user  |

Base URL: `https://api.freeapi.app`

---

## 🎨 Design Highlights

- **Dark Glassmorphism** — Frosted-glass cards with subtle borders and depth
- **Animated Gradient Borders** — Input fields glow with a shifting gradient on focus
- **Floating Orbs** — Ambient background animation for visual depth
- **Smooth Page Transitions** — Fade-in slide-up entrance animations
- **Inter Font** — Clean, modern typography via Google Fonts
- **Micro-interactions** — Hover effects on buttons, cards, and info rows

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using <a href="https://react.dev">React</a> &amp; <a href="https://freeapi.app">FreeAPI</a>
</p>

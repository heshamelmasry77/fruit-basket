# 🧺 Fruit Basket

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.1-764abc?logo=redux&logoColor=white)
![Vitest](https://img.shields.io/badge/Tests-Vitest-6E9F18?logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/E2E-Playwright-45ba4b?logo=playwright&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

---

**Fruit Basket** is a simple supermarket checkout app that calculates total prices and applies multi-buy offers automatically.  
It’s built with **React 19**, **Vite 7**, **TypeScript**, and **Redux Toolkit**, following the **KISS** principle — simple, clean, and accessible.

🔗 **Live Demo:** [https://fruit-basket-xi.vercel.app](https://fruit-basket-xi.vercel.app)

---

## ⚙️ Tech Stack

| Category             | Tools / Libraries               |
| -------------------- | ------------------------------- |
| **Framework**        | React 19, Vite 7                |
| **Language**         | TypeScript 5.9                  |
| **Styling**          | Tailwind CSS 4                  |
| **State Management** | Redux Toolkit                   |
| **Routing**          | React Router v7                 |
| **Testing**          | Vitest (unit), Playwright (E2E) |
| **Code Quality**     | ESLint + Prettier + Husky       |

---

## 🏗 Project Structure

```
src/
 ├── assets/
 ├── components/
 │   └── ui/
 ├── lib/
 │   └── pricing/
 │        ├── types.ts
 │        ├── fixtures.ts
 │        ├── engine.ts
 │        └── __tests__/
 ├── pages/
 │   ├── HomePage.tsx
 │   ├── ScanPage.tsx
 │   ├── CatalogPage.tsx
 │   └── NotFound.tsx
 ├── routes/
 │   ├── root/RootLayout.tsx
 │   └── router.tsx
 ├── store/
 │   ├── slices/basketSlice.ts
 │   ├── hooks.ts
 │   ├── index.ts
 │   └── __tests__/
 ├── index.css
 └── main.tsx
tests/
 └── e2e/
     ├── home.spec.ts
     └── scan.spec.ts
```

---

## 🚀 Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/heshamelmasry77/fruit-basket.git
cd fruit-basket
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start development server

```bash
npm run dev
```

Default Vite port → **http://localhost:5173**

### 4️⃣ Run tests

- **Unit tests (Vitest):**
  ```bash
  npm run test:run
  ```
- **E2E tests (Playwright):**
  ```bash
  npm run test:e2e
  ```

### 5️⃣ Build for production

```bash
npm run build
npm run preview
```

Preview server runs on → **http://localhost:4173**

---

## 🧩 Core Features

- 🧮 Automatic total calculation with multi-buy offers
- 🧾 Clean accessible UI (WCAG AA)
- ➕ Add / remove / clear items
- 💰 Summary section showing discounts and savings
- 🧱 Fully tested (Vitest + Playwright)
- 🪶 Built with React + TypeScript + Tailwind CSS
- 🧠 Pure pricing logic, isolated and reusable

---

## 🧠 Example Pricing

| Item   | Price | Offer     |
| ------ | ----- | --------- |
| Apple  | 30    | 2 for 45  |
| Banana | 50    | 3 for 130 |
| Peach  | 60    | —         |
| Kiwi   | 20    | —         |

---

## 🧪 Testing

| Type     | Tool       | Description                                             |
| -------- | ---------- | ------------------------------------------------------- |
| **Unit** | Vitest     | Tests pure logic (`engine.ts`, `basketSlice.ts`)        |
| **E2E**  | Playwright | Simulates user flows (`/scan`, discounts, clear basket) |

Run all:

```bash
npm run test:run && npm run test:e2e
```

---

## ♿ Accessibility

- Focus rings for keyboard navigation
- 44×44 px hit targets for buttons (+/−)
- ARIA labels and live regions
- WCAG AA color contrast compliance

---

## 💡 Development Philosophy

> “Keep It Simple and Straightforward.”

Every line of code is written with the **KISS principle** in mind —  
readable, predictable, and easy to maintain.

---

## 🧑‍💻 Author

**Hesham El Masry**  
Frontend Engineer | [GitHub](https://github.com/heshamelmasry77) | [LinkedIn](https://www.linkedin.com/in/heshamelmasry77)

---

## 📜 License

MIT © 2025 Hesham El Masry

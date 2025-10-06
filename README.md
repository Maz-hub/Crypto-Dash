# 💰 Crypto Pricing Dashboard

A React project built to practice working with **real-time APIs** and managing data dynamically.  
This dashboard displays live cryptocurrency prices, market caps, and 24h changes using data from the **CoinGecko API** (demo tier, free).

---

## 🧩 Goal

To strengthen my understanding of:
- Fetching live data with `useEffect`
- Managing multiple states (`loading`, `error`, `coins`, `filter`, `limit`, `sortBy`)
- Building reusable components for cleaner UI logic
- Filtering and sorting data dynamically in React
- Displaying asynchronous API data in a responsive grid

---

## ⚙️ API Used

**Endpoint:** `/coins/markets`  
**Docs:** [CoinGecko API Reference](https://docs.coingecko.com/v3.0.1/reference/coins-markets)  

This endpoint returns data for all supported coins, including:
- 💵 Current price  
- 📊 Market capitalization  
- 🔁 24h change percentage  
- 📈 Trading volume  

Example API query used in this project:

https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false

---

## 🧱 Features

✅ **Live Data Fetching** — Fetches cryptocurrency data from CoinGecko using `useEffect`  
✅ **Loading & Error Handling** — Cleanly displays app states  
✅ **Filter Coins** — Search by coin name or symbol (case-insensitive)  
✅ **Limit Selector** — Choose how many coins to display (5, 10, 20, 50, 100)  
✅ **Sort Selector** — Sort by market cap, price, or 24h change (ascending or descending)  
✅ **Reusable Components** — Organized UI (`CoinCard`, `FilterInput`, `LimitSelector`, `SortSelector`)  
✅ **Environment Variables** — API URL stored in `.env` for cleaner and safer configuration  

---

## 🛠️ Tech Stack

- ⚛️ **React + Vite**
- 💻 **JavaScript (ES6+)**
- 🌐 **Fetch API**
- 🧩 **CoinGecko Demo API**

## 🧠 What I Learned

- How to use `useEffect` for API calls  
- How to manage and combine multiple states in a single app  
- How to use `.filter()` and `.sort()` together for data manipulation  
- How to pass and handle props between parent and child components  
- How to store and use environment variables in Vite (`import.meta.env`)  
- How to build clean, readable React components with clear responsibilities  

This project is built for **educational purposes only** using the free CoinGecko demo API.
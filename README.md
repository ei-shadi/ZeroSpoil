
<div align="center">
  <h1>
    <a href="https://zerospoil.netlify.app/" target="_blank" rel="noopener noreferrer">
      🕖 ZeroSpoil
    </a>
  </h1>
  <p><strong>Track your food. Waste less. Save more.</strong></p>
  <p>A smart food expiry tracker helping households reduce food waste through timely alerts and clean organization.</p>
</div>

---

<h2 align="center">📷 Screenshot</h2>

<div align="center">
  <img src="https://i.ibb.co.com/5XTVKChB/Elite-Club.png" alt="EliteClub Screenshot" width="700" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
</div>

---

---

<h2 align="center">✨ Project Overview</h2>

**ZeroSpoil** is a full-stack web application designed to help users efficiently manage food items by tracking expiry dates. It sends timely reminders to prevent food spoilage and promotes mindful consumption. Built as a complete CRUD system with secure authentication, it’s a practical app to learn full-stack principles while encouraging sustainability.

---

<h2 align="center">🚀 Features</h2>

* 🔖 **Add, edit, delete, and view food items with expiry dates**  
* 🔐 **Firebase authentication** (Register / Login / Logout)  
* ⏰ **Get alerts before food items expire**  
* ✅ **SweetAlert2-powered confirmation dialogs**  
* 💬 **Real-time toast notifications using React Hot Toast**  
* 🔒 **Protected routes ensuring secure user data handling**  
* 📱 **Responsive design with Tailwind CSS and DaisyUI**  
* 🏷️ **Dynamic page titles using React Helmet Async**  

---

<h2 align="center">🧪 Tech Stack</h2>

<table align="center">
  <tr>
    <th>🧠 Technology</th>
    <th>🔧 Purpose</th>
  </tr>
  <tr>
    <td><a href="https://reactjs.org/" target="_blank">⚛ React</a></td>
    <td>UI Development</td>
  </tr>
  <tr>
    <td><a href="https://reactrouter.com/" target="_blank">🔁 React Router</a></td>
    <td>Routing & Navigation</td>
  </tr>
  <tr>
    <td><a href="https://daisyui.com/" target="_blank">🌼 DaisyUI</a></td>
    <td>Prebuilt Tailwind Components</td>
  </tr>
  <tr>
    <td><a href="https://tailwindcss.com/" target="_blank">💨 Tailwind CSS</a></td>
    <td>Utility-First Styling</td>
  </tr>
  <tr>
    <td><a href="https://firebase.google.com/" target="_blank">🔥 Firebase</a></td>
    <td>Authentication & Backend</td>
  </tr>
  <tr>
    <td><a href="https://react-hot-toast.com/" target="_blank">🌶 React Hot Toast</a></td>
    <td>Toast Notifications</td>
  </tr>
  <tr>
    <td><a href="https://sweetalert2.github.io/" target="_blank">🍬 SweetAlert2</a></td>
    <td>Alert Popups</td>
  </tr>
  <tr>
    <td><a href="https://react-icons.github.io/react-icons/" target="_blank">🎨 React Icons</a></td>
    <td>Iconography</td>
  </tr>
  <tr>
    <td><a href="https://github.com/staylor/react-helmet-async" target="_blank">🪖 Helmet Async</a></td>
    <td>SEO / Meta Tags</td>
  </tr>
  <tr>
    <td><a href="https://www.npmjs.com/package/framer-motion" target="_blank">⚡ Framer Motion</a></td>
    <td>Animations</td>
  </tr>
</table>

---
---

<h2 align="center">🌐 Live Site</h2>

👉 <a href="https://zerospoil.netlify.app/" target="_blank" rel="noopener noreferrer">Visit ZeroSpoil Live</a>

---

<h2 align="center">🖥️ ZeroSpoil Server:</h2>

🌟 **Server Code:**  
<a href="https://github.com/ei-shadi/zerospoil-server" target="_blank" rel="noopener noreferrer">https://github.com/ei-shadi/zerospoil-server</a>

---

<h2 align="center">🚀 How to Run Locally</h2>

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/ei-shadi/zerospoil.git
   ```

2. **Navigate to the project directory:**  
   ```bash
   cd zerospoil
   ```

3. **Install dependencies:**  
   ```bash
   npm install
   ```

4. **Configure environment variables:**  
   - Create a `.env` file with your Firebase and MongoDB credentials (or `firebaseConfig.js` if you use that).

5. **Run the development server:**  
   ```bash
   npm start
   ```

6. **Open your browser at:**  
   [http://localhost:3000](http://localhost:3000)

<div align="center">

<h2>⚙️ API Endpoints (Express + MongoDB + Firebase Auth)</h2>

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>GET</td>
      <td><code>/foods-data</code></td>
      <td>Get all food items</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/upcoming-expire-foods</code></td>
      <td>Get foods expiring within 7 days</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/expired-foods</code></td>
      <td>Get expired foods</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/food-details/:id</code></td>
      <td>Get food item by ID</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/food-data-by-email/:email</code></td>
      <td>Get food items by user email (Auth)</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/foods-data</code></td>
      <td>Add new food item (Auth)</td>
    </tr>
    <tr>
      <td>POST</td>
      <td><code>/food-data/:id</code></td>
      <td>Add note to food item (Auth)</td>
    </tr>
    <tr>
      <td>PUT</td>
      <td><code>/foods-data/:id</code></td>
      <td>Update food item</td>
    </tr>
    <tr>
      <td>DELETE</td>
      <td><code>/foods-data/:id</code></td>
      <td>Delete food item (Auth)</td>
    </tr>
    <tr>
      <td>GET</td>
      <td><code>/foods-data/search</code></td>
      <td>Search & paginate food items</td>
    </tr>
  </tbody>
</table>

<p>🔐 <strong>Note:</strong> Protected routes require Firebase Bearer Token authentication.</p>

</div>


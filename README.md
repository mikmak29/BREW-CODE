# Brew & Code — Frontend Documentation

A sweets shopping web application with separate User and Admin interfaces. The backend is implemented with Express.js and exposes a REST API for product CRUD operations. This document covers the complete frontend structure, authentication flow, page routing, and step-by-step backend integration guide.

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Design System](#2-design-system)
3. [Page Routing Map](#3-page-routing-map)
4. [Authentication Flow](#4-authentication-flow)
5. [Page Reference](#5-page-reference)
6. [Backend Endpoint Mapping](#6-backend-endpoint-mapping)
7. [Backend Integration Guide](#7-backend-integration-guide)
8. [Running the Project](#8-running-the-project)

---

## 1. Project Structure

```
prac-14/
├── backend/                         # Express.js API (do not modify)
│   └── src/
│       ├── server.js
│       ├── constants/DATA.js
│       ├── controllers/product.controller.js
│       └── routes/product.route.js
│
└── frontend/
    ├── index.html                   # Entry point — welcome/splash page
    └── src/
        ├── js/
        │   ├── index.js             # Handles POST /api/product/create
        │   └── homepage.js          # Reads productName from sessionStorage
        ├── pages/
        │   ├── login.html           # Login page
        │   ├── signup.html          # Sign up page
        │   ├── admin.html           # Admin dashboard (CRUD)
        │   └── homepage.html        # User-facing sweets homepage
        └── styles/
            ├── style.css            # Shared design tokens (card, form, button)
            ├── auth.css             # Auth-specific styles (splash, login, signup)
            ├── admin.css            # Admin dashboard layout and components
            └── pages/
                └── style.css        # Homepage styles (nav, hero, menu, footer)
```

---

## 2. Design System

All pages share a consistent visual identity defined by CSS custom properties in `src/styles/style.css`.

| Token | Value | Usage |
|---|---|---|
| `--brown-dark` | `#2c1a0e` | Primary dark background, headings |
| `--brown-mid` | `#5c3317` | Secondary backgrounds, labels |
| `--brown-light` | `#a0522d` | Links, accents |
| `--cream` | `#fdf6ec` | Card backgrounds, light text |
| `--accent` | `#e8a045` | Primary CTA buttons, highlights |
| `--muted` | `#7a5c44` | Secondary text, placeholders |
| `--text` | `#1e1008` | Body text |
| `--radius` | `12px` | Border radius for inputs and buttons |

**Typography:** `"Segoe UI", system-ui, sans-serif`

**Card component:** `.card` — cream background, `border-radius: 20px`, heavy box-shadow, centered layout.

---

## 3. Page Routing Map

```
index.html  (Welcome / Entry)
    │
    ├──► login.html  (Login)
    │        │
    │        ├──► src/pages/homepage.html  (User — after login as User)
    │        └──► admin.html               (Admin — after login as Admin)
    │
    └──► signup.html  (Sign Up)
             │
             └──► login.html  (after successful registration)
```

| Page | File | Role |
|---|---|---|
| Welcome | `frontend/index.html` | Public |
| Login | `frontend/src/pages/login.html` | Public |
| Sign Up | `frontend/src/pages/signup.html` | Public |
| User Homepage | `frontend/src/pages/homepage.html` | Authenticated User |
| Admin Dashboard | `frontend/src/pages/admin.html` | Authenticated Admin |

---

## 4. Authentication Flow

The frontend is structured to support a token-based or session-based authentication system. The HTML forms are in place with the correct `id` attributes and field names. The JavaScript logic for making the actual API calls needs to be added by the backend team (see [Section 7](#7-backend-integration-guide)).

### Flow Diagram

```
User visits index.html
        │
        ▼
   [Login / Sign Up]
        │
   ┌────┴────┐
   │         │
   ▼         ▼
login.html  signup.html
   │              │
   │   POST /api/auth/register
   │              │
   │         ◄────┘ (redirect to login on success)
   │
   │   POST /api/auth/login
   │              │
   │    ┌─────────┴──────────┐
   │    │                    │
   ▼    ▼                    ▼
 role=user              role=admin
   │                        │
   ▼                        ▼
homepage.html          admin.html
   │                        │
   └──── Logout ────────────┘
              │
              ▼
          login.html
```

### Role Selection

The login page (`login.html`) includes a role selector with two radio buttons:

```html
<input type="radio" name="role" value="user" checked />
<input type="radio" name="role" value="admin" />
```

After a successful login API response, the frontend JS should read the selected role and redirect accordingly:
- `role === "user"` → redirect to `./src/pages/homepage.html`
- `role === "admin"` → redirect to `./admin.html`

---

## 5. Page Reference

### `index.html` — Welcome / Splash

- **Purpose:** Entry point for the application.
- **Links to:** `login.html`, `signup.html`, `admin.html`
- **Stylesheets:** `src/styles/style.css`, `src/styles/auth.css`
- **No JavaScript** — purely structural.

---

### `login.html` — Login

- **Purpose:** Authenticates existing users.
- **Form ID:** `#loginForm`
- **Fields:**
  - `#email` — user's email address
  - `#password` — user's password
  - `input[name="role"]` — radio: `"user"` or `"admin"`
  - `#rememberMe` — checkbox for persistent sessions
- **Error elements:** `#emailError`, `#passwordError`
- **Submit button:** `#loginBtn`
- **Backend endpoint:** `POST /api/auth/login` *(to be implemented)*
- **On success:** redirect based on role (see Section 4)

---

### `signup.html` — Sign Up

- **Purpose:** Registers new user accounts.
- **Form ID:** `#signupForm`
- **Fields:**
  - `#fullName` — user's full name
  - `#email` — user's email address
  - `#password` — chosen password
  - `#confirmPassword` — password confirmation
  - `#agreeTerms` — terms acceptance checkbox
- **Error elements:** `#fullNameError`, `#emailError`, `#passwordError`, `#confirmPasswordError`
- **Submit button:** `#signupBtn`
- **Backend endpoint:** `POST /api/auth/register` *(to be implemented)*
- **On success:** redirect to `login.html`

---

### `src/pages/homepage.html` — User Homepage

- **Purpose:** Main shopping page for authenticated users.
- **Sections:** Nav, Hero, Features, Menu (6 items), Testimonials, CTA, Footer
- **Dynamic elements:**
  - `#displayProductName` — updated by `homepage.js` from `sessionStorage`
  - `#navUsername` — should be updated with the logged-in user's name
  - `#navAvatarInitial` — first letter of the user's name
  - `#cartCount` — cart item count badge
  - `.add-to-cart-btn` — each menu card has an `Add to Cart` button with `data-product` attribute
- **Script:** `../js/homepage.js` (existing, do not modify)
- **Stylesheet:** `../styles/pages/style.css`

---

### `admin.html` — Admin Dashboard

- **Purpose:** Full CRUD interface for managing products.
- **Sections:** Sidebar nav, Topbar, Stats strip, Products table
- **Key element IDs for JS integration:**

| Element ID | Purpose |
|---|---|
| `#productsTableBody` | `<tbody>` — inject `<tr>` rows from `GET /api/product/data` |
| `#totalProducts` | Stat card — display total product count |
| `#tableCount` | Footer text — "Showing N products" |
| `#searchProducts` | Search input — filter table rows client-side |
| `#sortProducts` | Sort select — sort table rows client-side |
| `#openAddProductModal` | Button — opens `#addProductModal` |
| `#addProductForm` | Form — `POST /api/product/create` |
| `#newProductName` | Input — product name for new product |
| `#addProductError` | Error span for add form |
| `#editProductForm` | Form — `PUT /api/product/data/:id` |
| `#editProductId` | Hidden input — holds the product `id` being edited |
| `#editProductName` | Input — updated product name |
| `#editProductError` | Error span for edit form |
| `#deleteProductId` | Hidden input — holds the product `id` to delete |
| `#deleteProductName` | `<strong>` — displays the product name in confirm dialog |
| `#confirmDeleteProduct` | Button — triggers `DELETE /api/product/delete/:id` |

- **Modals:** Three modal overlays are present. Toggle the `.open` class on the `.modal-overlay` to show/hide them.
  - `#addProductModal` — Add product
  - `#editProductModal` — Edit product
  - `#deleteProductModal` — Delete confirmation

---

## 6. Backend Endpoint Mapping

### Existing Endpoints (backend already implemented)

| Method | Endpoint | Used By | Payload / Notes |
|---|---|---|---|
| `POST` | `/api/product/create` | `src/js/index.js` (existing) | `{ productName: string }` |
| `GET` | `/api/product/data` | `admin.html` — products table | Returns `{ data: [{ id, productName }] }` |
| `PUT` | `/api/product/data/:id` | `admin.html` — edit modal | `{ productName: string }` |
| `DELETE` | `/api/product/delete/:id` | `admin.html` — delete modal | URL param only |

### Endpoints to Implement

| Method | Endpoint | Used By | Expected Payload |
|---|---|---|---|
| `POST` | `/api/auth/register` | `signup.html` | `{ fullName, email, password }` |
| `POST` | `/api/auth/login` | `login.html` | `{ email, password, role }` |
| `POST` | `/api/auth/logout` | Nav logout links | No body (clear session/token) |

---

## 7. Backend Integration Guide

This section provides step-by-step instructions for wiring up the frontend HTML to backend API calls. All integration work goes into **new JS files** — do not modify `index.js` or `homepage.js`.

---

### Step 1: Create `src/js/auth.js`

This file handles login and signup form submissions.

**Login form (`login.html`):**

```javascript
// src/js/auth.js

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = document.querySelector('input[name="role"]:checked').value;

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        document.getElementById("passwordError").textContent = err.errorMessage;
        return;
      }

      const data = await res.json();
      // Store token or user info
      sessionStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role selection
      if (role === "admin") {
        window.location.href = "./admin.html";
      } else {
        window.location.href = "./src/pages/homepage.html";
      }
    } catch {
      document.getElementById("passwordError").textContent = "Network error. Please try again.";
    }
  });
}
```

Add to `login.html`:
```html
<script defer type="module" src="./src/js/auth.js"></script>
```

---

**Signup form (`signup.html`):**

```javascript
// src/js/auth.js (continued)

const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        document.getElementById("emailError").textContent = err.errorMessage;
        return;
      }

      window.location.href = "./login.html";
    } catch {
      document.getElementById("emailError").textContent = "Network error. Please try again.";
    }
  });
}
```

Add to `signup.html`:
```html
<script defer type="module" src="./src/js/auth.js"></script>
```

---

### Step 2: Create `src/js/admin.js`

This file handles all CRUD operations on the admin dashboard.

```javascript
// src/js/admin.js — skeleton with all hook points

const API_BASE = "http://localhost:3000/api/product";

// ── Load Products ──────────────────────────────────────
async function loadProducts() {
  const res = await fetch(`${API_BASE}/data`);
  const { data } = await res.json();

  const tbody = document.getElementById("productsTableBody");
  const countEl = document.getElementById("totalProducts");
  const tableCountEl = document.getElementById("tableCount");

  countEl.textContent = data.length;
  tableCountEl.textContent = `Showing ${data.length} product${data.length !== 1 ? "s" : ""}`;

  tbody.innerHTML = data.map((item) => `
    <tr>
      <td><span class="id-cell">${item.id}</span></td>
      <td>${item.productName}</td>
      <td>${new Date().toLocaleDateString()}</td>
      <td>
        <div class="action-btns">
          <button class="btn-edit" onclick="openEditModal('${item.id}', '${item.productName}')">Edit</button>
          <button class="btn-delete" onclick="openDeleteModal('${item.id}', '${item.productName}')">Delete</button>
        </div>
      </td>
    </tr>
  `).join("") || `<tr class="table-empty-row"><td colspan="4">
    <div class="empty-state"><span class="empty-icon">📭</span><p>No products yet.</p></div>
  </td></tr>`;
}

// ── Add Product ────────────────────────────────────────
document.getElementById("addProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const productName = document.getElementById("newProductName").value.trim();
  if (!productName) {
    document.getElementById("addProductError").textContent = "Product name is required.";
    return;
  }
  await fetch(`${API_BASE}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productName }),
  });
  closeModal("addProductModal");
  loadProducts();
});

// ── Edit Product ───────────────────────────────────────
function openEditModal(id, name) {
  document.getElementById("editProductId").value = id;
  document.getElementById("editProductName").value = name;
  openModal("editProductModal");
}

document.getElementById("editProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("editProductId").value;
  const productName = document.getElementById("editProductName").value.trim();
  await fetch(`${API_BASE}/data/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productName }),
  });
  closeModal("editProductModal");
  loadProducts();
});

// ── Delete Product ─────────────────────────────────────
function openDeleteModal(id, name) {
  document.getElementById("deleteProductId").value = id;
  document.getElementById("deleteProductName").textContent = `"${name}"`;
  openModal("deleteProductModal");
}

document.getElementById("confirmDeleteProduct").addEventListener("click", async () => {
  const id = document.getElementById("deleteProductId").value;
  await fetch(`${API_BASE}/delete/${id}`, { method: "DELETE" });
  closeModal("deleteProductModal");
  loadProducts();
});

// ── Modal Helpers ──────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.add("open");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}

// ── Close buttons ──────────────────────────────────────
["closeAddProductModal", "cancelAddProduct"].forEach((id) =>
  document.getElementById(id).addEventListener("click", () => closeModal("addProductModal"))
);
["closeEditProductModal", "cancelEditProduct"].forEach((id) =>
  document.getElementById(id).addEventListener("click", () => closeModal("editProductModal"))
);
["closeDeleteProductModal", "cancelDeleteProduct"].forEach((id) =>
  document.getElementById(id).addEventListener("click", () => closeModal("deleteProductModal"))
);

document.getElementById("openAddProductModal").addEventListener("click", () => openModal("addProductModal"));

// ── Sidebar toggle (mobile) ────────────────────────────
document.getElementById("sidebarToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open");
});

// ── Init ───────────────────────────────────────────────
loadProducts();
```

Add to `admin.html` (before `</body>`):
```html
<script defer type="module" src="./src/js/admin.js"></script>
```

---

### Step 3: Protect Pages (Auth Guard)

Once the backend returns a token or session on login, add a guard at the top of each protected page's script:

```javascript
// At the top of admin.js and any user-page script
const user = sessionStorage.getItem("user");
if (!user) {
  window.location.href = "/login.html";
}
```

---

### Step 4: Update Nav User Info on Homepage

In `homepage.js` (or a new `src/js/user.js`), populate the nav with the logged-in user's data:

```javascript
const user = JSON.parse(sessionStorage.getItem("user") || "{}");
if (user.fullName) {
  document.getElementById("navUsername").textContent = user.fullName;
  document.getElementById("navAvatarInitial").textContent = user.fullName[0].toUpperCase();
}
```

---

### Step 5: CORS Configuration

The backend `server.js` must allow requests from the frontend origin. Update the `cors` options in `backend/src/server.js`:

```javascript
// Current (has a typo — fix this):
// "http://localhost:127.0.0.1:5500]"  ← malformed

// Correct:
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
```

---

## 8. Running the Project

### Start the Backend

```bash
cd backend
npm install
npm run dev
```

The API will be available at `http://localhost:3000`.

### Serve the Frontend

Use the **Live Server** extension in VS Code:

1. Right-click `frontend/index.html`
2. Select **Open with Live Server**
3. The app will open at `http://127.0.0.1:5500`

Alternatively, use any static file server:

```bash
cd frontend
npx serve .
```

---

## Notes for Backend Developers

- All frontend form IDs and field names are documented in [Section 5](#5-page-reference).
- The admin dashboard table body (`#productsTableBody`) expects rows to be injected by JS after fetching `GET /api/product/data`.
- Modal open/close is controlled by toggling the `.open` class on `.modal-overlay` elements.
- The `sessionStorage` key `"user"` is used to store the logged-in user object — ensure the login response includes at minimum `{ fullName, email, role }`.
- The existing `index.js` script (used by the original add-product form) is preserved and untouched. It still posts to `POST /api/product/create` and stores `productName` in `sessionStorage`.

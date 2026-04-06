# Personal Hub

A minimal, dark-themed personal SPA built with **React + Vite + MUI**.  
Designed to be a private workspace with portfolio-facing pages — currently featuring the **Expense Tracker** tool.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React 18 + Vite 5 |
| UI Components | MUI v5 (Material UI) |
| Routing | React Router v6 |
| Data Fetching / Mutations | TanStack Query v5 |
| Persistence | `localStorage` (custom `useLocalStorage` hook) |
| Date Formatting | `date-fns` v3 |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# 1. Extract the zip and navigate into the folder
cd personal-hub

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
# → App runs at http://localhost:3000
```

### Production Build

```bash
npm run build
# Output: dist/ folder — deploy to any static host (Vercel, Netlify, GitHub Pages, etc.)

npm run preview
# Preview the production build locally
```

---

## Project Structure

```
src/
├── components/
│   └── AppLayout.jsx        # Sticky header with back/home navigation + breadcrumbs
├── hooks/
│   └── useLocalStorage.js   # Generic localStorage ↔ React state hook
├── lib/
│   └── sheetsApi.js         # Google Sheets API v4 helpers (metadata + append)
├── pages/
│   ├── IndexPage.jsx         # "/" — landing with Portfolio / My Tools cards
│   ├── PortfolioPage.jsx     # "/portfolio" — Under Development placeholder
│   ├── MyToolsPage.jsx       # "/my-tools" — tools grid
│   └── expense/
│       └── ExpensePage.jsx   # "/my-tools/expense" — expense tracker
├── App.jsx                   # Route definitions
├── main.jsx                  # ReactDOM entry
└── theme.js                  # MUI dark theme (teal + indigo accents, Sora + DM Sans fonts)
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Landing — pick Portfolio or My Tools |
| `/portfolio` | Public portfolio (under development) |
| `/my-tools` | Personal tools dashboard |
| `/my-tools/expense` | Expense tracker linked to Google Sheets |

---

## Expense Tracker — Setup Guide

### How it works

The Expense Tracker appends a new row to a Google Sheet tab every time you submit the form.  
It uses the [Google Sheets API v4 `values.append`](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append) endpoint, which **automatically finds the last populated row** and writes below it — no counter or helper cell required.

### Expected Sheet Columns

Your Google Sheet should have these columns (in order):

| Column | Field | Format |
|---|---|---|
| A | Date | `dd/MM/yy HH:mm` |
| B | Payment Method | Free text |
| C | Description | Free text |
| D | Category | One of the predefined values |
| E | Amount Paid | `Rpxxx,xxx` |
| F | References | Free text |

Add a header row (row 1) with these labels — the app will always append after the last row.

---

### Authentication (Important)

The Google Sheets API **requires authentication for write operations**. There are two ways:

#### Option A — OAuth Bearer Token (Recommended for personal use)

1. Go to [Google OAuth Playground](https://developers.google.com/oauthplayground)
2. In the list on the left, find **Google Sheets API v4** and select the scope:  
   `https://www.googleapis.com/auth/spreadsheets`
3. Click **Authorize APIs** → sign in with your Google account
4. Click **Exchange authorization code for tokens**
5. Copy the **Access token** (starts with `ya29.`)
6. Paste it into the **API Key / Bearer Token** field in the app

> ⚠️ Bearer tokens expire in **~1 hour**. Repeat these steps when it expires.  
> For a long-term solution, consider setting up a service account (see Option B).

#### Option B — Service Account (Long-lived, no expiry)

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → enable the **Google Sheets API**
3. Go to **IAM & Admin → Service Accounts** → create a new service account
4. Download the JSON key file
5. Share your Google Sheet with the service account email (e.g. `my-sa@project.iam.gserviceaccount.com`) with **Editor** access
6. Use a tool like [oauth2l](https://github.com/google/oauth2l) or a small script to exchange the JSON key for a Bearer token, then paste it into the app

#### Option C — API Key Only (Read-only, limited)

A plain Google API key (`AIza...`) works only for **reading** public sheets, not writing.  
If you still want to use an API key, your sheet would need to be publicly editable — which is generally not recommended.

---

### Finding Your Spreadsheet ID and GID

**Spreadsheet ID** — from your Google Sheets URL:
```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit#gid=[GID]
```

**GID** — the sheet tab ID, also in the URL after `#gid=`.  
The first/default tab typically has GID `0`.

---

### localStorage Keys

The app stores these keys in `localStorage`:

| Key | Value |
|---|---|
| `pjh_sheets_api_key` | Your API key or Bearer token |
| `pjh_sheet_configs` | Array of `{ id, alias, spreadsheetId, gid }` |

Clear them via browser DevTools → Application → Local Storage if needed.

---

## Adding More Tools

To add a new tool to **My Tools**:

1. Create a page component in `src/pages/your-tool/YourToolPage.jsx`
2. Add a route in `src/App.jsx`:
   ```jsx
   <Route path="/my-tools/your-tool" element={<YourToolPage />} />
   ```
3. Add a card entry in `src/pages/MyToolsPage.jsx` in the `TOOLS` array:
   ```js
   {
     id: 'your-tool',
     path: '/my-tools/your-tool',
     label: 'Your Tool',
     sub: 'Description of what it does',
     icon: YourIcon,
     accent: '#color',
     status: 'Active',
     statusColor: '#34D399',
   }
   ```

---

## Deployment

The app is a static SPA. Deploy the `dist/` folder to any static host.

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag-and-drop the dist/ folder at netlify.com/drop
```

### GitHub Pages
Add `base: '/your-repo-name/'` to `vite.config.js`, then:
```bash
npm run build
# Push dist/ to the gh-pages branch
```

> If deploying to a sub-path, update the `basename` prop on `<BrowserRouter>` in `App.jsx` to match.

---

## Design System

- **Background**: `#0B0F1A` (deep navy)
- **Paper surfaces**: `#141826`
- **Primary accent**: `#00E5C3` (teal)
- **Secondary accent**: `#818CF8` (indigo)
- **Heading font**: [Sora](https://fonts.google.com/specimen/Sora) (Google Fonts)
- **Body font**: [DM Sans](https://fonts.google.com/specimen/DM+Sans) (Google Fonts)

---

## License

Personal use. No license — do whatever you want with it.

# Dynamic Portfolio: Frontend ↔ Backend Integration

Connect the React portfolio frontend to the Spring Boot backend so all data is fetched from `GET /public/profile` and managed via `/admin/*` CRUD endpoints. Current hardcoded data is preserved as fallback defaults.

## Data Mapping (Frontend → Backend)

| Frontend Section | Data Source | Backend Entity | Gaps |
|---|---|---|---|
| **CoverPage** | name, title, image, tagline | `Profile` | Missing: `tagline`, `phone`, `location`, `cvUrl`, `philosophy` |
| **AboutPage** | intro, focus cards, timeline, philosophy | `Profile` + `Experience` | Focus cards stay hardcoded (static UI) |
| **SkillsPage** | devops skills + tech stack + competencies | `Skills` + `TechnologyStack` | Missing: `Skills.category` to separate DEVOPS/COMPETENCY |
| **ProjectsPage** | project cards | `Project` | Missing: `subtitle`, `dockerLink` |
| **ContactPage** | email, phone, location, social links, CV | `Profile` | Phone/location/cvUrl missing from Profile |

---

## Proposed Changes

### Backend — Entity Enhancements

#### [MODIFY] [Profile.java](file:///Users/monusiddiki/Developer/portfolio/monu-demo-port/src/main/java/com/example/monudemoport/entity/Profile.java)
Add fields to match all frontend display data:
```diff
 private String name;
 private String title;
+private String subtitle;       // "DevOps Engineer & Full Stack Developer"
 private String bio;
+@Column(columnDefinition = "TEXT")
+private String philosophy;     // AboutPage philosophy text
+private String tagline;        // "Building scalable solutions..."
 private String email;
+private String phone;
+private String location;
 private String github;
 private String linkedin;
 private String imageUrl;
+private String cvUrl;
```

#### [MODIFY] [Skills.java](file:///Users/monusiddiki/Developer/portfolio/monu-demo-port/src/main/java/com/example/monudemoport/entity/Skills.java)
Add category to distinguish DevOps skills from competencies:
```diff
 private String name;
 private String level;
+private String category;   // "DEVOPS" or "COMPETENCY"
```

#### [MODIFY] [Project.java](file:///Users/monusiddiki/Developer/portfolio/monu-demo-port/src/main/java/com/example/monudemoport/entity/Project.java)
Add subtitle and docker link:
```diff
 private String title;
+private String subtitle;       // "SaaS eCommerce Platform"
 private String description;
 private String techStack;      // comma-separated: "React,Spring Boot,PostgreSQL"
 private String githubLink;
 private String liveLink;
+private String dockerLink;
```

---

### Backend — CORS & Bug Fixes

#### [MODIFY] [SecurityConfig.java](file:///Users/monusiddiki/Developer/portfolio/monu-demo-port/src/main/java/com/example/monudemoport/security/SecurityConfig.java)
Add CORS configuration so the React frontend can call the backend:
- Add a `CorsConfigurationSource` bean allowing `http://localhost:3000` (dev) and the production frontend URL
- Enable `.cors(cors -> cors.configurationSource(...))` in the filter chain

#### [MODIFY] [ProjectController.java](file:///Users/monusiddiki/Developer/portfolio/monu-demo-port/src/main/java/com/example/monudemoport/controller/admin/ProjectController.java)
Fix missing `@RequestBody` and `@PathVariable` annotations on save/update/delete methods.

---

### Frontend — API & Context Layer

#### [NEW] [api.js](file:///Users/monusiddiki/Developer/portfolio/frontend/src/services/api.js)
Axios-based API service with:
- `fetchPortfolio()` → `GET /public/profile`
- Admin CRUD methods for each entity (profile, skills, techStack, projects, experience, contacts)
- All admin calls use Basic Auth header (`admin:admin123`)

#### [NEW] [PortfolioContext.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/context/PortfolioContext.jsx)
React Context that:
- Calls `fetchPortfolio()` on mount
- Provides portfolio data (profile, skills, techStack, projects, experience) to all child components
- Falls back to hardcoded defaults if API fails or returns empty
- Exposes `loading` and `error` states

#### [NEW] [defaults.js](file:///Users/monusiddiki/Developer/portfolio/frontend/src/data/defaults.js)
Extract all current hardcoded values into a defaults file:
- Default profile (name, title, subtitle, email, github, linkedin, imageUrl, etc.)
- Default skills, techStack, projects, experiences
- Used as fallback when backend returns null/empty

---

### Frontend — Page Components (Dynamic Data)

Each page component will be updated to consume data from `PortfolioContext` instead of hardcoded values. Current hardcoded values become defaults.

#### [MODIFY] [BookPortfolio.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/components/BookPortfolio.jsx)
- Wrap pages with `PortfolioProvider`
- Show loading skeleton while data is being fetched

#### [MODIFY] [CoverPage.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/components/pages/CoverPage.jsx)
- Use `usePortfolio()` → `profile.name`, `profile.title`, `profile.imageUrl`, `profile.tagline`

#### [MODIFY] [AboutPage.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/components/pages/AboutPage.jsx)
- Use `usePortfolio()` → `profile.bio`, `profile.philosophy`, `experience` list
- Focus cards remain hardcoded (static UI elements with icons)

#### [MODIFY] [SkillsPage.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/components/pages/SkillsPage.jsx)
- Use `usePortfolio()` → `skills` (filter by category DEVOPS/COMPETENCY), `technologyStacks`

#### [MODIFY] [ProjectsPage.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/components/pages/ProjectsPage.jsx)
- Use `usePortfolio()` → `projects` list

#### [MODIFY] [ContactPage.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/components/pages/ContactPage.jsx)
- Use `usePortfolio()` → `profile.email`, `profile.phone`, `profile.location`, `profile.github`, `profile.linkedin`, `profile.cvUrl`

---

### Frontend — Admin Panel

#### [NEW] [AdminLayout.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/components/admin/AdminLayout.jsx)
Admin dashboard layout with sidebar navigation for each entity section.

#### [NEW] [AdminLogin.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/components/admin/AdminLogin.jsx)
Simple login form (username/password) using Basic Auth. Stores credentials in sessionStorage.

#### [NEW] [ProfileForm.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/components/admin/ProfileForm.jsx)
Form to edit profile data (name, title, subtitle, bio, email, phone, etc.) using `react-hook-form` + shadcn `Input`, `Textarea`, `Button`.

#### [NEW] [SkillsManager.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/components/admin/SkillsManager.jsx)
List + Add/Edit/Delete skills. Uses shadcn `Dialog` for forms.

#### [NEW] [ProjectsManager.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/components/admin/ProjectsManager.jsx)
List + Add/Edit/Delete projects.

#### [NEW] [ExperienceManager.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/components/admin/ExperienceManager.jsx)
List + Add/Edit/Delete experiences.

#### [NEW] [TechStackManager.jsx](file:///Users/monusiddiki/Developer/portfolio/frontend/src/components/admin/TechStackManager.jsx)
List + Add/Edit/Delete technology stack entries.

#### [MODIFY] [App.js](file:///Users/monusiddiki/Developer/portfolio/frontend/src/App.js)
Add React Router:
- `/` → BookPortfolio (public portfolio)
- `/admin` → AdminLogin
- `/admin/dashboard` → AdminLayout with nested forms

---

## Open Questions

> [!IMPORTANT]
> **About Focus Cards (AboutPage)**: The 4 focus cards (Container Orchestration, CI/CD Pipelines, Cloud Solutions, Full Stack Development) use Lucide icons and are tightly coupled to the UI. Should these remain hardcoded, or do you want them to be dynamic too? Making them dynamic would require storing icon names in the DB and mapping them to Lucide components.

> [!IMPORTANT]
> **Contact Entity**: The backend has a `Contact` entity with `email, phone, message`. The frontend's ContactPage shows the owner's contact info (email, phone, location) which I'm adding to `Profile`. Should the `Contact` entity be repurposed as a "visitor message" form (contact-us submissions), or do you want it removed from the public API response?

---

## Verification Plan

### Automated Tests
1. Start the Spring Boot backend → verify `GET /public/profile` returns the full PortfolioResponse
2. Start the React frontend → verify it renders with data from the backend
3. If backend is down → verify frontend gracefully falls back to default hardcoded data
4. Test admin CRUD: create/update/delete skills, projects, experiences via the admin panel

### Manual Verification
- Navigate through all portfolio pages to confirm data renders correctly
- Log in to admin panel and modify data → confirm changes reflect on the public portfolio

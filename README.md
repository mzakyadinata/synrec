# Synrec — AI-Powered Movie Recommendation App

> Describe a movie. Get your next obsession.

Synrec is a full-stack movie discovery platform that uses AI and natural language processing to recommend films based on a synopsis you describe — not just ratings or genres. Write a story idea, pick a template, or type in Indonesian and let Synrec handle the rest.

---

## Features

- **AI Recommendations** — describe a movie plot and get 5 personalized picks powered by a cosine-similarity ML model
- **Bilingual Input** — write in English or Indonesian; auto-translated before being sent to the AI
- **Favorites** — like any movie from recommendations or the popular list; saved to your account
- **Popular Movies** — top 10 trending films from TMDB, cached locally for 12 hours
- **Last Recommendation** — your most recent AI-generated picks saved for 24 hours on your dashboard
- **Authentication** — JWT-based sign up / sign in with 1-day token expiry
- **Fully Responsive** — mobile-first, works on all screen sizes
- **Cinematic UI** — dark theme, smooth scroll animations, gradient accents

---

## Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 19 + Vite | UI framework & build tool |
| Tailwind CSS v4 | Styling |
| React Router v7 | Client-side routing |
| Lucide React | Icons |
| AOS | Scroll animations |

### Backend (separate repo)
| Tech | Purpose |
|---|---|
| Node.js + Express | REST API server |
| Supabase (PostgreSQL) | Database |
| JWT | Authentication |
| TMDB API | Movie data & posters |
| Python ML Service | Cosine similarity recommendation model |
| franc + bad-words | Synopsis content filtering |

---

## Project Structure

```
src/
├── assets/
├── components/
│   ├── landing-page/        # HeroSlider, AboutSection, FeaturesSection, HowItWorksSection
│   ├── AuthLayout.jsx
│   ├── ConfirmDialog.jsx
│   ├── FilmCard.jsx
│   ├── FilmCarousel.jsx
│   ├── LoadingScreen.jsx
│   ├── MovieOverlay.jsx
│   ├── Navbar.jsx
│   ├── RouteGuards.jsx
│   └── SignUpSuccess.jsx
├── context/
│   ├── AuthContext.jsx
│   └── useAuth.js
├── hooks/
│   └── useFavorites.js
├── pages/
│   ├── Home.jsx
│   ├── LandingPage.jsx
│   ├── Dashboard.jsx
│   ├── FavoritesPage.jsx
│   ├── PickFavorites.jsx
│   ├── RecommendationsPage.jsx
│   ├── SignIn.jsx
│   ├── SignUp.jsx
│   └── NotFound.jsx
├── routes/
│   └── index.jsx
├── services/
│   ├── authApi.js
│   ├── movieApi.js
│   └── translationService.js
└── index.css
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running [Synrec Backend](https://github.com/your-username/synrec-backend)

### Installation

```bash
git clone https://github.com/your-username/synrec-frontend.git
cd synrec-frontend
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
VITE_TMDB_BACKDROP_BASE_URL=https://image.tmdb.org/t/p/original
```

### Run

```bash
npm run dev
```

---

## App Flow

```
Landing Page (guest)
    │
    ├── Sign Up → Success Modal → Sign In
    │
    └── Sign In
            │
            ▼
        Dashboard (/)
            │
            ├── Popular Right Now     (TMDB, cached 12h)
            ├── Last Recommendation   (localStorage, 24h)
            │
            └── Try AI Recommendations
                        │
                        ▼
                /pick-favorites
                (select template or write custom synopsis)
                        │
                        │  Indonesian auto-translated → English
                        │  Backend: length + gibberish + profanity + similarity threshold
                        │
                        ▼
                /pick-favorites/recommendations
                (results with poster carousel + heart buttons)
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | — | Register new user |
| `POST` | `/auth/login` | — | Login, returns JWT |
| `GET` | `/movies/popular` | — | Top 10 popular movies |
| `POST` | `/movies/recommend` | Bearer | AI movie recommendations |
| `GET` | `/favorites` | Bearer | Get user's favorites |
| `POST` | `/favorites` | Bearer | Add to favorites |
| `DELETE` | `/favorites/:movieId` | Bearer | Remove from favorites |

---

## How the AI Recommendation Works

1. User picks a synopsis template or writes their own
2. If Indonesian is detected → auto-translated to English via [MyMemory API](https://mymemory.translated.net/doc/spec.php)
3. Backend validates the synopsis (min length, gibberish detection, profanity filter, similarity threshold)
4. Synopsis sent to the Python ML model service
5. Model returns top 5 movies ranked by cosine similarity score
6. Backend enriches results with TMDB poster, backdrop, and metadata
7. Results saved to `localStorage` for 24 hours and shown in the dashboard

---

## localStorage Cache

| Key | TTL | Content |
|---|---|---|
| `token` | 24h | JWT auth token |
| `user` | 24h | User object |
| `token_saved_at` | — | Timestamp for token expiry check |
| `neuroflix_popular` | 12h | Top 10 popular movies |
| `neuroflix_last_recommendations` | 24h | Last AI recommendation result |

---

## Related Repositories

- **Backend** — [synrec-backend](https://github.com/faiztzy/film-backend.git)
- **ML Model** — [synrec-model](https://github.com/mzakyadinata/movie-model-service.git)

---

## Team

Built as a Capstone Project.

| Name | Role |
|---|---|
| Muhammad Zaky | Frontend Developer |
| — | Backend Developer |
| — | ML Engineer |

---

## License

Educational use — university capstone project.

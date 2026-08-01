# CHANGELOG - AI Career Coach

All notable changes, bug fixes, and feature additions to the AI Career Coach project are documented in this file.

## [5.0.0] - 2026-07-27

### 🚀 Major Release: Production-Ready Modular SaaS Platform Architecture
- **Clean Folder Structure**:
  - Rebuilt styling system into `frontend/css/` (`variables.css`, `auth.css`, `dashboard.css`, `sidebar.css`, `cards.css`, `forms.css`, `components.css`, `modals.css`, `responsive.css`).
  - Rebuilt data layers into `frontend/data/` (`roles.js`, `companies.js`, `jobs.js`, `colleges.js`, `roadmaps.js`, `database.js`, `knowledge.js`).
  - Rebuilt core functional services into `frontend/js/` (`utils.js`, `auth.js`, `google-auth.js`, `navigation.js`, `app.js`).
- **Preserved Design Language & Aesthetics**:
  - Maintained dark glassmorphism card theme, purple/teal gradients, rounded borders, soft glow shadows, and Lucide icons library integration.
- **Preserved Feature Capabilities**:
  - Retained Centralized Auth State Management (`setApplicationState`, `showAuthView`), Google OAuth, Searchable Tamil Nadu College Combobox, 19-table MySQL Explorer, 20+ Company Prep guides, 25+ Corporate Jobs, ATS Resume Analyzer, Skill Gap Coach, and Learning Roadmaps.

## [4.0.0] - 2026-07-27

### 🛠 System Audit & Restoration Release
- Centralized auth controllers and isolated `DOMContentLoaded` module initialization steps.

---
*Maintained by AI Career Coach Team*

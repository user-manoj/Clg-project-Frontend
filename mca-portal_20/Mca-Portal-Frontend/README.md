# NexusCS — MCA Department Portal

A React-based portal for an MCA department that provides students with study materials, online tests, notices, previous-year question papers, faculty information, and performance reports. Lecturers can manage academic content through a dedicated workspace.

## 🚀 Features

* 📚 Study notes with filtering
* 📝 Previous-year question papers
* 🧪 Online MCQ tests and results
* 📢 College notice board
* 📊 Student performance reports
* 👨‍🏫 Faculty information
* 👨‍💼 Lecturer workspace for managing content

## 🛠️ Tech Stack

* React 18
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React

## 📁 Project Structure

```text
src/
├── api/           # API communication
├── components/    # Reusable UI components
├── context/       # Shared state
├── data/          # Mock data
└── pages/         # Application pages
```

## ⚙️ Getting Started

### Prerequisites

* Node.js 18+
* npm

### Installation

```bash
git clone <YOUR_REPOSITORY_URL>
cd <PROJECT_DIRECTORY>
npm install
```

### Run the application

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## 🔗 Backend

The frontend is designed to integrate with the **NexusCS Spring Boot REST API**.

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

The Axios client is configured to use this URL and supports JWT-based authentication.

## 📦 Production Build

```bash
npm run build
```

---

**NexusCS** — MCA Department Portal
**Frontend:** React + Vite + Tailwind CSS
**Backend:** Spring Boot + MySQL

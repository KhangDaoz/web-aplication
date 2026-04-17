# Web Application

Du an fullstack don gian gom:
- Frontend: React (react-router-dom, react-hook-form)
- Backend: Express

## Cau truc thu muc

- backend: API server
- frontend: giao dien React

## Yeu cau

- Node.js 18+ (khuyen nghi)
- npm

## Cai dat

Chay tung lenh sau:

```bash
cd backend
npm install
```

```bash
cd ../frontend
npm install
```

## Chay du an (development)

Can 2 terminal:

Terminal 1 (backend):

```bash
cd backend
npm run dev
```

Backend chay tai: http://localhost:5001

Terminal 2 (frontend):

```bash
cd frontend
npm start
```

Frontend mac dinh: http://localhost:3000

## Tai khoan dang nhap test

- username: `admin`
- password: `123`

## Tinh nang chinh

- Xem danh sach bai viet
- Xem chi tiet bai viet theo slug
- Them comment cho bai viet
- Dang nhap va truy cap route bao ve (`/stats`, `/newpost`)
- Tao bai viet moi

## API backend

- `GET /`
- `GET /api/posts`
- `GET /api/post/:slug`
- `POST /api/login`
- `POST /api/post`
- `POST /api/post/:slug/comment`

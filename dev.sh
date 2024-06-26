#!/bin/bash

# chmod +x dev.sh

(cd frontend && npm i)
(cd backend && composer install && php spark migrate && php spark db:seed UserSeeder)

tmux new-session -d -s frontend 'cd frontend && npm run dev'
tmux new-session -d -s backend 'cd backend && php spark serve --host 0.0.0.0'

clear

echo "🚀 Backend running at http://localhost:8080"
echo "🚀 Frontend running at http://localhost:3000"
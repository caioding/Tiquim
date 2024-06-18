copy:
	cp .env.example .env
	cp backend/.env.example backend/.env

up:
	docker compose up 

down:
	docker compose down

migrate:
	docker exec -it backend_crowdspark npx prisma migrate dev

seed:
	docker exec -it backend_crowdspark npx prisma db seed
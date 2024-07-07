copy:
	cp .env.example .env
	cp backend/.env.example backend/.env

up:
	docker compose up 

down:
	docker compose down

down-rmi:
	docker compose down --rmi local

down-volume:
	docker compose down --rmi local -v

migrate:
	docker exec -it backend_crowdspark npx prisma migrate dev

seed:
	docker exec -it backend_crowdspark npx prisma db seed

swagger:
	docker exec -it backend_crowdspark npx ts-node src/swagger.ts
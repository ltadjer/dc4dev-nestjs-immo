.PHONY: up
up:
	docker-compose up -d

.PHONY: dev
dev: up
	npm install
	npm run start:dev
#CORE DATABASE
run-database:
	docker compose -f docker/compose.yml up -d

stop-database:
	cd docker
	docker compose -f docker/compose.yml down -v

reload-database:
	rm -r docker/mariadb
	make stop-database
	make run-database

#CORE APP
build-app:
	git pull
	npm i
	npm run build

run-app:
	make stop-app
	npm run pm2

stop-app:
	@npm run pm2:stop || true
	@npm run pm2:delete || true



#DEVELOPMENT
dev:
	npm run dev



#MANAGEMENT
init:
	make run-database
	make build-app
	make run-app
	@echo "\\n\033[32m○  Uruchom aplikację \033[33mmake up\033[0m"

update:
	make build-app
	@echo "\\n\033[32m○  Aktualizacja zakończona teraz uruchom aplikacje \033[33mmake up\033[0m"

up:
	make run-database
	make stop-app
	make run-app
	@echo "\\n\033[32m○  Aplikacja uruchomiona\033[0m"
	make monitor

stop:
	make stop-database
	make stop-app
	@echo "\\n\033[31m○  Aplikacja zatrzymana\033[0m"

restart:
	make stop-database
	make stop-app
	make run-database
	make run-app
	@echo "\\n\033[32m○  Aplikacja została zrestartowana\033[0m"

monitor:
	npm run pm2:monitor
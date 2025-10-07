#CORE DATABASE
start-database:
	docker compose -f docker/compose.yml -p dance up -d
	@echo "\\n\033[32m○  Baza danych uruchomiona\033[0m"

stop-database:
	cd docker
	docker compose -f docker/compose.yml -p dance down -v
	@echo "\\n\033[31m○  Baza danych zatrzymana\033[0m"

restart-database:
	make stop-database
	make start-database

reload-database:
	@read -p "⚠️  This will remove the database and restart it. Continue? (y/N) " ans; \
	if [ "$$ans" = "y" ] || [ "$$ans" = "Y" ]; then \
		rm -r docker/mariadb; \
		$(MAKE) stop-database; \
		$(MAKE) start-database; \
		echo "\\n\033[34m○  Baza przeładowana: usunięto dane, utworzono nowe tabele.\033[0m"; \
	else \
		echo "❌ Aborted."; \
	fi

#CORE APP
build-app:
	git pull
	npm i
	npm run build

start-app:
	make stop-app
	npm run pm2
	@echo "\\n\033[32m○  Aplikacja uruchomiona\033[0m"

stop-app:
	@npm run pm2:stop || true
	@npm run pm2:delete || true
	@echo "\\n\033[31m○  Aplikacja zatrzymana\033[0m"



#DEVELOPMENT
dev:
	npm run dev



#MANAGEMENT
init:
	make start-database
	make build-app
	make start-app
	make monitor

update:
	make build-app
	@echo "\\n\033[32m○  Aktualizacja zakończona, teraz uruchom aplikacje \033[33mmake up\033[0m"

up:
	make start-database
	make stop-app
	make start-app
	make monitor

stop:
	make stop-database
	make stop-app

restart:
	make stop-database
	make stop-app
	make start-database
	make start-app

monitor:
	npm run pm2:monitor
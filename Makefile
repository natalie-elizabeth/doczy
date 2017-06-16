compose:
		cd docker && docker-compose up --build

build:
		npm run build

ssh_app:
	npm run ssh:app

start:
		npm run start:dev:server

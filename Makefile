slinky-build:
	cd slinky; \
	docker build -t slinky:build .

slinky-run: slinky-build
	cd slinky; \
	docker run --rm -p 5000:5000 slinky:build

slinky-test:
	cd slinky; \
	docker build --target=test -t slinky:test .

text-build:
	cd text; \
	docker build -t text:build .

text-run: text-build
	cd text; \
	docker run --rm -p 5000:5000 text:build

text-test:
	cd text; \
	docker build --rm --target test text:test

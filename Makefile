.PHONY: help info

SHELL = /bin/sh
CURRENT_FOLDER = $(shell pwd)

create: ## Adds a new post {TITLE}
	./scripts/create $(TITLE)

help: ## List all available rules
	@echo "Available rules:";
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL = help

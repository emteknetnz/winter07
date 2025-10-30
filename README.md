Test app using github copilot-cli with default Claude Sonnet 4.5 as agent

## Build and run the docker container

docker build -t winter07 .

docker run -e GH_TOKEN=<TOKEN> -v $(pwd):/app -w /app -it winter07

/login once inside the container the authenticate with github

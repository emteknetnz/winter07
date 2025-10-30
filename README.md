Test app using github copilot-cli with default Claude Sonnet 4.5 as agent

I used a pretty bad prompt.md to attempt to one-shot and it a really did a good job.


## Build and run the docker container

docker build -t winter07 .

docker run -e GH_TOKEN=<TOKEN> -v $(pwd):/app -w /app -it winter07

/login once inside the container the authenticate with github

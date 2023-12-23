docker run -p 80:80 vite-app

docker build -t vite-dev . -f DockerfileDev

docker build -t vite-app2 -f DockerfileDev .

docker run -v ${PWD}:/app -p 3000:3000 vite-dev

HELLO DOCKER
docker run -v ${PWD}:/app -p 3000:3000 vite-dev

docker run -v ${PWD}:/app -p 3000:3000 vite-app-win

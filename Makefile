build:
	sudo docker build -t dockerfile-test .
run:
	sudo docker run -d --rm -p 8081:8080 --name dockerfile-test dockerfile-test
stop:
	sudo docker stop dockerfile-test
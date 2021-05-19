FROM jenkins/jenkins:lts
USER root
RUN apt-get update
RUN apt-get install sudo -y
#RUN echo "jenkins:mipassword00s" | sudo chpasswd
RUN echo "jenkins ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

USER root
RUN apt-get update && apt-get install sudo

# Use docker daemon of host, no work ip-tables compatibilty
#RUN curl -fsSL https://get.docker.com -o get-docker.sh
#RUN sudo sh get-docker.sh

#Install dockercompose 
RUN sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN sudo chmod +x /usr/local/bin/docker-compose

USER jenkins

#sudo docker build --tag mijenkins .
#sudo docker run -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/local/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock  mijenkins


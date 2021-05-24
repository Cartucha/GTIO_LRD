provider "aws" {
  region = "us-east-1"
}

resource "aws_key_pair" "deployer" {
  key_name   = "deployer-key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDWOlrRkRzEqiajZ78t2gT7aagnd+aG665rhSId75KmOI3fGmM+A3BVUIeEoaXl3Rv4R7aQfSWXmHJgDSGozJnJsMCChZzGhzUQOWds2kTlVN2YBKYur6vaTAJxZxdEutpBb0P1J2uLctli/Zw4nxchzDr+nUNgs2MEVwg/WzRENG8GJFza62FKsbmh8Twr3JyJARVbnxiEnjPgQLxJj4oRvNWMvj/EoLlI9+TqU2NNFOEOD+ONfjcVHHvwr5tqyQZqWqHRwcicB+F8oe1ms9sDtBoktRcA8YzXRpO9iM8IH3DVCWuCHOqdkX95z4jxZMmcrcz0dXofgIFF00TUr0s1 dmarzo@rednet-laptop-a001"
}

resource "aws_instance" "replicador" {
  ami           = "ami-0babb0c4a4e5769b8"
  instance_type = "t2.medium"
  key_name = "deployer-key"
  vpc_security_group_ids = [aws_security_group.frontal.id]

  user_data = <<-EOF
              #!/bin/bash
              sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
              sudo chmod +x /usr/local/bin/docker-compose
              #Instalar aplicacion
              cd /home/ec2-user/
              sudo curl -L https://github.com/Cartucha/GTIO_LRD/archive/refs/heads/main.zip -o replicator.zip
              sudo yum install unzip -y
              unzip replicator.zip
              rm -rf replicator.zip
              cd GTIO_LRD-main
              nohup docker-compose up -d --build > ../composeup.log &
              EOF
  tags = {
    Name = "replicador-monolito"
  }
}

resource "aws_security_group" "frontal" {
  name = "replicador-frontal"
  ingress {
    from_port   = 88
    to_port     = 88
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }
}

output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.replicador.public_ip
}

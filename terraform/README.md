Instalar el cliente de aws
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
     && unzip awscliv2.zip \ 
     && sudo ./aws/install
     
# Ejemplo de uso:
$ aws --version
> aws-cli/2.2.2 Python/3.8.8 Linux/4.15.0-135-generic exe/x86_64.ubuntu.18 prompt/off
# Configurar las credenciales
$ aws configure


 
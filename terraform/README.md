
== Terraform

# Iniciar sesión https://www.awseducate.com/signin/SiteLogin e con correo like marzo.48821@e.unavarra.es
# Las credenciales son solo validas para una sesión de max 3h
 
=== Instalar terraform 

wget https://releases.hashicorp.com/terraform/0.15.4/terraform_0.15.4_linux_amd64.zip 
unzip terraform_0.15.4_linux_amd64.zip 
sudo mv terraform /usr/local/bin/
terraform -v
    Terraform v0.15.4
    on linux_amd64

=== Configurar las credenciales de acceso a aws (cambian en cada sesión)
export AWS_ACCESS_KEY_ID=ASIA4HBFJCOZUZSGNMAQ
export AWS_SECRET_ACCESS_KEY=lW07hOzOJRCB5hnl8vhV0/UR8YsNzDU9ajSo0DMb
export -p | grep AWS_

#Al ser una cuenta aws educate, es necesario tambien
export AWS_SESSION_TOKEN=IQoJb3JpZ2luX2VjEFAaCXVzLXdlc3QtMiJGMEQCIF3hZik6vlaJXbKsdNhu5iDYmBQcBMEMBGFKhDvqHzFFAiBPgwC9tfVw7xaYXgeZMA7EzT/DUsM+CD1pbYgCfaG7lSq7Agjp//////////8BEAAaDDgzOTc0NDI5NTg1OSIM63zo+rou6ffKrKjDKo8Cspr5Whh1GF/SIntinYktvy6mOppa3hxwiKSi/vVnVkMr0Solzf8WjuOhK/drTrCkRRsXWB14VLe8ONo9+lJJt5X9bptD+eB6oiV0eJPxzm9BnWCCrKqFI3oRCI6fcxI6J9IStVj8HdvhkS9sOZmgn7TzDBIinWvNPpoHexBnGj9770zU13MC2cSqxGsoRy0+Bi2mRJB8ShEs06hjwMTg/Wb1xLPbA6VvoOiNQ74ty/LpAUpoeSlEnJB6TOrYxa4kiBUKd5irE/fvKjpRGrPzPwteLliD3TTQ5k/TbSeTgi+aqmz4Xo8xbPm9uNlbFlUXmgZe709sb3DDvaz9r1f1KOv9DIXZ5Jy7M1r1v+OdKjC/sa2FBjqeAQ/cbRNCWNB1P6nQYjfarwpaeJURTgVcqHDLsG+GlI6fxKq7mf5GKR3Z3Y/qa+pdiMb+C2B2iaCL+IiUBiJPELl4/vkfNoB9Hld8IMdHbfP5tXBJWa0Nt7mTIwwHb+c8AADjNjoF75I42GSK4rbpRgUVSXb8b/y1A0moYovhCDV+QKMbx/wvupe+bImIu+S7/q00aat+aX31ts0yQxox

=== Operar con terraform
cd ./terraform
terraform init

# se puede ver que hara al aplicar main.tf
terraform plan

# aplicarlo sin preguntar
terraform apply -auto-approve

# destruir todos los recursos generador
terraform apply -destroy

#TODO
 - Seguir ejemplo https://blog.gruntwork.io/an-introduction-to-terraform-f17df9c6d180 (no conecta por http -> configurar acceso ssh)
 - Como subir al registro de amazon las imagenes de docker generador en jenkins, o generarlas en amazon
 - Ejecutar docker-compose up en una magina grande
 - Configurar cluster ecs para cada componente

# Como crear clave publica/privada para conectar
$ cd ~/.ssh/ && ssh-keygen -m PEM

# Como conectar por ssh a la instancia
terraform output 
ssh -i ~/.ssh/aws_replicador ec2-user@52.6.42.100

=== Pruebas con el cli de aws

curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
     && unzip awscliv2.zip \ 
     && sudo ./aws/install
     
# Ejemplo de uso:
$ aws --version
$ aws-cli/2.2.2 Python/3.8.8 Linux/4.15.0-135-generic exe/x86_64.ubuntu.18 prompt/off
# Configurar las credenciales
# Iniciar sesión e con correo like marzo.48821@e.unavarra.es
# Las credenciales cambian cada vez que se inciia sesión, sobreescribir ~/.aws/crendentials     
[default]
aws_access_key_id=ASIA4HBFJCOZSXV3QVHZ
aws_secret_access_key=+/EnodBxGTOqFgqFBT18ZSjEfS2Vm/ee3sa+Gp3h
aws_session_token=IQoJb3JpZ2luX2VjEAcaCXVzLXdlc3QtMiJGMEQCIBCFL3ievFVKNxB3YDj4s7X2ILGs+x238njKPtbBd/t3AiALBwCs+lFM4an5gSiqorDc+wH8f+qk94oQiaC97QLPvyq7AgiQ//////////8BEAAaDDgzOTc0NDI5NTg1OSIMNlEhYufSSq+K2+T6Ko8CYVuSpu2dGcGA0EKetC+x9ULeBbxts2lkMMtQ0UYbmJm/1RAouD4DbXFFq4DyTMBFMn1F831o3t7b6eoC7F5rbYidTrxBHLksegAJtzLJ4p4yoTsPZgQ6hE2hZsCMsD8W5KpSsrWA2c/0Fe+ov1YBcXjqo2OphCaJkUhVqn09m5tQkUWX6TP1q3Z7FeUHHYIf4xTLH3QgmbYfjnOrzpOnVBpVKj05G51E9A0OH4hQUYoD71F0NgMRtGMoNre6awC34WRiORJvQ6qAzjw2/x0VooiM3rAHbNZ/1GBqoUI9wk0hsNmC3QheyOHSwx4q6p/OYqzDelGuyYIx2c3a4xfzuRY5QQNaX56MXL5yBxTk0zDVnOWEBjqeAah0oJEBcy1LaBzJ6VB3shokOCBiF2OgUqQIe8f/6H/gfJqT/6WLCR3NBehS+P4HNI0pf1APm76IfiBWKM8uomI6DKi/2FjGpRBcn1H8GR/LaA5/sEiZ8RozXnAxNsWaeRxp4SLXGa4FFvyvEdLdxNgcmQRfmOX2jK4u2oLHcIU/IXzG6WproP6XSZfkLPShDfWVUkFTq6j7agFq62Cs

$ aws ec2 describe-instances
{
    "Reservations": []
}

# crear una clave publica/privada para conectar
$ cd ~/.ssh/ && ssh-keygen -m PEM
# subir a la consola web de amazon la clave en instancias ec2
# TODO habilitar por comando, security group la conexion ssh a las instancias
# Ejecutar la instancia
aws ec2 run-instances --instance-type t2.micro --count 1 --region us-east-1 --key-name david --image-id resolve:ssm:/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2 
# Conectar a la instancia (si no conecta probar sudo o -v para ver log)
ssh -i id_rsa ec2-user@54.209.251.211


# Notas: Como descargar la aplicación
rm -f main.zip && rm -f ./main && wget https://github.com/Cartucha/GTIO_LRD/archive/refs/heads/main.zip && unzip main.zip


"VpcId": "vpc-b739b6ca",

# Propuesta de aitor ami-0babb0c4a4e5769b8 amzn2-ami-ecs-hvm-2.0.20210428-x86_64-ebs 
# resolve:ssm:/      ami-0bba96c31d87e65d9 amzn2-ami-hvm-2.0.20210427.0-x86_64-gp2

# Terminar todas las instancias
aws ec2 terminate-instances --instance-ids $(aws ec2 describe-instances --filters  "Name=instance-state-name,Values=pending,running,stopped,stopping" --query "Reservations[].Instances[].[InstanceId]" --output text | tr '\n' ' ')
# terminar una insancia concreta 

aws ec2 terminate-instances --instance-ids i-0675b22643af15fd7

aws ssm get-parameters-by-path --path /aws/service/ami-amazon-linux-latest --query "Parameters[].Name"
[
    "/aws/service/ami-amazon-linux-latest/amzn-ami-hvm-x86_64-ebs",
    "/aws/service/ami-amazon-linux-latest/amzn-ami-hvm-x86_64-gp2",
    "/aws/service/ami-amazon-linux-latest/amzn-ami-hvm-x86_64-s3",
    "/aws/service/ami-amazon-linux-latest/amzn-ami-minimal-hvm-x86_64-s3",
    "/aws/service/ami-amazon-linux-latest/amzn-ami-minimal-pv-x86_64-s3",
    "/aws/service/ami-amazon-linux-latest/amzn-ami-pv-x86_64-s3",
    "/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-arm64-gp2",
    "/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-ebs",
    "/aws/service/ami-amazon-linux-latest/amzn2-ami-hvm-x86_64-gp2",
    "/aws/service/ami-amazon-linux-latest/amzn2-ami-minimal-hvm-arm64-ebs",
    "/aws/service/ami-amazon-linux-latest/amzn-ami-minimal-hvm-x86_64-ebs",
    "/aws/service/ami-amazon-linux-latest/amzn-ami-minimal-pv-x86_64-ebs",
    "/aws/service/ami-amazon-linux-latest/amzn-ami-pv-x86_64-ebs",
    "/aws/service/ami-amazon-linux-latest/amzn2-ami-minimal-hvm-x86_64-ebs"
]






 
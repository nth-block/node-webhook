openssl genrsa -aes256 -out <priv_key_name> 2048

openssl req -new -sha256 -key <priv_key_name> -subj "/C=IN/ST=KA/O=Smart Widgets Corp/CN=<server_alias_or_service_name>" -reqexts SAN -config <(cat /etc/ssl/openssl.cnf <(printf "[SAN]\nsubjectAltName=DNS:<server_alias_or_service_name>,DNS:<server_fqdn_or_server_name>") -out domain.csr

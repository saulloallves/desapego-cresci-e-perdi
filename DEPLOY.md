# 🚀 Guia de Deploy - Desapego Cresci e Perdi

## 📋 Pré-requisitos no Servidor Ubuntu

- ✅ Docker instalado
- ✅ Docker Compose instalado
- ✅ Nginx instalado
- ✅ Domínio `desapego.crescieperdi.com.br` apontado para o IP do servidor (via Cloudflare)

## 📦 Passo 1: Preparar Arquivos no Servidor

### 1.1 Clonar/Enviar o Repositório

```bash
# Opção A: Clonar do GitHub
cd /var/www
git clone https://github.com/saulloallves/desapego-cresci-e-perdi.git
cd desapego-cresci-e-perdi

# Opção B: Enviar via SCP (do seu computador local)
# scp -r . usuario@servidor:/var/www/desapego-cresci-e-perdi
```

### 1.2 Criar arquivo .env

```bash
# Copiar template de produção
cp .env.production .env

# Editar se necessário (as variáveis já estão corretas)
nano .env
```

## 🐳 Passo 2: Build e Deploy do Docker

### 2.1 Dar permissão ao script de deploy

```bash
chmod +x deploy.sh
```

### 2.2 Executar deploy

```bash
./deploy.sh
```

**Ou manualmente:**

```bash
# Build da imagem
docker-compose build

# Subir containers
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f
```

### 2.3 Verificar se está rodando

```bash
# Testar localmente
curl http://localhost:3000

# Deve retornar o HTML da aplicação
```

## 🌐 Passo 3: Configurar Nginx como Proxy Reverso

### 3.1 Criar arquivo de configuração do Nginx

```bash
sudo nano /etc/nginx/sites-available/desapego.crescieperdi.com.br
```

**Cole o conteúdo do arquivo `nginx-proxy.conf`**

### 3.2 Ativar o site

```bash
# Criar symlink
sudo ln -s /etc/nginx/sites-available/desapego.crescieperdi.com.br /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Recarregar Nginx
sudo systemctl reload nginx
```

## 🔒 Passo 4: Configurar SSL com Let's Encrypt (Certbot)

### 4.1 Instalar Certbot (se ainda não tiver)

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

### 4.2 Obter certificado SSL

```bash
sudo certbot --nginx -d desapego.crescieperdi.com.br
```

**Siga as instruções:**
- Email para notificações
- Aceitar termos de serviço
- Escolher opção 2 (Redirect HTTP to HTTPS)

### 4.3 Renovação automática

```bash
# Testar renovação
sudo certbot renew --dry-run

# Certbot cria um cron job automaticamente, mas você pode verificar:
sudo systemctl status certbot.timer
```

## ✅ Passo 5: Verificações Finais

### 5.1 Testar domínio

```bash
# HTTP (deve redirecionar para HTTPS)
curl -I http://desapego.crescieperdi.com.br

# HTTPS
curl -I https://desapego.crescieperdi.com.br
```

### 5.2 Verificar logs

```bash
# Logs do Docker
docker-compose logs -f

# Logs do Nginx
sudo tail -f /var/log/nginx/desapego.crescieperdi.com.br.access.log
sudo tail -f /var/log/nginx/desapego.crescieperdi.com.br.error.log
```

## 🔄 Atualizações Futuras

### Para atualizar a aplicação:

```bash
cd /var/www/desapego-cresci-e-perdi

# Opção A: Se usar Git
git pull origin main
./deploy.sh

# Opção B: Se enviar arquivos manualmente
# 1. Enviar novos arquivos via SCP
# 2. Executar: ./deploy.sh
```

## 🛠️ Comandos Úteis

```bash
# Ver status dos containers
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f

# Reiniciar aplicação
docker-compose restart

# Parar aplicação
docker-compose down

# Rebuild completo (após mudanças no código)
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Ver uso de recursos
docker stats

# Limpar imagens antigas
docker image prune -a

# Verificar health check
curl http://localhost:3000/health
```

## 🐛 Troubleshooting

### Container não inicia

```bash
# Ver logs detalhados
docker-compose logs desapego-web

# Verificar se a porta 3000 está livre
sudo lsof -i :3000

# Rebuild do zero
docker-compose down
docker system prune -a
docker-compose up -d --build
```

### Nginx não redireciona

```bash
# Verificar configuração
sudo nginx -t

# Ver logs de erro
sudo tail -f /var/log/nginx/error.log

# Reiniciar Nginx
sudo systemctl restart nginx
```

### SSL não funciona

```bash
# Renovar certificado
sudo certbot renew

# Ver status dos certificados
sudo certbot certificates

# Forçar renovação
sudo certbot renew --force-renewal
```

## 📊 Monitoramento

### Health check automático

O container tem um health check configurado que verifica a cada 30 segundos:

```bash
docker inspect desapego-crescieperdi-web | grep -A 10 Health
```

### Logs estruturados

```bash
# Logs com timestamp
docker-compose logs -f --timestamps

# Últimas 100 linhas
docker-compose logs --tail=100
```

## 🔐 Segurança

### Firewall (UFW)

```bash
# Permitir apenas HTTP, HTTPS e SSH
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Atualizações do sistema

```bash
# Atualizar pacotes regularmente
sudo apt update && sudo apt upgrade -y
```

## 📞 Suporte

- **Logs da aplicação**: `docker-compose logs -f`
- **Logs do Nginx**: `/var/log/nginx/desapego.crescieperdi.com.br.*.log`
- **Status do container**: `docker-compose ps`

---

**🎉 Aplicação online em: https://desapego.crescieperdi.com.br**

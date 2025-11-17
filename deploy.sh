#!/bin/bash

# Script de Deploy para Servidor Ubuntu
# Uso: ./deploy.sh

set -e

echo "🚀 Iniciando deploy do Desapego Cresci e Perdi..."

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se está no diretório correto
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}❌ Erro: docker-compose.yml não encontrado${NC}"
    echo "Execute este script do diretório raiz do projeto"
    exit 1
fi

# Parar containers antigos
echo -e "${YELLOW}📦 Parando containers antigos...${NC}"
docker-compose down || true

# Remover imagens antigas
echo -e "${YELLOW}🗑️  Removendo imagens antigas...${NC}"
docker image prune -af

# Build da nova imagem
echo -e "${YELLOW}🔨 Construindo nova imagem Docker...${NC}"
docker-compose build --no-cache

# Subir os containers
echo -e "${YELLOW}🚢 Iniciando containers...${NC}"
docker-compose up -d

# Aguardar containers ficarem healthy
echo -e "${YELLOW}⏳ Aguardando containers ficarem prontos...${NC}"
sleep 10

# Verificar status
echo -e "${YELLOW}🔍 Verificando status dos containers...${NC}"
docker-compose ps

# Verificar logs
echo -e "${YELLOW}📋 Últimos logs:${NC}"
docker-compose logs --tail=50

# Health check
echo -e "${YELLOW}🏥 Verificando saúde da aplicação...${NC}"
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Deploy concluído com sucesso!${NC}"
    echo -e "${GREEN}🌐 Aplicação rodando em: http://localhost:3000${NC}"
else
    echo -e "${RED}❌ Erro: Health check falhou${NC}"
    echo "Verifique os logs com: docker-compose logs -f"
    exit 1
fi

echo ""
echo -e "${GREEN}════════════════════════════════════${NC}"
echo -e "${GREEN}  Deploy concluído! 🎉${NC}"
echo -e "${GREEN}════════════════════════════════════${NC}"
echo ""
echo "📝 Comandos úteis:"
echo "  - Ver logs:        docker-compose logs -f"
echo "  - Parar:           docker-compose down"
echo "  - Reiniciar:       docker-compose restart"
echo "  - Status:          docker-compose ps"
echo ""

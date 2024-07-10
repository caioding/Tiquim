# hands-on-t3-03-tiquim

## Pré-requisitos
1. make 
2. docker 
3. docker compose plugin


## Instruções

## Passo 1: Copiar os arquivos .env 
```bash
make copy
```

## Passo 2: Iniciar a aplicação em docker
```bash
make up
```

## Passo 3: Instanciar banco de dados
```bash
make migrate
```

## Passo 4: Criar tipos de ID
```bash
make seed
```